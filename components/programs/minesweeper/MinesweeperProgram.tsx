import { GameWindow } from '@/components/programs/minesweeper/GameWindow'
import { Mine } from '@/components/programs/minesweeper/components/Mine'

export const MinesweeperProgram = () => {
    return <GameWindow />
}

export const MinesweeperIcon = () => {
    return <Mine width={20} height={20} />
}
