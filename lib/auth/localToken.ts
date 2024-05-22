import { validateToken } from '@navikt/oasis'
import { requireEnv } from '@/lib/env'

let cachedToken: string | null = null

export async function getLocalToken(): Promise<string | null> {
    const scope = requireEnv('UTSJEKK_SCOPE')
    const clientId = requireEnv('AZURE_APP_CLIENT_ID')
    const clientSecret = requireEnv('AZURE_APP_CLIENT_SECRET')
    const tokenEndpoint = requireEnv('AZURE_OPENID_CONFIG_TOKEN_ENDPOINT')

    if (cachedToken && (await validateToken(cachedToken))) {
        return cachedToken
    }

    const response = await fetch(`${tokenEndpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: Object.entries({
            grant_type: 'client_credentials',
            client_id: clientId,
            client_secret: clientSecret,
            scope: scope,
        })
            .map(([key, value]) => `${key}=${value}`)
            .join('&'),
    })

    const body = await response.json()

    cachedToken = body.access_token

    return cachedToken
}
