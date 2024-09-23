import { Alert } from '@navikt/ds-react'
import { checkToken } from '@/lib/auth/token'
import { fetchTasks } from '@/lib/api/tasks'
import { TaskTable } from '@/app/TaskTable'
import { Filtere } from '@/app/Filtere'
import { Footer } from '@/app/Footer'

import styles from './page.module.css'

const toURLSearchParams = (params: SearchParams): URLSearchParams => {
    const urlSearchParams = new URLSearchParams()
    for (const [key, value] of Object.entries(params)) {
        urlSearchParams.set(key, value as string)
    }
    return urlSearchParams
}

type Props = {
    searchParams: SearchParams
}

export default async function TaskOverview({ searchParams }: Props) {
    await checkToken()

    const { tasks, page, pageSize, totalTasks } = await fetchTasks(
        toURLSearchParams(searchParams)
    )

    return (
        <section className={styles.page}>
            <Filtere />
            {tasks.length > 0 && <TaskTable tasks={tasks} />}
            {tasks.length === 0 && (
                <Alert className={styles.alert} variant="info">
                    Fant ingen tasks med gjeldende filtere
                </Alert>
            )}
            <Footer page={page} pageSize={pageSize} totalTasks={totalTasks} />
        </section>
    )
}
