'use server'

import { getApiToken } from '@/lib/auth/token'

export async function getHistory(taskId: string): Promise<Array<TaskHistory>> {
    const apiToken = await getApiToken()

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOSTNAME}/api/tasks/${taskId}/history`,
        {
            headers: {
                Authorization: `Bearer ${apiToken}`,
            },
        }
    )

    if (response.ok) {
        return response.json()
    } else {
        console.error(
            'Klarte ikke hente logger:',
            response.status,
            response.statusText,
            await response.json()
        )
        return []
    }
}
