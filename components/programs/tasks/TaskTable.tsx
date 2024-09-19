'use client'

import { useState } from 'react'
import { TableHeaderCell } from '@/components/TableHeaderCell'
import { TableBody } from '@/components/TableBody'
import { TaskRow } from '@/components/programs/tasks/TaskRow'
import { TableDataCell } from '@/components/TableDataCell'
import { TaskStatusView } from '@/components/programs/tasks/TaskStatusView'
import { Table } from '@/components/Table'
import { Button } from '@/components/Button'

type Props = {
    tasks: Task[]
}

export const TaskTable: React.FC<Props> = ({ tasks }) => {
    const [selectedTask, setSelectedTask] = useState<Task | null>(null)

    const onClickTask = (task: Task) => {
        setSelectedTask((prevTask) => (prevTask?.id === task.id ? null : task))
    }

    const rerunSelectedTask = async () => {
        if (!selectedTask) {
            return
        }

        return fetch(
            `${process.env.NEXT_PUBLIC_HOSTNAME}/api/tasks/${selectedTask.id}`,
            {
                method: 'PATCH',
                // headers: {
                //     // Authorization: `Bearer ${await getApiToken()}`,
                // },
            }
        )
    }

    return (
        <>
            <Button
                disabled={selectedTask === null}
                onClick={rerunSelectedTask}
            >
                Rekjør task
            </Button>
            <Table>
                <thead>
                    <tr>
                        <TableHeaderCell>Status</TableHeaderCell>
                        <TableHeaderCell>Type</TableHeaderCell>
                        <TableHeaderCell>Kjøretid</TableHeaderCell>
                        <TableHeaderCell>Forsøk</TableHeaderCell>
                    </tr>
                </thead>
                <TableBody>
                    {tasks
                        .slice(0)
                        .sort(
                            (a, b) =>
                                new Date(b.updatedAt).getTime() -
                                new Date(a.updatedAt).getTime()
                        )
                        .map((task) => (
                            <TaskRow
                                onClick={() => onClickTask(task)}
                                key={task.id}
                                selected={task.id === selectedTask?.id}
                            >
                                <TableDataCell>
                                    <TaskStatusView status={task.status} />
                                </TableDataCell>
                                <TableDataCell>{task.kind}</TableDataCell>
                                <TableDataCell suppressHydrationWarning>
                                    {new Date(
                                        task.scheduledFor
                                    ).toLocaleString()}
                                </TableDataCell>
                                <TableDataCell>{task.attempt}</TableDataCell>
                            </TaskRow>
                        ))}
                </TableBody>
            </Table>
        </>
    )
}
