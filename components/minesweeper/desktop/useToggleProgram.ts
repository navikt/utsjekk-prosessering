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
            } else if (!params.get(name)) {
                const state: ProgramState = { name, x: 0, y: 0 }
                params.set(name, encodeURIComponent(JSON.stringify(state)))
            }

            if (params.size === 0) {
                router.push(pathname)
            } else {
                router.push(pathname + '?' + params.toString())
            }
            router.refresh()
        },
        [name, pathname, router, searchParams]
    )
}