import { NextRequest } from 'next/server'
import { checkToken, fetchApiToken } from '@/lib/auth/token.ts'

export async function PATCH(
    _: NextRequest,
    { params }: { params: { id: Task['id'] } }
) {
    await checkToken()

    const apiToken = await fetchApiToken()
    const taskId = params.id

    return fetch(`${process.env.TASK_API_BASE_URL}/api/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${apiToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            status: 'IN_PROGRESS',
            message: 'Manuell rekjøring av task',
        }),
    })
}
