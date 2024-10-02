const taskApiBaseUrl = process.env.TASK_API_BASE_URL
const apiRoutesBaseUrl = process.env.NEXT_PUBLIC_HOSTNAME

export const Routes = {
    internal: {
        history(id: string): string {
            return `/api/tasks/${id}/history`
        },
    },
    external: {
        tasks: `${taskApiBaseUrl}/api/tasks`,
        history(id: string): string {
            return `${taskApiBaseUrl}/api/tasks/${id}/history`
        },
    },
} as const
