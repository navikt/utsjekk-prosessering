import { useEffect } from 'react'

const isNode = (val: any): val is Node => Object.hasOwn(val, 'contains')

export const useOnFocusOutside = (
    onFocusOutside: () => void,
    containerRef: React.RefObject<HTMLElement>,
    isActive: boolean
) => {
    useEffect(() => {
        const blurEventHandler = (event: FocusEvent) => {
            const focusInside =
                isNode(event.target) &&
                containerRef.current?.contains(event.target as Node)
            if (isActive && !focusInside) {
                onFocusOutside()
            }
        }
        addEventListener('blur', blurEventHandler)
        return () => {
            removeEventListener('blur', blurEventHandler)
        }
    }, [onFocusOutside, containerRef, isActive])
}
