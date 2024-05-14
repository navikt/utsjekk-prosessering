'use client'

import { Search, SearchProps } from '@navikt/ds-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { FormEvent, useEffect, useState } from 'react'

type Props = Omit<SearchProps, 'onSearchClick'> & {
    searchParamName: string
}

export function UrlSearchParamSearch({
    searchParamName,
    className,
    ...rest
}: Props) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const [value, setValue] = useState(
        searchParams.get(searchParamName) ?? rest.defaultValue ?? ''
    )

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

    const onsubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const query = new FormData(event.target as HTMLFormElement).get(
            searchParamName
        )

        if (typeof query !== 'string') {
            return
        }

        if (query.length > 0) {
            updateSearchParams(query)
        }
    }

    useEffect(() => {
        setValue(searchParams.get(searchParamName) ?? '')
    }, [searchParams, searchParamName])

    const onClear = () => {
        updateSearchParams('')
    }

    const onChange = (value: string) => {
        setValue(value)
    }

    return (
        <form role="search" onSubmit={onsubmit} className={className}>
            <Search
                value={value}
                onChange={onChange}
                name={searchParamName}
                onClear={onClear}
                {...rest}
            />
        </form>
    )
}
