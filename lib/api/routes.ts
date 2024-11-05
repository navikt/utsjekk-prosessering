const taskApiBaseUrl = process.env.TASK_API_BASE_URL

export const Routes = {
    internal: {
        tasks: `/api/tasks`,
        history(id: string): string {
            return `/api/tasks/${id}/history`
        },
        task(id: string): string {
            return `/api/tasks/${id}`
        },
        retry(id: string): string {
            return `/api/tasks/${id}/rekjør`
        },
        retryAll(): string {
            return '/api/tasks/rekjør'
        },
    },
    external: {
        tasks: `${taskApiBaseUrl}/api/tasks`,
        history(id: string): string {
            return `${taskApiBaseUrl}/api/tasks/${id}/history`
        },
    },
} as const
