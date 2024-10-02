import { useSearchParams } from 'next/navigation'

export const useWindowPosition = (name: string): GridPosition => {
    const searchParams = useSearchParams()
    const raw = searchParams.get(name)

    if (!raw) {
        return { x: 0, y: 0 }
    }

    const state = JSON.parse(decodeURIComponent(raw))

    return { x: state.x, y: state.y }
}
