declare type GridPosition = {
    x: number
    y: number
}

declare type Cell = {
    open: boolean
    adjacent: number
    mine: boolean
    flag: boolean
    pressed: boolean
}
