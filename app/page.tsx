import { checkToken } from '@/lib/auth/token'
import { TasksProgram } from '@/components/programs/tasks/TasksProgram'
import { ProgramNames } from '@/components/programs/names'
import { MinesweeperProgram } from '@/components/programs/minesweeper'

const activePrograms = (searchParams: SearchParams): string[] =>
    searchParams['programs']?.split(',') ?? []

type Props = {
    searchParams: SearchParams
}

export default async function Home({ searchParams }: Props) {
    await checkToken()

    const programs = activePrograms(searchParams)

    return (
        <>
            {programs.includes(ProgramNames.Tasks) && (
                <TasksProgram searchParams={searchParams} />
            )}
            {programs.includes(ProgramNames.Minesweeper) && (
                <MinesweeperProgram />
            )}
        </>
    )
}
