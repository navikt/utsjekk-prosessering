'use client'

import clsx from 'clsx'
import { useLayoutEffect, useRef } from 'react'
import { Button } from '@/components/Button'
import { CloseIcon } from '@/components/CloseIcon'

import styles from './Window.module.css'

type Position = {
    x: number
    y: number
}

const clamp = (val: number, min: number, max: number) => {
    return val < min ? min : val > max ? max : val
}

const minTranslateX = (element: HTMLElement) => -element.offsetLeft

const minTranslateY = (element: HTMLElement) => -element.offsetTop

const maxTranslateX = (element: HTMLElement) =>
    element.parentElement!.offsetWidth -
    element.offsetWidth -
    element.offsetLeft

const maxTranslateY = (element: HTMLElement) =>
    element.parentElement!.offsetHeight -
    element.offsetHeight -
    element.offsetTop

const useDraggableWindow = (
    windowRef: React.RefObject<HTMLElement>,
    headerRef: React.RefObject<HTMLDivElement>
) => {
    const position = useRef<Position>({ x: 0, y: 0 })

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
            const mouseUpHandler = (event: MouseEvent) => {
                isPressed = false
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
    }, [windowRef, headerRef])
}

type Props = React.HTMLAttributes<HTMLElement> & {
    title: string
}

export const Window: React.FC<Props> = ({
    title,
    className,
    children,
    ...rest
}) => {
    const windowRef = useRef<HTMLElement>(null)
    const headerRef = useRef<HTMLDivElement>(null)

    useDraggableWindow(windowRef, headerRef)

    return (
        <article
            ref={windowRef}
            className={clsx(className, styles.window)}
            {...rest}
        >
            <div ref={headerRef} className={styles.header}>
                <h2 className={styles.title}>{title}</h2>
                <Button className={styles.closeButton}>
                    <CloseIcon />
                </Button>
            </div>
            <div className={styles.content}>{children}</div>
        </article>
    )
}
