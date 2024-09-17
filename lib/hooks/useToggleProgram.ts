import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

export const useToggleProgram = (name: string) => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    return useCallback(
        (on: boolean) => {
            const params = new URLSearchParams(searchParams.toString())
            let programs = params.get('programs')?.split(',') ?? []
            if (!on) {
                programs = programs.filter((it) => it !== name)
            } else if (!programs.includes(name)) {
                programs = programs.concat(name)
            }

            if (programs.length === 0) {
                params.delete('programs')
            } else {
                params.set('programs', programs.join(','))
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
