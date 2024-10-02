import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

export const useUpdateWindowPosition = (name: string) => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    return useCallback(
        (position: GridPosition) => {
            const params = new URLSearchParams(searchParams.toString())
            const raw = params.get(name)

            if (!raw) {
                return
            }

            const prevState = JSON.parse(decodeURIComponent(raw))

            params.set(
                name,
                encodeURIComponent(
                    JSON.stringify({
                        ...prevState,
                        x: position.x,
                        y: position.y,
                    })
                )
            )

            router.push(pathname + '?' + params.toString())
        },
        [name, pathname, router, searchParams]
    )
}
