import { NextRequest } from 'next/server'
import { requireAuthHeader } from '@/lib/headers'

type Params = {
    kind: string // Task['kind']
    after: datetime
    status: string // Task['status']
}

export async function GET(_: NextRequest, { params }: { params: Params }) {
    const authHeader = requireAuthHeader()
    const url = new URL(`${process.env.TASK_API_BASE_URL}/api/tasks`)

    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            url.searchParams.append(key, value)
        })
    }

    return fetch(url, {
        headers: {
            ...authHeader,
        },
    })
}
