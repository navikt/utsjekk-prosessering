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

export const TaskTableRow: React.FC<Props> = ({
    task,
    children,
    className,
    ...rest
}) => {
    const [isFetching, setIsFetching] = useState(false)
    const [history, setHistory] = useState<FetchHistoryResponse | null>(null)
    const [open, setOpen] = useState(false)

    const onOpenChange = async (open: boolean) => {
        if (open) {
            setIsFetching(true)
            const response = await fetchHistory(task)
            setHistory(response)
            setIsFetching(false)
        }
        setOpen(open)
    }

    return (
        <TableExpandableRow
            className={clsx(
                className,
                styles.row,
                isFetching && styles.fetching
            )}
            open={!!history && open}
            onOpenChange={onOpenChange}
            {...rest}
            content={
                history && (
                    <TaskTableRowContents task={task} history={history} />
                )
            }
        >
            {children}
        </TableExpandableRow>
    )
}
