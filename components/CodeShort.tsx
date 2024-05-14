import React from 'react'
import clsx from 'clsx'
import { Source_Code_Pro } from 'next/font/google'

import styles from './CodeShort.module.css'

const sourceCodePro = Source_Code_Pro({ subsets: ['latin'] })

type Props = React.HTMLAttributes<HTMLSpanElement> & {
    size?: 'small' | 'medium'
}

export function CodeShort({ size = 'medium', className, ...rest }: Props) {
    return (
        <span
            className={clsx(
                styles.codeShort,
                styles[size],
                sourceCodePro.className,
                className
            )}
            {...rest}
        />
    )
}
