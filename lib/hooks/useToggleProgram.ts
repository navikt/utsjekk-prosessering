import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

export const useToggleProgram = (name: string) => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    return useCallback(
        (on: boolean) => {
            const params = new URLSearchParams(searchParams.toString())
            if (!on) {
                params.delete(name)
            } else {
                params.set(name, 'true')
            }

            if (params.size === 0) {
                router.push(pathname)
            } else {
                router.push(
                    pathname + '?' + decodeURIComponent(params.toString())
                )
            }
            router.refresh()
        },
        [name, pathname, router, searchParams]
    )
}
