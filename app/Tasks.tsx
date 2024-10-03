'use client'

import { useEffect, useState } from 'react'
import { Checkbox, TextField } from '@navikt/ds-react'
import { fetchTasks, FetchTasksResponseData } from '@/lib/api/tasks.ts'
import { TaskTable } from '@/components/taskTable/TaskTable.tsx'
import { Filtere } from '@/components/Filtere.tsx'
import { Footer } from '@/components/Footer.tsx'
import { formatDate } from '@/lib/date.ts'

import styles from './Tasks.module.css'

const MIN_FETCH_RATE_MS = 1000
const MAX_FETCH_RATE_MS = 60_000

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
                <span>
                    Sist oppdatert: {formatDate(lastUpdated.toISOString())}
                </span>
            </div>
            <TaskTable className={styles.tasks} tasks={data.tasks} />
            <Footer
                className={styles.footer}
                page={data.page}
                pageSize={data.pageSize}
                totalTasks={data.totalTasks}
            />
        </>
    )
}
