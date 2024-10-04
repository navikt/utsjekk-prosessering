import { HStack, Spacer, Table } from '@navikt/ds-react'
import clsx from 'clsx'
import {
    TableBody,
    TableDataCell,
    TableHeader,
    TableHeaderCell,
    TableRow,
} from '@navikt/ds-react/Table'
import { formatDate } from '@/lib/date'
import { StatusBadge } from '@/components/StatusBadge'
import { TaskTableRow } from '@/components/taskTable/TaskTableRow'
import { RetryTaskButton } from '@/components/RetryTaskButton'
import { ErrorTableRow } from '@/components/taskTable/ErrorTableRow'

import styles from './TaskTable.module.css'

type Props = React.HTMLAttributes<HTMLDivElement> & {
    tasks: ParseResult<Task>[]
}

export const TaskTable: React.FC<Props> = ({ tasks, className, ...rest }) => {
    const parsedTasks = tasks.filter((task) => task.success)
    const parsedErrors = tasks.filter((task) => !task.success)

    return (
        <div className={clsx(className, styles.tableContainer)} {...rest}>
            <Table className={styles.table}>
                <TableHeader>
                    <TableRow>
                        <TableHeaderCell />
                        <TableHeaderCell>Status</TableHeaderCell>
                        <TableHeaderCell>Type</TableHeaderCell>
                        <TableHeaderCell>Kjøretid</TableHeaderCell>
                        <TableHeaderCell>Forsøk</TableHeaderCell>
                        <TableHeaderCell>Melding</TableHeaderCell>
                        <TableHeaderCell />
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {parsedErrors.map((error, i) => (
                        <ErrorTableRow key={i} error={error} />
                    ))}
                    {parsedTasks
                        .slice(0)
                        .sort(
                            (a, b) =>
                                new Date(b.data.scheduledFor).getTime() -
                                new Date(a.data.scheduledFor).getTime()
                        )
                        .map(({ data }) => (
                            <TaskTableRow key={data.id} task={data}>
                                <TableDataCell>
                                    <StatusBadge status={data.status} />
                                </TableDataCell>
                                <TableDataCell>{data.kind}</TableDataCell>
                                <TableDataCell>
                                    {formatDate(data.scheduledFor)}
                                </TableDataCell>
                                <TableDataCell>{data.attempt}</TableDataCell>
                                <TableDataCell>{data.message}</TableDataCell>
                                <TableDataCell>
                                    <HStack>
                                        <Spacer />
                                        <RetryTaskButton task={data} />
                                    </HStack>
                                </TableDataCell>
                            </TaskTableRow>
                        ))}
                </TableBody>
            </Table>
        </div>
    )
}
