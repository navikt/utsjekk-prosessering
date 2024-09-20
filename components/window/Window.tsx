'use client'

import clsx from 'clsx'
import { RefObject, useEffect, useLayoutEffect, useRef } from 'react'
import { Button } from '@/components/Button'
import { CloseIcon } from '@/components/CloseIcon'
import {
    clamp,
    maxTranslateX,
    maxTranslateY,
    minTranslateX,
    minTranslateY,
} from '@/components/window/util'
import { useToggleProgram } from '@/lib/desktop/useToggleProgram'
import { useWindowPosition } from '@/lib/desktop/useWindowPosition'
import { useUpdateWindowPosition } from '@/lib/desktop/useUpdateWindowPosition'

import styles from './Window.module.css'

type Position = {
    x: number
    y: number
}

let currentZIndex = 100

const updatePosition = (element: HTMLElement, newPos: Position) => {
    const position = {
        x: clamp(newPos.x, minTranslateX(element), maxTranslateX(element)),
        y: clamp(newPos.y, minTranslateY(element), maxTranslateY(element)),
    }
    element.style.transform = `translate3D(${position.x}px, ${position.y}px, 0)`
}

const useDraggableWindow = (
    name: string,
    windowRef: React.RefObject<HTMLElement>,
    headerRef: React.RefObject<HTMLDivElement>,
    defaultWindowPosition: Position = { x: 0, y: 0 }
) => {
    const updateWindowPosition = useUpdateWindowPosition(name)
    const position = useRef<Position>(defaultWindowPosition)

    useLayoutEffect(() => {
        const windowElement = windowRef.current
        const headerElement = headerRef.current

        if (windowElement && headerElement) {
            let isPressed = false

            const mouseDownHandler = (event: MouseEvent) => {
                const clicked = event.target as HTMLElement | null
                const didClickHeader =
                    clicked &&
                    clicked?.tagName !== 'button' &&
                    headerElement.contains(clicked)
                if (didClickHeader) {
                    isPressed = true
                    currentZIndex += 1
                    windowElement.style.zIndex = `${currentZIndex}`
                }
            }

            const mouseMoveHandler = (event: MouseEvent) => {
                if (isPressed) {
                    position.current = {
                        x: clamp(
                            position.current.x + event.movementX,
                            minTranslateX(windowElement),
                            maxTranslateX(windowElement)
                        ),
                        y: clamp(
                            position.current.y + event.movementY,
                            minTranslateY(windowElement),
                            maxTranslateY(windowElement)
                        ),
                    }
                    windowElement.style.transform = `translate3D(${position.current.x}px, ${position.current.y}px, 0)`
                }
            }
            const mouseUpHandler = () => {
                isPressed = false
                updateWindowPosition(position.current)
            }

            window.addEventListener('mousedown', mouseDownHandler)
            window.addEventListener('mousemove', mouseMoveHandler)
            window.addEventListener('mouseup', mouseUpHandler)

            return () => {
                window.removeEventListener('mousedown', mouseDownHandler)
                window.removeEventListener('mousemove', mouseMoveHandler)
                window.removeEventListener('mouseup', mouseUpHandler)
            }
        }
    }, [updateWindowPosition, windowRef, headerRef])
}

const usePutInFrontOnMount = (ref: RefObject<HTMLElement>) => {
    useEffect(() => {
        const windowElement = ref.current
        if (windowElement) {
            windowElement.style.zIndex = `${++currentZIndex}`
        }
    }, [ref])
}

type Props = React.HTMLAttributes<HTMLElement> & {
    title: string
    name: string
}

export const Window: React.FC<Props> = ({
    title,
    className,
    children,
    name,
    ...rest
}) => {
    const windowRef = useRef<HTMLElement>(null)
    const headerRef = useRef<HTMLDivElement>(null)
    const toggleOpen = useToggleProgram(name)
    const defaultWindowPosition = useWindowPosition(name)

    useDraggableWindow(name, windowRef, headerRef, defaultWindowPosition)

    usePutInFrontOnMount(windowRef)

    const closeWindow = () => {
        toggleOpen(false)
    }

    return (
        <article
            ref={windowRef}
            className={clsx(className, styles.window)}
            {...rest}
            style={{
                transform: `translate(${defaultWindowPosition.x}px, ${defaultWindowPosition.y}px)`,
            }}
        >
            <div ref={headerRef} className={styles.header}>
                <h2 className={styles.title}>{title}</h2>
                <Button className={styles.closeButton} onClick={closeWindow}>
                    <CloseIcon />
                </Button>
            </div>
            <div className={styles.content}>{children}</div>
        </article>
    )
}
