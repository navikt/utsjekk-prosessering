'use client'

import { useEffect, useState } from 'react'
import { Alert, Checkbox, TextField } from '@navikt/ds-react'
import {
    TaskTable,
    TaskTableSkeleton,
} from '@/components/taskTable/TaskTable.tsx'
import { Filtere } from '@/components/Filtere.tsx'
import { Footer } from '@/components/Footer.tsx'
import { formatDate } from '@/lib/date.ts'

import { fetchTasks, FetchTasksResponse } from '@/lib/api/tasks.ts'

import styles from './Tasks.module.css'

const MIN_FETCH_RATE_MS = 1000
const MAX_FETCH_RATE_MS = 60_000

type Props = {
    searchParams: SearchParams
}

export const Tasks: React.FC<Props> = ({ searchParams }) => {
    const [response, setResponse] =
        useState<Awaited<FetchTasksResponse> | null>(null)
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
        fetchTasks(searchParams).then(setResponse)
    }, [searchParams])

    useEffect(() => {
        if (shouldRefetch) {
            const timer = setInterval(async () => {
                const response = await fetchTasks(searchParams)
                setResponse(response)
                setLastUpdated(new Date())
            }, fetchRateMS)

            return () => {
                clearInterval(timer)
            }
        }
    }, [searchParams, fetchRateMS, shouldRefetch])

    if (!response) {
        return <TasksSkeleton />
    }

    if (response.error) {
        return (
            <Alert className={styles.alert} variant="error">
                Klarte ikke hente tasks:
                <br />
                {response.error.statusCode} - {response.error.message}
            </Alert>
        )
    }

    if (response.data.tasks.length === 0) {
        return (
            <>
                <Filtere />
                <Alert className={styles.alert} variant="info">
                    Fant ingen tasks med gjeldende filtere
                </Alert>
            </>
        )
    }

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
            <TaskTable className={styles.tasks} tasks={response.data.tasks} />
            <Footer
                className={styles.footer}
                numberOfTasks={response.data.tasks.length}
                page={response.data.page}
                pageSize={response.data.pageSize}
                totalTasks={response.data.totalTasks}
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
