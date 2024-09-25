import { logger } from '@navikt/next-logger'

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

    logger.info('Prøver å hente tasks')
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOSTNAME}/api/tasks?${searchParams.toString()}`,
        {
            cache: 'no-cache',
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
