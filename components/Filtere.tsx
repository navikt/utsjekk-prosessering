'use client'

import clsx from 'clsx'
import { UrlSearchParamComboBox } from '@/components/UrlSearchParamComboBox'
import { UrlSearchParamSearch } from '@/components/UrlSearchParamSearch'

import styles from './Filtere.module.css'

const initialFilters: TaskStatus[] = [
    'COMPLETE',
    'IN_PROGRESS',
    'FAIL',
    'MANUAL',
] as const

type Props = React.HTMLAttributes<HTMLDivElement>

export const Filtere: React.FC<Props> = ({ className, ...rest }) => (
    <div className={clsx(styles.container, className)} {...rest}>
        <div className={clsx(styles.filters, styles.visible)}>
            <UrlSearchParamComboBox
                className={styles.filter}
                label="Status"
                searchParamName="status"
                initialOptions={initialFilters}
            />
            <UrlSearchParamSearch
                className={styles.filter}
                searchParamName="kind"
                label="Type"
                variant="secondary"
                hideLabel={false}
            />
        </div>
    </div>
)
