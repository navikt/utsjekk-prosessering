'use client'

import React, { useEffect, useReducer } from 'react'
import { Window } from '@/components/Window'
import { GridView } from './components/GridView'
import { Counter } from '@/components/programs/minesweeper/components/Counter'
import { SmileyButton } from '@/components/programs/minesweeper/components/smileyButton/SmileyButton'
import { gameReducer, newGame } from './lib/gameReducer'

import styles from './GameWindow.module.css'

type Props = React.HTMLAttributes<HTMLElement>

export const GameWindow: React.FC<Props> = (props) => {
    const [state, dispatch] = useReducer(gameReducer, newGame())

    const resetGame = () => {
        dispatch({ name: 'resetGame' })
    }

    const numberOfFlags = state.cells.reduce(
        (sum, row) =>
            sum + row.reduce((sum, cell) => sum + (cell.flag ? 1 : 0), 0),
        0
    )

    const remainingMines = state.mines - numberOfFlags

    return (
        <Window title="Minesweeper" name="minesweeper" {...props}>
            <div className={styles.header}>
                <Counter value={remainingMines} numOfDigits={3} />
                <SmileyButton status={state.status} onClick={resetGame} />
                <Counter value={0} numOfDigits={3} />
            </div>
            <GridView cells={state.cells} dispatch={dispatch} />
        </Window>
    )
}
