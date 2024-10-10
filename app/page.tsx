import { checkApiToken, checkToken } from '@/lib/auth/token'
import { Tasks } from '@/components/Tasks.tsx'

import styles from './page.module.css'

type Props = {
    searchParams: SearchParams
}

export default async function TaskOverview({ searchParams }: Props) {
    await checkToken()
    await checkApiToken()

    return (
        <section className={styles.page}>
            <Tasks searchParams={searchParams} />
        </section>
    )
}
