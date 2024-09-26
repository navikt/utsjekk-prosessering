import { logger } from '@navikt/next-logger'
import { checkToken, getApiToken } from '@/lib/auth/token'

type FetchTasksResponseData = {
    tasks: Task[]
    page: number
    pageSize: number
    totalTasks: number
}

type FetchTasksResponse = ApiResponse<FetchTasksResponseData>

export async function fetchTasks(
    searchParams: URLSearchParams
): Promise<FetchTasksResponse> {
    if (!searchParams.get('page')) {
        searchParams.set('page', '1')
    }
    await checkToken()

    const apiToken = await getApiToken()

    const response = await fetch(
        `${process.env.TASK_API_BASE_URL}/api/tasks?${searchParams.toString()}`,
        {
            headers: {
                Authorization: `Bearer ${apiToken}`,
            },
        }
    )

    if (response.ok) {
        const body = await response.json()
        return {
            data: body,
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
