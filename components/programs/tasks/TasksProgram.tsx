import { XMarkOctagonFillIcon } from '@navikt/aksel-icons'
import { HStack, VStack } from '@navikt/ds-react'
import { getApiToken } from '@/lib/auth/token'
import { Window } from '@/components/window/Window'
import { TaskTable } from '@/components/programs/tasks/TaskTable'
import { ProgramNames } from '@/components/programs/names'
import { InsetWindowContent } from '@/components/window/InsetWindowContent'

import styles from './TasksProgram.module.css'

function getSearchParam(name: string, searchParams: SearchParams): string {
    const statusFilter = searchParams[name]
    return statusFilter && statusFilter.length > 0
        ? `${name}=${statusFilter}`
        : ''
}

async function hentTasks(searchParams: SearchParams): Promise<Task[]> {
    const query = [
        getSearchParam('status', searchParams),
        getSearchParam('kind', searchParams),
        getSearchParam('after', searchParams),
    ]

    const queryString = query.length > 0 ? `?${query.join('&')}` : ''

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOSTNAME}/api/tasks${queryString}`
    )

    if (response.ok) {
        return await response.json()
    } else {
        console.error(
            'Klarte ikke hente tasks:',
            response.status,
            response.statusText
        )
        throw Error(`${response.status} ${response.statusText}`)
    }
}

type Props = {
    searchParams: SearchParams
}

export const TasksProgram = async ({ searchParams }: Props) => {
    const tasks = await hentTasks(searchParams).catch((error) => {
        console.error(error)
        return error
    })

    if (!Array.isArray(tasks)) {
        return (
            <Window title="Tasks" name={ProgramNames.Tasks}>
                <VStack className={styles.error} gap="2">
                    <HStack align="center" gap="2">
                        <XMarkOctagonFillIcon />
                        Følgende feil oppstod under henting av tasks:
                    </HStack>
                    <InsetWindowContent>
                        <pre className={styles.errorContent}>{`${tasks}`}</pre>
                    </InsetWindowContent>
                </VStack>
            </Window>
        )
    }

    return (
        <Window id={ProgramNames.Tasks} title="Tasks" name={ProgramNames.Tasks}>
            <TaskTable tasks={tasks} />
        </Window>
    )
}
