import { NextRequest } from 'next/server'
import { checkToken, fetchApiToken } from '@/lib/auth/token'
import { Routes } from '@/lib/api/routes'

export async function GET(
    _: NextRequest,
    { params }: { params: { id: Task['id'] } }
) {
    await checkToken()

    const apiToken = await fetchApiToken()

    return fetch(Routes.external.history(params.id), {
        headers: {
            Authorization: `Bearer ${apiToken}`,
        },
    })
}
