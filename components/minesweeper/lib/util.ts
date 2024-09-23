export const DELTAS: Position[] = [
    { x: 1, y: -1 },
    { x: 1, y: 0 },
    { x: 1, y: 1 },
    { x: 0, y: 1 },
    { x: -1, y: 1 },
    { x: -1, y: 0 },
    { x: -1, y: -1 },
    { x: 0, y: -1 },
] as const

export const isAdjacentToMine = (pos: Position, cells: Cell[][]): boolean =>
    cells[pos.y][pos.x].adjacent != 0

export const hasMine = (pos: Position, cells: Cell[][]): boolean =>
    cells[pos.y][pos.x].mine

export const isOutOfBounds = (pos: Position, cells: Cell[][]): boolean =>
    !cells[pos.y]?.[pos.x]

export const numberOfAdjacentMines = (pos: Position, cells: Cell[][]): number =>
    cells[pos.y][pos.x].adjacent

export const hasFlag = (pos: Position, cells: Cell[][]): boolean =>
    cells[pos.y][pos.x].flag

export const isOpen = (pos: Position, cells: Cell[][]): boolean =>
    cells[pos.y][pos.x].open

export const equal = (a: Position, b: Position): Boolean =>
    a.x === b.x && a.y === b.y

export const getAdjacentPositions = (pos: Position): Position[] =>
    DELTAS.map((delta) => ({ x: delta.x + pos.x, y: delta.y + pos.y }))
