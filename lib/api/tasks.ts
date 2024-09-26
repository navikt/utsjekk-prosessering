import { logger } from '@navikt/next-logger'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

type FetchTasksResponseData = {
    tasks: Task[]
    page: number
    pageSize: number
    totalTasks: number
}

type FetchTasksResponse = ApiResponse<FetchTasksResponseData>

const fetchTasks = async (
    searchParams: URLSearchParams
): Promise<FetchTasksResponse> => {
    if (!searchParams.get('page')) {
        searchParams.set('page', '1')
    }

    const response = await fetch(`api/tasks?${searchParams.toString()}`)

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

const defaultTasksResponse: FetchTasksResponse = {
    data: {
        tasks: [],
        page: 1,
        pageSize: 20,
        totalTasks: 0,
    },
    error: null,
}

export const useTasks = (): FetchTasksResponse => {
    const searchParams = useSearchParams()

    const [response, setResponse] =
        useState<FetchTasksResponse>(defaultTasksResponse)

    useEffect(() => {
        fetchTasks(searchParams).then(setResponse)
    }, [searchParams])

    return response
}
