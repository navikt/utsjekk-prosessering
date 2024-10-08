type ZodError = import('zod').ZodError

type datetime = string

declare type TaskStatus = 'IN_PROGRESS' | 'COMPLETE' | 'FAIL' | 'MANUAL'

declare type TaskKind = 'Avstemming' | 'Iverksetting' | 'SjekkStatus'

declare type Task = {
    id: string
    payload: string
    status: TaskStatus
    attempt: number
    createdAt: datetime
    updatedAt: datetime
    scheduledFor: datetime
    message?: string
    kind: TaskKind
    metadata: Record<string, string>
}

declare type TaskHistory = {
    id: string
    taskId: string
    createdAt: datetime
    triggeredAt: datetime
    triggeredBy: string
    status: TaskStatus
    message?: string | null
}

declare type SearchParams = Record<string, string>

declare type ParseSuccess<T> = {
    success: true
    data: T
}

declare type ParseError = {
    success: false
    error: ZodError
}

declare type ParseResult<T> = ParseSuccess<T> | ParseError
