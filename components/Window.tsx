'use client'

import clsx from 'clsx'
import { Button } from '@/components/Button'
import { CloseIcon } from '@/components/CloseIcon'

import styles from './Window.module.css'

type Props = React.HTMLAttributes<HTMLElement> & {
    title: string
}

export const Window: React.FC<Props> = ({
    title,
    className,
    children,
    ...rest
}) => {
    return (
        <article className={clsx(className, styles.window)} {...rest}>
            <div className={styles.header}>
                <h2 className={styles.title}>{title}</h2>
                <Button className={styles.closeButton}>
                    <CloseIcon />
                </Button>
            </div>
            <div className={styles.content}>{children}</div>
        </article>
    )
}
