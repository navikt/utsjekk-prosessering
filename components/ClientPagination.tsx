'use client'

import { Pagination, PaginationProps } from '@navikt/ds-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

type Props = Omit<PaginationProps, 'page' | 'count'> & {
    currentPage: number
    pages: number
}

export function ClientPagination({ currentPage, pages, ...props }: Props) {
    const router = useRouter()
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

    const onPageChange = (page: number) => {
        router.push(pathname + '?' + createQueryString('page', `${page}`))
    }

    return (
        <Pagination
            {...props}
            size="small"
            page={currentPage}
            onPageChange={onPageChange}
            count={pages}
            boundaryCount={1}
            siblingCount={1}
        />
    )
}
