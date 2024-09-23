import { GameWindow } from './GameWindow'
import { Mine } from './components/Mine'

export const MinesweeperProgram = () => {
    return <GameWindow />
}

export const MinesweeperIcon = () => {
    return <Mine width={20} height={20} />
}
