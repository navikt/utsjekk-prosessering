let cachedToken: string | null = null

export async function getLocalToken(): Promise<string | null> {
    if (cachedToken) {
        return cachedToken
    }

    const response = await fetch(
        process.env.TOKEN_ENDPOINT ?? 'http://localhost:8080/token'
    )

    const body = await response.json()

    cachedToken = body.access_token

    return cachedToken
}
