import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useInterval } from '@/lib/hooks/useInterval.ts'

describe('useInterval', () => {
    beforeEach(() => {
        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    test('calls callback with given interval', () => {
        let counter = 0
        const increment = () => {
            counter += 1
        }

        renderHook(() => useInterval(increment, { on: true, rateMS: 100 }))

        expect(counter).toEqual(0)

        vi.advanceTimersByTime(99)
        expect(counter).toEqual(0)

        vi.advanceTimersByTime(2)
        expect(counter).toEqual(1)

        vi.advanceTimersByTime(100)
        expect(counter).toEqual(2)
    })
})
