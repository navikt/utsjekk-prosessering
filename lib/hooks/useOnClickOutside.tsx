import { useEffect } from 'react'

export const useOnClickOutside = (
    onClickOutside: () => void,
    containerRef: React.RefObject<HTMLElement>,
    isActive: boolean
) => {
    useEffect(() => {
        const clickEventHandler = (event: MouseEvent) => {
            const clickedInside = containerRef.current?.contains(
                event.target as Node
            )
            if (isActive && !clickedInside) {
                onClickOutside()
            }
        }
        addEventListener('click', clickEventHandler)
        return () => {
            removeEventListener('click', clickEventHandler)
        }
    }, [onClickOutside, containerRef, isActive])
}
