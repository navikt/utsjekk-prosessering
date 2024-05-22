import logs from './logs.json' assert { type: 'json' }
import { NextRequest } from 'next/server'

export async function GET(
    _: NextRequest,
    { params }: { params: { id: keyof typeof logs } }
) {
    return new Response(JSON.stringify(logs[params.id] as TaskLog[]), {
        status: 200,
    })
}
