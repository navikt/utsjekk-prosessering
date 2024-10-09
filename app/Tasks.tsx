'use client'

import { useEffect, useState } from 'react'
import { Checkbox, TextField } from '@navikt/ds-react'
import { logger } from '@navikt/next-logger'
import {
    TaskTable,
    TaskTableSkeleton,
} from '@/components/taskTable/TaskTable.tsx'
import { Filtere } from '@/components/Filtere.tsx'
import { Footer } from '@/components/Footer.tsx'
import { Routes } from '@/lib/api/routes.ts'
import { formatDate } from '@/lib/date.ts'
import { taskSchema } from '@/lib/schema.ts'

import styles from './Tasks.module.css'

const MIN_FETCH_RATE_MS = 1000
const MAX_FETCH_RATE_MS = 60_000

export type FetchTasksResponseData = {
    tasks: ParseResult<Task>[]
    page: number
    pageSize: number
    totalTasks: number
}

type FetchTasksResponse = ApiResponse<FetchTasksResponseData>

export const fetchTasks = async (
    searchParams: SearchParams
): Promise<FetchTasksResponse> => {
    const params = new URLSearchParams(searchParams)
    if (!params.get('page')) {
        params.set('page', '1')
    }

    const response = await fetch(
        `${Routes.internal.tasks}?${params.toString()}`
    )

    if (response.ok) {
        const body = await response.json()

        return {
            data: {
                ...body,
                tasks: body.tasks.map((task: Task) =>
                    taskSchema.safeParse(task)
                ),
            },
            error: null,
        }
    } else {
        logger.error(
            `Klarte ikke hente tasks: ${response.status} - ${response.statusText}`
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

type Props = {
    initialData: FetchTasksResponseData
    searchParams: SearchParams
}

export const Tasks: React.FC<Props> = ({ initialData, searchParams }) => {
    const [data, setData] = useState(initialData)
    const [shouldRefetch, setShouldRefetch] = useState(false)
    const [fetchRateMS, setFetchRateMS] = useState(5000)
    const [lastUpdated, setLastUpdated] = useState(new Date())

    const onChangeRefetch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setShouldRefetch(event.target.checked)
    }

    const onChangeFetchRate = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = +event.target.value
        if (isNaN(value)) {
            return
        }

        const valueMS = value * 1000

        if (valueMS < MIN_FETCH_RATE_MS) {
            return setFetchRateMS(MIN_FETCH_RATE_MS)
        }

        if (valueMS > MAX_FETCH_RATE_MS) {
            return setFetchRateMS(MAX_FETCH_RATE_MS)
        }

        setFetchRateMS(valueMS)
    }

    useEffect(() => {
        if (shouldRefetch) {
            const timer = setInterval(async () => {
                const { data } = await fetchTasks(searchParams)
                if (data) {
                    setData(data)
                    setLastUpdated(new Date())
                }
            }, fetchRateMS)

            return () => {
                clearInterval(timer)
            }
        }
    }, [searchParams, fetchRateMS, shouldRefetch])

    useEffect(() => {
        setData(initialData)
    }, [initialData])

    return (
        <>
            <Filtere className={styles.filtere} />
            <div className={styles.refetch}>
                <span>
                    <Checkbox onChange={onChangeRefetch}>
                        Refresh hvert
                    </Checkbox>
                    <TextField
                        size="small"
                        label="Sekunder"
                        hideLabel
                        type="number"
                        inputMode="numeric"
                        min={MIN_FETCH_RATE_MS / 1000}
                        max={MAX_FETCH_RATE_MS / 1000}
                        disabled={!shouldRefetch}
                        value={fetchRateMS / 1000}
                        onChange={onChangeFetchRate}
                    />
                    <span>sekund(er)</span>
                </span>
                <span suppressHydrationWarning>
                    Sist oppdatert: {formatDate(lastUpdated.toISOString())}
                </span>
            </div>
            <TaskTable className={styles.tasks} tasks={data.tasks} />
            <Footer
                className={styles.footer}
                numberOfTasks={data.tasks.length}
                page={data.page}
                pageSize={data.pageSize}
                totalTasks={data.totalTasks}
            />
        </>
    )
}

export const TasksSkeleton = () => {
    return (
        <>
            <Filtere className={styles.filtere} />
            <div className={styles.refetch}>
                <span>
                    <Checkbox disabled>Refresh hvert</Checkbox>
                    <TextField
                        size="small"
                        label="Sekunder"
                        hideLabel
                        type="number"
                        inputMode="numeric"
                        min={MIN_FETCH_RATE_MS / 1000}
                        max={MAX_FETCH_RATE_MS / 1000}
                        disabled
                        value={5}
                    />
                    <span>sekund(er)</span>
                </span>
                <span>Henter tasks</span>
            </div>
            <TaskTableSkeleton />
            <Footer
                className={styles.footer}
                numberOfTasks={0}
                page={1}
                pageSize={0}
                totalTasks={0}
            />
        </>
    )
}
