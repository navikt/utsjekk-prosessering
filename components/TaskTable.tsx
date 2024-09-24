import { Table } from '@navikt/ds-react'
import {
    TableBody,
    TableDataCell,
    TableHeader,
    TableHeaderCell,
    TableRow,
} from '@navikt/ds-react/Table'
import { formatDate } from '@/lib/date'
import { Metadata } from '@/components/Metadata'
import { StatusBadge } from '@/components/StatusBadge'
import { TaskTableRow } from '@/components/TaskTableRow'

import styles from './TaskTable.module.css'

type Props = {
    tasks: Task[]
}

export const TaskTable: React.FC<Props> = ({ tasks }) => {
    return (
        <div className={styles.tableContainer}>
            <Table className={styles.table}>
                <TableHeader>
                    <TableRow>
                        <TableHeaderCell />
                        <TableHeaderCell>Status</TableHeaderCell>
                        <TableHeaderCell>Type</TableHeaderCell>
                        <TableHeaderCell>Kjøretid</TableHeaderCell>
                        <TableHeaderCell>Forsøk</TableHeaderCell>
                        <TableHeaderCell>Melding</TableHeaderCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tasks
                        .slice(0)
                        .sort(
                            (a, b) =>
                                new Date(b.updatedAt).getTime() -
                                new Date(a.updatedAt).getTime()
                        )
                        .map((task) => (
                            <TaskTableRow key={task.id} task={task}>
                                <TableDataCell>
                                    <StatusBadge status={task.status} />
                                </TableDataCell>
                                <TableDataCell>{task.kind}</TableDataCell>
                                <TableDataCell>
                                    {formatDate(task.scheduledFor)}
                                </TableDataCell>
                                <TableDataCell>{task.attempt}</TableDataCell>
                                <TableDataCell>{task.message}</TableDataCell>
                            </TaskTableRow>
                        ))}
                </TableBody>
            </Table>
        </div>
    )
}
