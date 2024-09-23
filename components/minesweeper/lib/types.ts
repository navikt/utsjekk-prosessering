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
    position: Position
    isOpen: boolean
}

declare type ToggleFlagAction = {
    name: 'toggleFlag'
    position: Position
    value: boolean
}

declare type PressCellAction = {
    name: 'pressCell'
    position: Position
}

declare type DepressCellAction = {
    name: 'depressCell'
    position: Position
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
