import { NextRequest } from 'next/server'
import { requireAuthHeader } from '@/lib/headers'
import { logger } from '@navikt/next-logger'

export async function GET(request: NextRequest) {
    logger.info(`Route handler, henter tasks: ${request}`)
    const searchParams = request.nextUrl.searchParams
    const authHeader = requireAuthHeader()
    logger.info(`Auth header ok ${authHeader}`)

    const response = await fetch(
        `${process.env.TASK_API_BASE_URL}/api/tasks?${searchParams.toString()}`,
        {
            headers: {
                ...authHeader,
            },
        }
    )

    logger.info(`Response: ${response}`)
    return response
}
