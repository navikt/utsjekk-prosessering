import { logger } from '@navikt/next-logger'
import { Routes } from '@/lib/api/routes.ts'

export type FetchHistoryResponse = ApiResponse<TaskHistory[]>

export const fetchHistory = async (
    taskId: string
): Promise<FetchHistoryResponse> => {
    const response = await fetch(Routes.internal.history(taskId))

    if (response.ok) {
        const body = await response.json()
        return {
            data: body,
            error: null,
        }
    } else {
        logger.error(
            'Klarte ikke hente task-history:',
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
