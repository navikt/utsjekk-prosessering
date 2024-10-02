import { DELTAS } from './util'

const cell = ({
    open,
    bomb,
    adjacent,
    flag,
}: {
    open?: boolean
    bomb?: boolean
    adjacent?: number
    flag?: boolean
} = {}): Cell => ({
    open: open ?? false,
    mine: bomb ?? false,
    adjacent: adjacent ?? 0,
    flag: flag ?? false,
    pressed: false,
})

const randomCellPosition = (width: number, height: number): GridPosition => ({
    x: Math.floor(Math.random() * width),
    y: Math.floor(Math.random() * height),
})

const markMines = (mines: number, cells: Cell[][]): Cell[][] => {
    const width = cells[0].length
    const height = cells.length
    for (let i = 0; i < mines; i++) {
        const position = randomCellPosition(width, height)
        if (cells[position.y][position.x].mine) {
            i -= 1
        } else {
            cells[position.y][position.x].mine = true
        }
    }

    return cells
}

const countAdjacent = (position: GridPosition, cells: Cell[][]): number =>
    DELTAS.reduce(
        (acc, { x, y }) =>
            acc + (cells[position.y + y]?.[position.x + x]?.mine ? 1 : 0),
        0
    )

const markAdjacents = (cells: Cell[][]): Cell[][] => {
    for (let y = 0; y < cells.length; y++) {
        for (let x = 0; x < cells[0].length; x++) {
            cells[y][x].adjacent = countAdjacent({ x, y }, cells)
        }
    }
    return cells
}

export const generateCells = (width: number, height: number, mines: number) => {
    const cells = Array(height)
        .fill([])
        .map(() =>
            Array(width)
                .fill({})
                .map(() => cell())
        )

    markMines(mines, cells)
    markAdjacents(cells)

    return cells
}
