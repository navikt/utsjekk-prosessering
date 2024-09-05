'use client'

import { useCallback, useRef, useState } from 'react'
import clsx from 'clsx'
import { Button } from '@/components/Button'
import { MenuList } from '@/components/MenuList'
import { useOnClickOutside } from '@/lib/hooks/useOnClickOutside'

import styles from './StartMenuButton.module.css'
import { useOnFocusOutside } from '@/lib/hooks/useOnFocusOutside'

export const StartMenuButton = () => {
    const [isOpen, setIsOpen] = useState(false)
    const buttonRef = useRef<HTMLButtonElement>(null)
    const closeMenu = useCallback(() => setIsOpen(false), [])

    useOnClickOutside(closeMenu, buttonRef, isOpen)
    useOnFocusOutside(closeMenu, buttonRef, isOpen)

    const onClick = (event: React.MouseEvent) => {
        if (event.target === buttonRef.current) {
            setIsOpen((prevState) => !prevState)
        }
    }

    return (
        <Button
            className={clsx(styles.startButton, isOpen && styles.active)}
            onClick={onClick}
            ref={buttonRef}
        >
            Start
            {isOpen && (
                <MenuList className={styles.menu}>
                    <li>Test</li>
                </MenuList>
            )}
        </Button>
    )
}
