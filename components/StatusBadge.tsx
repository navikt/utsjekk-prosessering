import clsx from 'clsx'

import styles from './StatusBadge.module.css'
import React from 'react'

function renderStatus(status: TaskStatus): string {
    switch (status) {
        case 'UNPROCESSED':
            return 'Ubehandlet'
        case 'COMPLETE':
            return 'Ferdig'
        case 'FAIL':
            return 'Feilet'
        case 'PROCESSING':
            return 'Plukket'
        case 'MANUAL':
            return 'Manuell oppfølging'
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
