import { NextRequest } from 'next/server'
import { checkToken, fetchApiToken } from '@/lib/auth/token.ts'

export async function PUT(request: NextRequest) {
    await checkToken()

    const searchParams = request.nextUrl.searchParams
    const apiToken = await fetchApiToken()

    return fetch(
        `${process.env.TASK_API_BASE_URL}/api/tasks/rerun?${searchParams.toString()}`,
        {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${apiToken}`,
            },
        }
    )
}
