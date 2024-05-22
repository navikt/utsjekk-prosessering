'use client'

import React from 'react'
import { ComboboxProps, UNSAFE_Combobox } from '@navikt/ds-react'
import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

function formatForRendering(value: string): string {
    if (value.length === 0) {
        return value
    }

    return (
        value[0].toUpperCase() +
        value.slice(1).toLowerCase().replaceAll('_', ' ')
    )
}

function formatForSearchParam(value: string): string {
    if (value.length === 0) {
        return value
    }

    return value.toUpperCase().replaceAll(' ', '_')
}

type Props<T extends string> = Omit<ComboboxProps, 'options'> & {
    searchParamName: string
    initialOptions: T[]
}

export function UrlSearchParamComboBox<T extends string>({
    searchParamName,
    initialOptions,
    className,
    ...rest
}: Props<T>) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const selectedOptions = searchParams.get(searchParamName)?.split(',') ?? []

    const updateSearchParams = (query: string) => {
        const params = new URLSearchParams(searchParams.toString())
        if (query.length === 0) {
            params.delete(searchParamName)
        } else {
            params.set(searchParamName, query)
        }

        if (params.size === 0) {
            router.push(pathname)
        } else {
            router.push(pathname + '?' + decodeURIComponent(params.toString()))
        }
    }

    const onToggleSelected = (option: string, isSelected: boolean) => {
        if (isSelected) {
            const query = [...selectedOptions, option as T]
                .map(formatForSearchParam)
                .join(',')
            updateSearchParams(query)
        } else {
            const query = selectedOptions
                .map(formatForSearchParam)
                .filter((o) => o !== formatForSearchParam(option))
                .join(',')
            updateSearchParams(query)
        }
    }

    return (
        <UNSAFE_Combobox
            className={className}
            isMultiSelect
            options={initialOptions.map(formatForRendering)}
            onToggleSelected={onToggleSelected}
            selectedOptions={selectedOptions?.map(formatForRendering)}
            {...rest}
        />
    )
}
