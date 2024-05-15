import { getToken, requestOboToken, validateToken } from '@navikt/oasis'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export async function checkToken() {
    if (process.env.NODE_ENV === 'development') return

    const token = getToken(headers())
    if (!token) {
        redirect('/oauth2/login')
    }

    const result = await validateToken(token)
    if (!result.ok) {
        console.log(`Tokenvalidering gikk galt: ${result.error.message}`)
        redirect('/oauth2/login')
    }
}

export function getUser(): {
    firstName: string
    lastName: string
    email: string
} {
    if (process.env.NODE_ENV === 'development') {
        return {
            firstName: 'Ola Kari',
            lastName: 'Nordmann',
            email: 'dev@localhost',
        }
    }

    const authHeader = headers().get('Authorization')
    if (!authHeader) {
        redirect('/oauth2/login')
    }

    const token = authHeader.replace('Bearer ', '')
    const jwtPayload = token.split('.')[1]
    const payload = JSON.parse(Buffer.from(jwtPayload, 'base64').toString())

    const [lastName, firstName] = payload.name.split(', ')
    const email = payload.preferred_username.toLowerCase()

    return {
        firstName,
        lastName,
        email,
    }
}

export async function getAccessToken(): Promise<string | null> {
    if (process.env.NODE_ENV === 'development') {
        return null
    }

    const scope = process.env.UTSJEKK_SCOPE
    if (!scope) {
        return null
    }

    const token = getToken(headers())
    if (!token) {
        throw new Error('No access token, please log in...')
    }

    const result = await requestOboToken(token, scope)

    if (!result.ok) {
        console.log(`Grant azure obo token failed: ${result.error.message}`)
        return null
    }

    return result.token
}
