import { describe, expect, test } from 'vitest'
import { server } from '@/fakes/msw/server.ts'
import { emptyTaskResponse, taskErrorResponse } from '@/fakes/msw/handlers.ts'
import { fetchTasks } from '@/lib/api/tasks.ts'

describe('fetchTasks', () => {
    test('maps response when OK', async () => {
        server.use(emptyTaskResponse())

        const response = await fetchTasks({})

        expect(response.data).not.toBeNull()
        expect(response.error).toBeNull()
    })

    test('maps error when not OK', async () => {
        server.use(taskErrorResponse())

        const response = await fetchTasks({})

        expect(response.data).toBeNull()
        expect(response.error).not.toBeNull()
    })
})
