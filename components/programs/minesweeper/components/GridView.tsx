import { Dispatch } from 'react'
import { CellView } from '@/components/programs/minesweeper/components/CellView'

import styles from './GridView.module.css'

type Props = {
    cells: Cell[][]
    dispatch: Dispatch<GameAction>
}

export const GridView: React.FC<Props> = ({ cells, dispatch }) => {
    return (
        <div className={styles.container}>
            <div className={styles.grid}>
                {cells.map((row, y) => (
                    <div key={y} className={styles.row}>
                        {row.map((cell, x) => (
                            <CellView
                                key={x}
                                {...cell}
                                dispatch={dispatch}
                                position={{ x, y }}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}
