'use client'

import { StatusBadge } from '@/components/StatusBadge'
import { formatDate } from '@/lib/date'
import { Alert } from '@navikt/ds-react'

import styles from './TaskTableRowContents.module.css'
import { Metadata } from '@/components/Metadata'

type TaskHistoryViewProps = {
    history: ApiResponse<TaskHistory[]>
}

const TaskHistoryView: React.FC<TaskHistoryViewProps> = ({ history }) => {
    if (history.error) {
        return (
            <Alert variant="error">
                Klarte ikke hente hente historikk for task:{' '}
                {history.error.statusCode} - {history.error.message}
            </Alert>
        )
    }

    return (
        <ul className={styles.list}>
            {history.data
                ?.slice(0)
                .sort(
                    (a, b) =>
                        new Date(b.triggeredAt).getTime() -
                        new Date(a.triggeredAt).getTime()
                )
                .map((history) => (
                    <li key={history.id} className={styles.listItem}>
                        <StatusBadge status={history.status} />
                        <span>Utført: {formatDate(history.triggeredAt)}</span>
                    </li>
                ))}
        </ul>
    )
}

type Props = {
    task: Task
    history: ApiResponse<TaskHistory[]>
}

export const TaskTableRowContents: React.FC<Props> = ({ task, history }) => {
    return (
        <div className={styles.content}>
            <Metadata metadata={task.metadata} />
            <TaskHistoryView history={history} />
        </div>
    )
}
