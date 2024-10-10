import { Routes } from '@/lib/api/routes.ts'
import { taskSchema } from '@/lib/schema.ts'
import { logger } from '@navikt/next-logger'

export type FetchTasksResponseData = {
    tasks: ParseResult<Task>[]
    page: number
    pageSize: number
    totalTasks: number
}

export type FetchTasksResponse = ApiResponse<FetchTasksResponseData>

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
