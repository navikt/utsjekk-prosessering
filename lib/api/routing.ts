import type { NextRequest } from 'next/server'

export function getApiUrl(request: NextRequest) {
    return request.nextUrl.href.replace(
        request.nextUrl.origin,
        process.env.UTSJEKK_API_HOSTNAME!
    )
}
