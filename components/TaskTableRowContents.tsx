import Link from 'next/link'
import { Table } from '@navikt/ds-react'
import { TableBody, TableDataCell, TableRow } from '@navikt/ds-react/Table'
import { StatusBadge } from '@/components/StatusBadge'
import { TaskMelding } from '@/components/TaskMelding'

import styles from './TaskTableRowContents.module.css'

type Props = {
    logs: TaskLog[]
}

export function TaskTableRowContents({ logs }: Props) {
    return (
        <Table className={styles.table}>
            <TableBody>
                {logs.map((log) => (
                    <TableRow className={styles.row} key={log.id}>
                        <TableDataCell>
                            <StatusBadge status={log.type} />
                        </TableDataCell>
                        <TableDataCell>
                            Opprettet:{' '}
                            {new Date(log.opprettetTidspunkt).toLocaleString(
                                'no-NB'
                            )}
                        </TableDataCell>
                        <TableDataCell>Endret av: {log.endretAv}</TableDataCell>
                        <TableDataCell>
                            Pod:{' '}
                            <Link
                                href={`https://console.nav.cloud.nais.io/team/helved/${process.env.NEXT_PUBLIC_ENVIRONMENT}/app/utsjekk/logs?name=${log.node}`}
                                target="_blank"
                            >
                                {log.node}
                            </Link>
                        </TableDataCell>
                        <TableDataCell>
                            <TaskMelding melding={log.melding} />
                        </TableDataCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
