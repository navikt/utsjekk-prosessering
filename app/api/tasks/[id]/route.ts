import { NextRequest } from 'next/server'
import logs from '@/app/api/tasks/[id]/logs/logs.json'

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: keyof typeof logs } }
) {
    return new Response(null, { status: 200 })
}
