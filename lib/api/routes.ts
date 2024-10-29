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
    },
    external: {
        tasks: `${taskApiBaseUrl}/api/tasks`,
        history(id: string): string {
            return `${taskApiBaseUrl}/api/tasks/${id}/history`
        },
    },
} as const
