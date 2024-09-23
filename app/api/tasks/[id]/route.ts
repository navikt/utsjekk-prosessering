import { NextRequest } from 'next/server'
import { requireAuthHeader } from '@/lib/headers'

export async function PATCH(
    _: NextRequest,
    { params }: { params: { id: Task['id'] } }
) {
    const authHeader = requireAuthHeader()
    const taskId = params.id

    return fetch(`${process.env.TASK_API_BASE_URL}/api/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
            ...authHeader,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            status: 'IN_PROGRESS',
            message: 'Manuell rekjøring av task',
        }),
    })
}
