import tasks from './tasks.json' assert { type: 'json' }
import { NextRequest } from 'next/server'

function isTaskStatus(value: string | null): value is TaskStatus {
    switch (value) {
        case 'UNPROCESSED':
        case 'PROCESSING':
        case 'FAIL':
        case 'COMPLETE':
        case 'MANUAL':
            return true
        default:
            return false
    }
}

function formatForFiltering(value: string) {
    return isTaskStatus(value.toUpperCase())
        ? (value.toUpperCase() as TaskStatus)
        : null
}

function getTaskStatusFilter(request: NextRequest): (task: Task) => boolean {
    const tasksStatuser: TaskStatus[] =
        request.nextUrl.searchParams
            .get('status')
            ?.split(',')
            .map(formatForFiltering)
            .filter(isTaskStatus) ?? []
    return tasksStatuser.length > 0
        ? (task: any) => tasksStatuser.includes(task.status as TaskStatus)
        : () => true
}

function getKindFilter(request: NextRequest): (task: Task) => boolean {
    const kindParam = request.nextUrl.searchParams.get('kind')
    return kindParam ? (task: Task) => task.kind === kindParam : () => true
}

function getAfterFilter(request: NextRequest) {
    const after = request.nextUrl.searchParams.get('after')
    return after
        ? (task: Task) =>
              new Date(task.createdAt).getTime() < new Date(after).getTime()
        : () => true
}

export async function GET(request: NextRequest) {
    const filtrerteTasks = (tasks as Task[])
        .filter(getTaskStatusFilter(request))
        .filter(getKindFilter(request))
        .filter(getAfterFilter(request))

    return new Response(JSON.stringify(filtrerteTasks), { status: 200 })
}
