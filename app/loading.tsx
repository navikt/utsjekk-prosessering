import { TasksSkeleton } from '@/app/Tasks.tsx'

import styles from './page.module.css'

export default function Loading() {
    return (
        <section className={styles.page}>
            <TasksSkeleton />
        </section>
    )
}
