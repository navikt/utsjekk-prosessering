import { useEffect } from 'react'

type UseIntervalOptions = {
    on: boolean
    rateMS: number
}

export const useInterval = (
    callback: () => void,
    { on, rateMS }: UseIntervalOptions
) => {
    useEffect(() => {
        if (on) {
            const timer = setInterval(callback, rateMS)

            return () => {
                clearInterval(timer)
            }
        }
    }, [callback, rateMS, on])
}
