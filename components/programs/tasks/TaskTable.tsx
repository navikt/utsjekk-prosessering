'use client'

import { useState } from 'react'
import { TableHeaderCell } from '@/components/TableHeaderCell'
import { TableBody } from '@/components/TableBody'
import { TaskRow } from '@/components/programs/tasks/TaskRow'
import { TableDataCell } from '@/components/TableDataCell'
import { TaskStatusView } from '@/components/programs/tasks/TaskStatusView'
import { Table } from '@/components/Table'
import { Button } from '@/components/Button'

import styles from './TaskTable.module.css'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowCirclepathIcon } from '@navikt/aksel-icons'
import { hentTasks } from '@/components/programs/tasks/lib/http'

type Props = {
    initialTasks: Task[]
}

export const TaskTable: React.FC<Props> = ({ initialTasks }) => {
    const [tasks, setTasks] = useState(initialTasks)
    const [selectedTask, setSelectedTask] = useState<Task | null>(null)
    const router = useRouter()

    const onClickTask = (task: Task) => {
        setSelectedTask((prevTask) => (prevTask?.id === task.id ? null : task))
    }

    const rerunSelectedTask = async () => {
        if (!selectedTask) {
            return
        }

        await fetch(
            `${process.env.NEXT_PUBLIC_HOSTNAME}/api/tasks/${selectedTask.id}`,
            {
                method: 'PATCH',
            }
        )

        setSelectedTask(null)
        router.refresh()
    }

    const updateTasks = async () => {
        const tasks = await hentTasks({})
        setTasks(tasks)
    }

    return (
        <>
            <div className={styles.buttons}>
                <Button onClick={updateTasks}>
                    <ArrowCirclepathIcon /> Oppdater
                </Button>
                <Button
                    disabled={selectedTask === null}
                    onClick={rerunSelectedTask}
                >
                    Rekjør task
                </Button>
            </div>
            <Table>
                <thead>
                    <tr>
                        <TableHeaderCell>Status</TableHeaderCell>
                        <TableHeaderCell>Type</TableHeaderCell>
                        <TableHeaderCell>Kjøretid</TableHeaderCell>
                        <TableHeaderCell>Forsøk</TableHeaderCell>
                        <TableHeaderCell>Melding</TableHeaderCell>
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
                                <TableDataCell>{task.message}</TableDataCell>
                            </TaskRow>
                        ))}
                </TableBody>
            </Table>
        </>
    )
}
