import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getApiUrl } from '@/lib/api/routing'

const isLocal = process.env.NODE_ENV !== 'production'

export function middleware(request: NextRequest): NextResponse | void {
    const url = new URL(request.url)

    if (!isLocal && !request.headers.has('Authorization')) {
        return NextResponse.redirect(
            new URL(`/oauth2/login?redirect=${url.pathname}`, request.url)
        )
    }

    const apiUrl = getApiUrl(request)

    return NextResponse.rewrite(apiUrl)
}

export const config = {
    matcher: ['/api/:path*'],
}
