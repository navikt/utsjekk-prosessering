import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const isLocal = process.env.NODE_ENV !== 'production'

export async function middleware(
    request: NextRequest
): Promise<NextResponse | void> {
    const url = new URL(request.url)

    if (isLocal) {
        const token = await getLocalToken(request)
        request.headers.set('Authorization', `Bearer ${token}`)

        return NextResponse.next({
            request: {
                headers: request.headers,
            },
        })
    }

    if (!isLocal && !request.headers.has('Authorization')) {
        return NextResponse.redirect(
            new URL(`/oauth2/login?redirect=${url.pathname}`, request.url)
        )
    }
}

export const config = {
    matcher: ['/api/:path*'],
}

const getLocalToken = async (request: NextRequest) => {
    if (!request.headers.get('Authorization')) {
        const response = await fetch('http://localhost:8080/token')

        if (response.ok) {
            const token = await response.json()
            return token.access_token
        } else {
            throw Error(`Failed to fetch local token: ${response}`)
        }
    }
}
