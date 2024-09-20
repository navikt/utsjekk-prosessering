'use client'

import clsx from 'clsx'
import { useCallback, useRef, useState } from 'react'
import { Button } from '@/components/Button'
import { MenuList } from '@/components/MenuList'
import { ProgramNames } from '@/components/programs/names'
import { MinesweeperIcon } from '@/components/programs/minesweeper'
import { useOnClickOutside } from '@/lib/hooks/useOnClickOutside'
import { useOnFocusOutside } from '@/lib/hooks/useOnFocusOutside'
import { useToggleProgram } from '@/lib/desktop/useToggleProgram'

import styles from './StartMenuButton.module.css'

export const StartMenuButton = () => {
    const [isOpen, setIsOpen] = useState(false)
    const buttonRef = useRef<HTMLButtonElement>(null)
    const closeMenu = useCallback(() => setIsOpen(false), [])

    const toggleTasksProgram = useToggleProgram(ProgramNames.Tasks)
    const toggleMinesweeperProgram = useToggleProgram(ProgramNames.Minesweeper)

    useOnClickOutside(closeMenu, buttonRef, isOpen)
    useOnFocusOutside(closeMenu, buttonRef, isOpen)

    const onClick = (event: React.MouseEvent) => {
        if (event.target === buttonRef.current) {
            setIsOpen((prevState) => !prevState)
        }
    }

    const closeAfterClick = (onClick: () => void) => () => {
        onClick()
        closeMenu()
    }

    return (
        <Button
            className={clsx(styles.startButton, isOpen && styles.active)}
            onClick={onClick}
            ref={buttonRef}
        >
            🪵 Start
            {isOpen && (
                <MenuList className={styles.menu}>
                    <li
                        className={styles.menuItem}
                        onClick={closeAfterClick(() =>
                            toggleTasksProgram(true)
                        )}
                    >
                        <span>📋</span>
                        Tasks
                    </li>
                    <li
                        className={styles.menuItem}
                        onClick={closeAfterClick(() =>
                            toggleMinesweeperProgram(true)
                        )}
                    >
                        <MinesweeperIcon />
                        Minesweeper
                    </li>
                </MenuList>
            )}
        </Button>
    )
}
