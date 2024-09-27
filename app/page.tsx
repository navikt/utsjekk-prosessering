import { Alert } from '@navikt/ds-react'
import { TaskTable } from '@/components/TaskTable'
import { fetchTasks } from '@/lib/api/tasks'
import { Filtere } from '@/components/Filtere'
import { Footer } from '@/components/Footer'
import { checkApiToken, checkToken } from '@/lib/auth/token'

import styles from './page.module.css'

type Props = {
    searchParams: SearchParams
}

export default async function TaskOverview({ searchParams }: Props) {
    await checkToken()
    await checkApiToken()

    const { data, error } = await fetchTasks(searchParams)

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
