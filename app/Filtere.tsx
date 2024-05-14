'use client'

import { useState } from 'react'
import clsx from 'clsx'
import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation'
import { UrlSearchParamComboBox } from '@/components/UrlSearchParamComboBox'
import { UrlSearchParamSearch } from '@/components/UrlSearchParamSearch'
import { ChevronDownIcon, ChevronUpIcon } from '@navikt/aksel-icons'
import { Button, Show } from '@navikt/ds-react'

import styles from './Filtere.module.css'

const filtere = {
    Status: 'status',
    Type: 'type',
    CallId: 'callId',
} as const

function getAntallAktiveFiltere(searchParams: ReadonlyURLSearchParams): number {
    return Object.values(filtere)
        .map((filter) => searchParams.get(filter)?.split(',')?.length ?? 0)
        .reduce((sum, antallFiltere) => sum + antallFiltere)
}

export function Filtere() {
    const [visFiltere, setVisFiltere] = useState(true)
    const searchParams = useSearchParams()

    const antallAktiveFiltere = getAntallAktiveFiltere(searchParams)

    console.log(antallAktiveFiltere)

    return (
        <div className={styles.container}>
            <div className={styles.buttonRow}>
                <Button
                    className={styles.filtereButton}
                    icon={visFiltere ? <ChevronUpIcon /> : <ChevronDownIcon />}
                    iconPosition="right"
                    size="small"
                    variant="secondary"
                    onClick={() => setVisFiltere((prevState) => !prevState)}
                >
                    {visFiltere ? 'Skjul' : 'Vis'} filtere
                    {antallAktiveFiltere > 0 && (
                        <span className={styles.antallFiltere}>
                            {antallAktiveFiltere}
                        </span>
                    )}
                </Button>
            </div>
            <div
                className={clsx(
                    styles.filters,
                    visFiltere ? styles.visible : styles.hidden
                )}
            >
                <UrlSearchParamComboBox
                    className={styles.filter}
                    label="Status"
                    searchParamName="status"
                    initialOptions={[
                        'ubehandlet',
                        'avvikshåndtert',
                        'behandler',
                        'feilet',
                        'ferdig',
                        'klar_til_plukk',
                        'manuell_oppfølging',
                        'plukket',
                    ]}
                />
                <UrlSearchParamSearch
                    className={styles.filter}
                    searchParamName="type"
                    label="Type"
                    variant="secondary"
                    hideLabel={false}
                />
                <UrlSearchParamSearch
                    className={styles.filter}
                    searchParamName="callId"
                    label="Call-ID"
                    variant="secondary"
                    hideLabel={false}
                />
            </div>
        </div>
    )
}
