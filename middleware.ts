import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { logger } from '@navikt/next-logger'
import { headers } from 'next/headers'

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

    logger.info(`MIDDLEWARE ${headers().get('authorization')}`)

    if (!isLocal && !headers().has('authorization')) {
        logger.info('Mangler auth-header, prøver å redirecte')
        return NextResponse.redirect(
            new URL(
                `${process.env.NEXT_PUBLIC_HOSTNAME}/oauth2/login?redirect=${url.pathname}`,
                request.url
            )
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
