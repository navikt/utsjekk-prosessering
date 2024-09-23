type FetchTasksResponse = {
    tasks: Task[]
    page: number
    pageSize: number
    totalTasks: number
}

export async function fetchTasks(
    searchParams: URLSearchParams
): Promise<FetchTasksResponse> {
    const url = new URL(
        `${process.env.NEXT_PUBLIC_HOSTNAME}/api/tasks?${searchParams.toString()}`
    )

    const response = await fetch(url)

    if (response.ok) {
        return await response.json()
    } else {
        console.error(
            'Klarte ikke hente tasks:',
            response.status,
            response.statusText
        )
        throw Error(`${response.status} ${response.statusText}`)
    }
}
