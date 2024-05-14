'use client'

import React, { useCallback } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import Link from 'next/link'

type Props = {
    searchParamName: string
    searchParamValue: string
    children: React.ReactNode
}

export function UrlSearchParamLink({
    searchParamName,
    searchParamValue,
    children,
}: Props) {
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)

            return params.toString()
        },
        [searchParams]
    )

    return (
        <Link
            href={
                pathname +
                '?' +
                createQueryString(searchParamName, searchParamValue)
            }
        >
            {children}
        </Link>
    )
}
