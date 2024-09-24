import { NextRequest } from 'next/server'
import { requireAuthHeader } from '@/lib/headers'

export async function GET(
    _: NextRequest,
    { params }: { params: { id: Task['id'] } }
) {
    const authHeader = requireAuthHeader()
    const taskId = params.id

    console.log(
        'URL',
        `${process.env.TASK_API_BASE_URL}/api/tasks/${taskId}/history`
    )

    return fetch(
        `${process.env.TASK_API_BASE_URL}/api/tasks/${taskId}/history`,
        {
            headers: {
                ...authHeader,
            },
        }
    )
}
