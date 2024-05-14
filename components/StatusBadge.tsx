import clsx from 'clsx'

import styles from './StatusBadge.module.css'
import React from 'react'

function renderStatus(status: TaskStatus): string {
    switch (status) {
        case 'UBEHANDLET':
            return 'Ubehandlet'
        case 'AVVIKSHÅNDTERT':
            return 'Avvikshåndtert'
        case 'BEHANDLER':
            return 'Behandler'
        case 'FEILET':
            return 'Feilet'
        case 'FERDIG':
            return 'Ferdig'
        case 'KLAR_TIL_PLUKK':
            return 'Klar til plukk'
        case 'MANUELL_OPPFØLGING':
            return 'Manuell oppfølging'
        case 'PLUKKET':
            return 'Plukket'
    }
}

type Props = React.HTMLAttributes<HTMLDivElement> & {
    status: TaskStatus
}

export function StatusBadge({ status, className, ...rest }: Props) {
    return (
        <div
            className={clsx(styles.StatusBadge, styles[status], className)}
            {...rest}
        >
            {renderStatus(status)}
        </div>
    )
}
