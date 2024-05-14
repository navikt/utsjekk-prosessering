import tasks from './tasks.json' assert { type: 'json' }
import { NextRequest } from 'next/server'

function isTaskStatus(value: string | null): value is TaskStatus {
    switch (value) {
        case 'UBEHANDLET':
        case 'AVVIKSHÅNDTERT':
        case 'BEHANDLER':
        case 'FEILET':
        case 'FERDIG':
        case 'KLAR_TIL_PLUKK':
        case 'MANUELL_OPPFØLGING':
        case 'PLUKKET':
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

function getTaskStatusFilter(request: NextRequest) {
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

function getCallIdFilter(request: NextRequest) {
    const callIdParam = request.nextUrl.searchParams.get('callId')
    return callIdParam ? (task: any) => task.callId === callIdParam : () => true
}

function getTaskTypeFilter(request: NextRequest) {
    const taskType = request.nextUrl.searchParams.get('type')
    return taskType ? (task: any) => task.taskStepType === taskType : () => true
}

function getTasksPerSide(request: NextRequest) {
    const defaultAntall = 20
    const antall = request.nextUrl.searchParams.get('tasksPerPage')
    if (!antall) {
        return defaultAntall
    }

    const parsed = parseInt(antall)
    if (isNaN(parsed)) {
        return defaultAntall
    }

    return parsed
}

export async function GET(request: NextRequest) {
    const filtrerteTasks = tasks
        .filter(getTaskStatusFilter(request))
        .filter(getCallIdFilter(request))
        .filter(getTaskTypeFilter(request))

    const tasksPerPage = getTasksPerSide(request)
    const page = parseInt(request.nextUrl.searchParams.get('page') ?? '1')
    const pages = Math.ceil(filtrerteTasks.length / tasksPerPage)
    const currentPage = Math.min(page, pages)

    const startIndex = (currentPage - 1) * tasksPerPage
    const endIndex = startIndex + tasksPerPage
    const paginatedTasks = filtrerteTasks.slice(startIndex, endIndex)

    return new Response(
        JSON.stringify({
            tasks: paginatedTasks,
            totaltAntallTasks: filtrerteTasks.length,
            pages: Math.ceil(filtrerteTasks.length / tasksPerPage),
            currentPage: currentPage,
        }),
        {
            status: 200,
        }
    )
}
