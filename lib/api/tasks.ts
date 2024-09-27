'use server'

import { logger } from '@navikt/next-logger'
import { headers } from 'next/headers'

type FetchTasksResponseData = {
    tasks: Task[]
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

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOSTNAME}/api/tasks?${params.toString()}`,
        {
            cache: 'no-cache',
            headers: headers(),
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
