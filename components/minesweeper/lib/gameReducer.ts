import {
    DELTAS,
    equal,
    hasFlag,
    hasMine,
    isAdjacentToMine,
    isOutOfBounds,
    numberOfAdjacentMines,
} from './util'
import { generateCells } from './generateCells'

const numberOfAdjacentFlags = (pos: GridPosition, cells: Cell[][]): number =>
    getAdjacentCells(pos, cells).reduce(
        (acc, cur) => acc + (hasFlag(cur, cells) ? 1 : 0),
        0
    )

const getAdjacentCells = (pos: GridPosition, cells: Cell[][]): GridPosition[] =>
    DELTAS.map((delta) => ({
        x: pos.x + delta.x,
        y: pos.y + delta.y,
    })).filter((it) => !isOutOfBounds(it, cells))

const getMultipleCellsToOpen = (
    origins: GridPosition[],
    cells: Cell[][]
): GridPosition[] => origins.map((it) => getCellsToOpen(it, cells)).flat()

const getCellsToOpen = (
    origin: GridPosition,
    cells: Cell[][]
): GridPosition[] => {
    if (isAdjacentToMine(origin, cells) || hasMine(origin, cells)) {
        return [origin]
    }

    const queue: GridPosition[] = [origin]
    const toOpen: GridPosition[] = []

    while (queue.length > 0) {
        const current = queue.shift() as GridPosition

        if (!isAdjacentToMine(current, cells)) {
            const adjacent = getAdjacentCells(current, cells)
                .filter((cell) => !isOutOfBounds(cell, cells))
                .filter((cell) => !hasFlag(cell, cells))
                .filter((cell) => !toOpen.find((it) => equal(it, cell)))
                .filter((cell) => !queue.find((it) => equal(it, cell)))
            queue.push(...adjacent)
        }

        toOpen.push(current)
    }

    return toOpen
}

const countCells = (
    cells: Cell[][],
    predicate: (cell: Cell) => boolean
): number =>
    cells.reduce(
        (sum, row) =>
            sum + row.reduce((sum, cell) => sum + (predicate(cell) ? 1 : 0), 0),
        0
    )

const countOpenCells = (cells: Cell[][]): number =>
    countCells(cells, (cell) => cell.open)

const transformCells = (
    pos: GridPosition[],
    cells: Cell[][],
    transformer: (cell: Cell) => Cell
): Cell[][] =>
    cells.map((row, y) =>
        row.map((cell, x) =>
            pos.find((it) => equal(it, { x, y })) ? transformer(cell) : cell
        )
    )

const toggleFlag = (pos: GridPosition, cells: Cell[][], value: boolean) =>
    transformCells([pos], cells, (cell) => ({ ...cell, flag: value }))

const togglePressed = (pos: GridPosition[], cells: Cell[][], value: boolean) =>
    transformCells(pos, cells, (cell) => ({ ...cell, pressed: value }))

const toggleOpen = (pos: GridPosition[], cells: Cell[][]): Cell[][] =>
    transformCells(pos, cells, (cell) => ({ ...cell, open: true }))

const updateStatus = (state: GameState): GameState => {
    const hasLost = countCells(state.cells, (cell) => cell.open && cell.mine)
    if (hasLost) {
        return {
            ...state,
            cells: state.cells.map((row) =>
                row.map((cell) => ({ ...cell, open: true }))
            ),
            status: 'lost',
        }
    }

    const hasWon =
        countOpenCells(state.cells) + state.mines === state.width * state.height
    if (hasWon) {
        return {
            ...state,
            cells: state.cells.map((row) =>
                row.map((cell) => (cell.mine ? { ...cell, flag: true } : cell))
            ),
            status: 'won',
        }
    }

    return state
}

export const gameReducer = (
    state: GameState,
    action: GameAction
): GameState => {
    switch (action.name) {
        case 'clickCell': {
            if (state.status !== 'playing') {
                return state
            }
            if (hasFlag(action.position, state.cells)) {
                return state
            }
            if (action.isOpen) {
                if (
                    numberOfAdjacentFlags(action.position, state.cells) ===
                    numberOfAdjacentMines(action.position, state.cells)
                ) {
                    const adjacents = getAdjacentCells(
                        action.position,
                        state.cells
                    )

                    const cellsToOpen = getMultipleCellsToOpen(
                        adjacents,
                        state.cells
                    ).filter((it) => !hasFlag(it, state.cells))

                    const newState = {
                        ...state,
                        cells: toggleOpen(cellsToOpen, state.cells),
                    }

                    return updateStatus(newState)
                } else {
                    return state
                }
            }

            const cellsToOpen = getCellsToOpen(action.position, state.cells)

            const newState = {
                ...state,
                cells: toggleOpen(cellsToOpen, state.cells),
            }

            return updateStatus(newState)
        }
        case 'toggleFlag': {
            if (state.status !== 'playing') {
                return state
            }
            const cell = state.cells[action.position.y][action.position.x]
            if (cell.open) {
                return state
            }
            return {
                ...state,
                cells: toggleFlag(action.position, state.cells, action.value),
            }
        }
        case 'pressCell': {
            if (state.status !== 'playing') {
                return state
            }
            if (hasFlag(action.position, state.cells)) {
                return state
            }
            return {
                ...state,
                cells: togglePressed([action.position], state.cells, true),
            }
        }
        case 'depressCell': {
            if (state.status !== 'playing') {
                return state
            }
            return {
                ...state,
                cells: state.cells.map((row) =>
                    row.map((cell) =>
                        cell.pressed ? { ...cell, pressed: false } : cell
                    )
                ),
            }
        }
        case 'resetGame': {
            return newGame()
        }
        default:
            return state
    }
}

export const newGame = (
    width: number = 9,
    height: number = 9,
    mines: number = 10
): GameState => ({
    width: width,
    height: height,
    mines: mines,
    cells: generateCells(width, height, mines),
    status: 'playing',
})
