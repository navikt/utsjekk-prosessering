import clsx from 'clsx'
import { Skeleton, Table } from '@navikt/ds-react'
import {
    TableBody,
    TableDataCell,
    TableHeader,
    TableHeaderCell,
    TableRow,
} from '@navikt/ds-react/Table'

import styles from './TaskTable.module.css'

type Props = React.TableHTMLAttributes<HTMLTableElement>

export const TaskTableSkeleton: React.FC<Props> = ({ className, ...rest }) => {
    return (
        <div className={clsx(className, styles.tableContainer)} {...rest}>
            <Table className={styles.table}>
                <TableHeader>
                    {/* Denne havner bak radene i tabellen. Temp fiks ved å sette z-indeks */}
                    <TableRow style={{ zIndex: 1000 }}>
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
                    {Array(20)
                        .fill(null)
                        .map((_, i) => (
                            <TableRow key={i}>
                                <TableDataCell colSpan={7}>
                                    <Skeleton
                                        style={{ transform: 'none' }}
                                        height={33}
                                    />
                                </TableDataCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </div>
    )
}
