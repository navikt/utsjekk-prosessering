import { checkToken } from '@/lib/auth/token'
import { TasksProgram } from '@/components/programs/tasks/TasksProgram'
import { ProgramNames } from '@/components/programs/names'
import { MinesweeperProgram } from '@/components/programs/minesweeper'

const showProgram = (searchParams: SearchParams, programName: string) => {
    const value = searchParams[programName]
    return typeof value === 'string' && value === 'true'
}

type Props = {
    searchParams: SearchParams
}

export default async function Home({ searchParams }: Props) {
    await checkToken()

    return (
        <>
            {showProgram(searchParams, ProgramNames.Tasks) && (
                <TasksProgram searchParams={searchParams} />
            )}
            {showProgram(searchParams, ProgramNames.Minesweeper) && (
                <MinesweeperProgram />
            )}
        </>
    )
}
