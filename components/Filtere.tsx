'use client'

import clsx from 'clsx'
import { UrlSearchParamComboBox } from '@/components/UrlSearchParamComboBox'
import { deslugify, slugifyUpperCase } from '@/lib/string.ts'

import styles from './Filtere.module.css'

type Props = React.HTMLAttributes<HTMLDivElement>

export const Filtere: React.FC<Props> = ({ className, ...rest }) => (
    <div className={clsx(styles.container, className)} {...rest}>
        <div className={clsx(styles.filters, styles.visible)}>
            <UrlSearchParamComboBox
                className={styles.filter}
                label="Status"
                searchParamName="status"
                initialOptions={
                    ['COMPLETE', 'IN_PROGRESS', 'FAIL', 'MANUAL'] as const
                }
                isMultiSelect
                renderForSearchParam={slugifyUpperCase}
                renderForCombobox={deslugify}
            />
            <UrlSearchParamComboBox
                className={styles.filter}
                label="Type"
                searchParamName="kind"
                shouldAutocomplete
                initialOptions={
                    ['Avstemming', 'Iverksetting', 'SjekkStatus'] as const
                }
                isMultiSelect
            />
        </div>
    </div>
)
