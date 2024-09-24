type FetchTasksResponseData = {
    tasks: Task[]
    page: number
    pageSize: number
    totalTasks: number
}

type FetchTasksResponseError = {
    message: string
    statusCode: number
}

type FetchTasksResponseSuccess = {
    data: FetchTasksResponseData
    error: null
}

type FetchTasksResponseFailure = {
    data: null
    error: FetchTasksResponseError
}

type FetchTasksResponse = FetchTasksResponseSuccess | FetchTasksResponseFailure

export async function fetchTasks(
    searchParams: URLSearchParams
): Promise<FetchTasksResponse> {
    if (!searchParams.get('page')) {
        searchParams.set('page', '1')
    }

    const url = new URL(
        `${process.env.NEXT_PUBLIC_HOSTNAME}/api/tasks?${searchParams.toString()}`
    )

    const response = await fetch(url)

    if (response.ok) {
        const body = await response.json()
        return {
            data: body,
            error: null,
        }
    } else {
        console.error(
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
