import { NextRequest } from 'next/server'
import { checkToken, fetchApiToken } from '@/lib/auth/token'

export async function GET(request: NextRequest) {
    await checkToken()

    const searchParams = request.nextUrl.searchParams
    const apiToken = await fetchApiToken()

    return fetch(
        `${process.env.TASK_API_BASE_URL}/api/tasks?${searchParams.toString()}`,
        {
            headers: {
                Authorization: `Bearer ${apiToken}`,
            },
        }
    )
}

export async function PUT(request: NextRequest) {
    await checkToken()

    const searchParams = request.nextUrl.searchParams
    const apiToken = await fetchApiToken()

    return fetch(
        `${process.env.TASK_API_BASE_URL}/api/tasks?${searchParams.toString()}`,
        {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${apiToken}`,
            },
        }
    )
}
