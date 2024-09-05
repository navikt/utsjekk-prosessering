'use client'

import clsx from 'clsx'

import styles from './Desktop.module.css'

type Props = React.HTMLAttributes<HTMLElement>

export const Desktop: React.FC<Props> = ({ className, ...rest }) => {
    return <main className={clsx(className, styles.desktop)} {...rest} />
}
