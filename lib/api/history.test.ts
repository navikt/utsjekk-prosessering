import { describe, expect, test } from 'vitest'
import { server } from '@/fakes/msw/server.ts'
import {
    emptyTaskHistoryResponse,
    taskHistoryErrorResponse,
} from '@/fakes/msw/handlers.ts'
import { randomUUID } from 'node:crypto'
import { fetchHistory } from '@/lib/api/history.ts'

describe('fetchHistory', () => {
    test('maps response when OK', async () => {
        const taskId = randomUUID()
        server.use(emptyTaskHistoryResponse(taskId))

        const response = await fetchHistory(taskId)

        expect(response.data).not.toBeNull()
        expect(response.error).toBeNull()
    })

    test('maps error when not OK', async () => {
        const taskId = randomUUID()
        server.use(taskHistoryErrorResponse(taskId))

        const response = await fetchHistory(taskId)

        expect(response.data).toBeNull()
        expect(response.error).not.toBeNull()
    })
})
