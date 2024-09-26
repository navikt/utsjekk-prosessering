'use server'

import {
    getToken,
    requestAzureClientCredentialsToken,
    validateToken,
} from '@navikt/oasis'
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

    const existing = headers().get('Utsjekk-Token')
    if (existing) {
        const validation = await validateToken(existing)
        if (validation.ok) {
            return existing
        }
    }

    const token = getToken(headers())
    if (!token) {
        throw new Error('Mangler access token')
    }

    const scope = requireEnv('UTSJEKK_SCOPE')
    const result = await requestAzureClientCredentialsToken(scope)
    if (!result.ok) {
        logger.warn(`Henting av api-token feilet: ${result.error.message}`)
        return null
    }

    headers().set('Utsjekk-Token', result.token)

    return result.token
}
