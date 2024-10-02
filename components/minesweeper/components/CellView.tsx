import React, { Dispatch, ReactNode } from 'react'
import clsx from 'clsx'
import localFont from 'next/font/local'
import { Flag } from './Flag'
import { Mine } from './Mine'

import styles from './CellView.module.css'

const minesweeperFont = localFont({
    src: '../../../public/fonts/mine_sweeper.otf',
    display: 'swap',
})

const color = (adjacent: number): string => {
    switch (adjacent) {
        case 1:
            return 'rgb(34 0 247)'
        case 2:
            return 'rgb(1 119 0)'
        case 3:
            return 'rgb(236 1 0)'
        case 4:
            return 'rgb(12 0 128)'
        case 5:
            return 'rgb(128 2 1)'
        case 6:
            return 'rgb(2 128 128)'
        case 7:
            return 'rgb(128 1 128)'
        case 8:
        default:
            return 'rgb(10, 10, 10)'
    }
}

const renderContent = (mine: boolean, adjacent: number): ReactNode => {
    return mine ? (
        <Mine className={styles.icon} />
    ) : adjacent !== 0 ? (
        adjacent
    ) : (
        ''
    )
}

type Props = Cell & {
    position: GridPosition
    dispatch: Dispatch<GameAction>
    pressed: boolean
}

export const CellView: React.FC<Props> = ({
    mine,
    adjacent,
    open,
    flag,
    position,
    dispatch,
    pressed,
}) => {
    const onContextMenu = (event: React.MouseEvent) => {
        event.preventDefault()
        dispatch({ name: 'toggleFlag', position, value: !flag })
    }

    const onMouseDown = (event: React.MouseEvent) => {
        event.preventDefault()

        if (event.button !== 0) {
            return
        }

        dispatch({ name: 'pressCell', position })
    }

    const onMouseUp = (event: React.MouseEvent) => {
        event.preventDefault()

        if (flag || !pressed) {
            return
        }

        dispatch({ name: 'clickCell', position, isOpen: open })
    }

    const onMouseOut = (event: React.MouseEvent) => {
        event.preventDefault()
        dispatch({ name: 'depressCell', position })
    }

    return (
        <button
            className={clsx(
                styles.cell,
                open && styles.open,
                pressed && styles.pressed,
                minesweeperFont.className
            )}
            style={{ '--color': color(adjacent) }}
            onMouseUp={onMouseUp}
            onMouseDown={onMouseDown}
            onContextMenu={onContextMenu}
            onMouseOut={onMouseOut}
        >
            {flag && <Flag className={styles.icon} />}
            <span className={styles.content} suppressHydrationWarning>
                {renderContent(mine, adjacent)}
            </span>
        </button>
    )
}
