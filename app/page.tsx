import { checkToken } from '@/lib/auth/token'
import { TasksProgram } from '@/components/programs/tasks/TasksProgram'
import { ProgramNames } from '@/components/programs/names'
import { MinesweeperProgram } from '@/components/programs/minesweeper'

type Props = {
    searchParams: SearchParams
}

export default async function Home({ searchParams }: Props) {
    await checkToken()

    const programIsActive = (name: ValueOf<typeof ProgramNames>): boolean =>
        !!searchParams[name]

    return (
        <>
            {programIsActive(ProgramNames.Tasks) && (
                <TasksProgram searchParams={searchParams} />
            )}
            {programIsActive(ProgramNames.Minesweeper) && (
                <MinesweeperProgram />
            )}
        </>
    )
}
