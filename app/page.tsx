import { Alert } from '@navikt/ds-react'
import { checkToken } from '@/lib/auth/token'
import { fetchTasks } from '@/lib/api/tasks'
import { TaskTable } from '@/components/TaskTable'
import { Filtere } from '@/components/Filtere'
import { Footer } from '@/components/Footer'

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

    const { data, error } = await fetchTasks(toURLSearchParams(searchParams))

    if (error) {
        return (
            <section className={styles.page}>
                <Alert className={styles.alert} variant="error">
                    Klarte ikke hente tasks:
                    <br />
                    {error.statusCode} - {error.message}
                </Alert>
            </section>
        )
    }

    if (data.tasks.length === 0) {
        return (
            <section className={styles.page}>
                <Filtere />
                <Alert className={styles.alert} variant="info">
                    Fant ingen tasks med gjeldende filtere
                </Alert>
            </section>
        )
    }

    return (
        <section className={styles.page}>
            <Filtere />
            <TaskTable tasks={data.tasks} />
            <Footer
                page={data.page}
                pageSize={data.pageSize}
                totalTasks={data.totalTasks}
            />
        </section>
    )
}
