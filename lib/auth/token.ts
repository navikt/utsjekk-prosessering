import { getToken, requestOboToken, validateToken } from '@navikt/oasis'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { getLocalToken } from '@/lib/auth/localToken'
import { isLocal, requireEnv } from '@/lib/env'
import { logger } from '@navikt/next-logger'

export async function checkToken() {
    if (process.env.NODE_ENV === 'development') return

    const token = getToken(headers())
    if (!token) {
        redirect('/oauth2/login')
    }

    const result = await validateToken(token)
    if (!result.ok) {
        logger.warn(`Tokenvalidering gikk galt: ${result.error.message}`)
        redirect('/oauth2/login')
    }
}

export async function getApiToken(): Promise<string | null> {
    if (isLocal) {
        return getLocalToken()
    }

    const token = getToken(headers())
    if (!token) {
        throw new Error('Mangler access token')
    }

    const scope = requireEnv('UTSJEKK_SCOPE')
    const result = await requestOboToken(token, scope)
    if (!result.ok) {
        logger.warn(`Henting av obo-token feilet: ${result.error.message}`)
        return null
    }

    return result.token
}
