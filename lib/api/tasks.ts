import { logger } from '@navikt/next-logger'
import { requireAuthHeader } from '@/lib/headers'

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

    const authHeader = requireAuthHeader()

    logger.info(
        `Prøver å hente tasks: ${process.env.NEXT_PUBLIC_HOSTNAME}/api/tasks?${searchParams.toString()}`
    )
    const response = await fetch(
        // `${process.env.NEXT_PUBLIC_HOSTNAME}/api/tasks?${searchParams.toString()}`,
        `http://localhost:3000/api/tasks?${searchParams.toString()}`,
        {
            cache: 'no-cache',
            headers: {
                ...authHeader,
            },
        }
    )

    if (response.ok) {
        logger.info('Hentet tasks')
        const body = await response.json()
        return {
            data: body,
            error: null,
        }
    } else {
        logger.error(
            'Klarte ikke hente tasks:',
            response.status,
            response.statusText
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
