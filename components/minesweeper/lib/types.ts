declare type GameStatus = 'playing' | 'won' | 'lost'

declare type GameState = {
    width: number
    height: number
    mines: number
    cells: Cell[][]
    status: GameStatus
}

declare type ClickCellAction = {
    name: 'clickCell'
    position: GridPosition
    isOpen: boolean
}

declare type ToggleFlagAction = {
    name: 'toggleFlag'
    position: GridPosition
    value: boolean
}

declare type PressCellAction = {
    name: 'pressCell'
    position: GridPosition
}

declare type DepressCellAction = {
    name: 'depressCell'
    position: GridPosition
}

declare type ResetGameAction = {
    name: 'resetGame'
}

declare type GameAction =
    | ClickCellAction
    | ToggleFlagAction
    | PressCellAction
    | DepressCellAction
    | ResetGameAction
