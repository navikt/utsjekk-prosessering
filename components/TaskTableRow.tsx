'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@navikt/ds-react'
import { TableDataCell, TableExpandableRow } from '@navikt/ds-react/Table'
import { StatusBadge } from '@/components/StatusBadge'
import { TaskHistoryView } from '@/components/TaskHistoryView'

import styles from './TaskTableRow.module.css'
import { UrlSearchParamLink } from '@/components/UrlSearchParamLink'
import { getHistory } from '@/lib/api/history'

async function rekjør(taskId: string) {
    return fetch(`/api/tasks/${taskId}`, {
        method: 'PUT',
    })
}

type Props = {
    task: Task
}

export function TaskTableRow({ task }: Props) {
    const router = useRouter()
    const didOpen = useRef(false)
    const [open, setOpen] = useState(false)
    const [history, setHistory] = useState<Array<TaskHistory>>([])

    const onOpenChange = (open: boolean) => {
        setOpen(open)
    }

    useEffect(() => {
        if (open && !didOpen.current) {
            didOpen.current = true
            getHistory(task.id).then((history) => {
                setHistory(history)
            })
        }
    }, [open, task, didOpen])

    const onRekjørTask = async (taskId: string) => {
        const response = await rekjør(taskId)

        if (response.ok) {
            router.refresh()
        }
    }

    return (
        <TableExpandableRow
            className={styles.row}
            expandOnRowClick
            open={open && history.length > 0}
            onOpenChange={onOpenChange}
            content={
                <>
                    <TaskHistoryView history={history} />
                </>
            }
            togglePlacement="right"
        >
            <TableDataCell>
                <StatusBadge status={task.status} />
            </TableDataCell>
            <TableDataCell>{task.id}</TableDataCell>
            <TableDataCell>
                <UrlSearchParamLink
                    searchParamName="kind"
                    searchParamValue={task.kind}
                >
                    {task.kind}
                </UrlSearchParamLink>
            </TableDataCell>
            <TableDataCell>
                {new Date(task.updatedAt).toLocaleString('no-NB')}
            </TableDataCell>
            <TableDataCell>{task.attempt}</TableDataCell>
            <TableDataCell>
                <Button
                    variant="secondary"
                    size="small"
                    onClick={() => onRekjørTask(task.id)}
                >
                    Rekjør
                </Button>
            </TableDataCell>
        </TableExpandableRow>
    )
}
