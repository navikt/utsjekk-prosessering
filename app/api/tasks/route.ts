import { NextRequest } from 'next/server'
import { requireAuthHeader } from '@/lib/headers'

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const authHeader = requireAuthHeader()

    return fetch(
        `${process.env.TASK_API_BASE_URL}/api/tasks?${searchParams.toString()}`,
        {
            headers: {
                ...authHeader,
            },
        }
    )
}
