import React from 'react'
import clsx from 'clsx'
import { deslugify } from '@/lib/string'

import styles from './StatusBadge.module.css'

type Props = React.HTMLAttributes<HTMLDivElement> & {
    status: TaskStatus
}

export function StatusBadge({ status, className, ...rest }: Props) {
    return (
        <div
            className={clsx(styles.StatusBadge, styles[status], className)}
            {...rest}
        >
            {deslugify(status)}
        </div>
    )
}
