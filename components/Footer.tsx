import clsx from 'clsx'
import { ClientPagination } from '@/components/ClientPagination'
import { BodyShort } from '@navikt/ds-react'

import styles from './Footer.module.css'

type Props = Omit<React.HTMLAttributes<HTMLElement>, 'children'> & {
    page: number
    pageSize: number
    totalTasks: number
}

export const Footer: React.FC<Props> = ({
    page,
    pageSize,
    totalTasks,
    className,
    ...rest
}) => {
    return (
        <footer className={clsx(className, styles.footer)} {...rest}>
            <ClientPagination
                currentPage={page}
                pages={Math.ceil(totalTasks / pageSize)}
            />
            <BodyShort>
                Viser {Math.min(pageSize, totalTasks)} av {totalTasks} tasks
            </BodyShort>
        </footer>
    )
}
