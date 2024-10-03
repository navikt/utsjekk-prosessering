'use server'

import { logger } from '@navikt/next-logger'
import { taskSchema } from '@/lib/schema'
import { fetchApiToken } from '@/lib/auth/token'

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

    const token = await fetchApiToken()

    const response = await fetch(
        `${process.env.TASK_API_BASE_URL}/api/tasks?${params.toString()}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
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
