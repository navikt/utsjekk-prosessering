type datetime = string

declare type TaskStatus =
    | 'UNPROCESSED'
    | 'COMPLETE'
    | 'FAIL'
    | 'PROCESSING'
    | 'MANUAL'

declare type Task = {
    id: string
    payload: string
    status: TaskStatus
    attempt: number
    createdAt: datetime
    updatedAt: datetime
    scheduledFor: datetime
    message: string
    kind: string
}

declare type TaskHistory = {
    id: string
    taskId: string
    createdAt: datetime
    triggeredAt: datetime
    triggeredBy: string
    status: TaskStatus
}

declare type SearchParams = { [key: string]: string | undefined }
