import { NextRequest } from 'next/server'
import { checkToken, getApiToken } from '@/lib/auth/token'

export async function GET(request: NextRequest) {
    await checkToken()

    const searchParams = request.nextUrl.searchParams
    const apiToken = await getApiToken()

    return fetch(
        `${process.env.TASK_API_BASE_URL}/api/tasks?${searchParams.toString()}`,
        {
            headers: {
                Authorization: `Bearer ${apiToken}`,
            },
        }
    )
}
