import { Table } from '@navikt/ds-react'
import { TableBody, TableDataCell, TableRow } from '@navikt/ds-react/Table'
import { StatusBadge } from '@/components/StatusBadge'

import styles from './TaskHistoryView.module.css'

type Props = {
    history: TaskHistory[]
}

export function TaskHistoryView({ history }: Props) {
    return (
        <Table className={styles.table}>
            <caption className={styles.tableTitle}>Historikk:</caption>
            <TableBody>
                {history.map((log) => (
                    <TableRow className={styles.row} key={log.id}>
                        <TableDataCell>
                            <StatusBadge status={log.status} />
                        </TableDataCell>
                        <TableDataCell>
                            Opprettet:{' '}
                            {new Date(log.createdAt).toLocaleString('no-NB')}
                        </TableDataCell>
                        <TableDataCell>
                            Endret av: {log.triggeredBy}
                        </TableDataCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
