'use client'

import { useState } from 'react'
import clsx from 'clsx'
import { logger } from '@navikt/next-logger'
import { ExpandableRowProps } from '@navikt/ds-react'
import { TableExpandableRow } from '@navikt/ds-react/Table'
import { TaskTableRowContents } from '@/components/taskTable/TaskTableRowContents'
import { Routes } from '@/lib/api/routes'

import styles from './TaskTableRow.module.css'

type FetchHistoryResponse = ApiResponse<TaskHistory[]>

const fetchHistory = async (task: Task): Promise<FetchHistoryResponse> => {
    const response = await fetch(Routes.internal.history(task.id))

    if (response.ok) {
        const body = await response.json()
        return {
            data: body,
            error: null,
        }
    } else {
        logger.error(
            'Klarte ikke hente task-history:',
            response.status,
            response.statusText
        )
        return {
            data: null,
            error: {
                message: response.statusText,
                statusCode: response.status,
            },
        }
    }
}

type Props = Omit<ExpandableRowProps, 'content'> & {
    task: Task
}

export const TaskTableRow: React.FC<Props> = ({ task, className, ...rest }) => {
    const [history, setHistory] = useState<FetchHistoryResponse | null>(null)
    const [open, setOpen] = useState(false)

    const onOpenChange = async (open: boolean) => {
        if (open) {
            const response = await fetchHistory(task)
            setHistory(response)
        }
        setOpen(open)
    }

    return (
        <TableExpandableRow
            className={clsx(className, styles.row)}
            open={!!history && open}
            onOpenChange={onOpenChange}
            {...rest}
            content={
                history && (
                    <TaskTableRowContents task={task} history={history} />
                )
            }
        />
    )
}
