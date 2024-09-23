import { Table } from '@navikt/ds-react'
import {
    TableBody,
    TableDataCell,
    TableHeader,
    TableHeaderCell,
    TableRow,
} from '@navikt/ds-react/Table'
import { format } from 'date-fns/format'
import { StatusBadge } from '@/components/StatusBadge'

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
                            <TableRow key={task.id}>
                                <TableDataCell>
                                    <StatusBadge status={task.status} />
                                </TableDataCell>
                                <TableDataCell>{task.kind}</TableDataCell>
                                <TableDataCell>
                                    {format(
                                        new Date(task.scheduledFor),
                                        'yyyy-MM-dd - HH:mm:ss'
                                    )}
                                </TableDataCell>
                                <TableDataCell>{task.attempt}</TableDataCell>
                                <TableDataCell>{task.message}</TableDataCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </div>
    )
}
