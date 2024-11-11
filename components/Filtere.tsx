'use client'

import clsx from 'clsx'
import { UrlSearchParamComboBox } from '@/components/UrlSearchParamComboBox'
import { deslugify, slugifyUpperCase } from '@/lib/string.ts'

import styles from './Filtere.module.css'
import { UrlSearchParamInput } from '@/components/UrlSearchParamInput.tsx'

type Props = React.HTMLAttributes<HTMLDivElement>

export const Filtere: React.FC<Props> = ({ className, ...rest }) => (
    <div className={clsx(styles.container, className)} {...rest}>
        <div className={clsx(styles.filters, styles.visible)}>
            <UrlSearchParamComboBox
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
                label="Type"
                searchParamName="kind"
                shouldAutocomplete
                initialOptions={
                    ['Avstemming', 'Iverksetting', 'SjekkStatus'] as const
                }
                isMultiSelect
            />
            <UrlSearchParamInput
                className={styles.input}
                label="Søk i payload"
                searchParamName="payload"
            />
        </div>
    </div>
)
