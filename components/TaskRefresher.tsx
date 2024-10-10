import { useCallback, useState } from 'react'
import clsx from 'clsx'
import { Checkbox, TextField } from '@navikt/ds-react'
import { formatDate } from '@/lib/date.ts'
import { useInterval } from '@/lib/hooks/useInterval.ts'

import styles from './TaskRefresher.module.css'

const MIN_FETCH_RATE_MS = 1000
const MAX_FETCH_RATE_MS = 60_000

type Props = Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> & {
    onRefresh: () => Promise<void>
}

export const TaskRefresher: React.FC<Props> = ({
    onRefresh,
    className,
    ...rest
}) => {
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

    const refetch = useCallback(async () => {
        await onRefresh()
        setLastUpdated(new Date())
    }, [onRefresh])

    useInterval(refetch, {
        on: shouldRefetch,
        rateMS: fetchRateMS,
    })

    return (
        <div className={clsx(className, styles.refresher)} {...rest}>
            <span className={styles.controls}>
                <Checkbox onChange={onChangeRefetch}>Refresh hvert</Checkbox>
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
    )
}

type SkeletonProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>

export const TaskRefresherSkeleton: React.FC<SkeletonProps> = ({
    className,
    ...rest
}) => (
    <div className={clsx(className, styles.refresher)} {...rest}>
        <span className={styles.controls}>
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
)
