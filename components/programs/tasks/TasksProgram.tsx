import { Suspense } from 'react'
import { Window } from '@/components/window/Window'
import { TaskTable } from '@/components/programs/tasks/TaskTable'
import { hentTasks } from '@/components/programs/tasks/lib/http'
import { ProgramNames } from '@/components/programs/names'
import { TasksErrorView } from '@/components/programs/tasks/TasksErrorView'

type Props = {
    searchParams: SearchParams
}

export const TasksProgram = async ({ searchParams }: Props) => {
    const initialTasks = await hentTasks(searchParams).catch((error) => error)

    if (!Array.isArray(initialTasks)) {
        return (
            <Window title="Tasks" name={ProgramNames.Tasks}>
                <TasksErrorView error={initialTasks} />
            </Window>
        )
    }

    return (
        <Suspense>
            <Window
                id={ProgramNames.Tasks}
                title="Tasks"
                name={ProgramNames.Tasks}
            >
                <TaskTable initialTasks={initialTasks} />
            </Window>
        </Suspense>
    )
}
