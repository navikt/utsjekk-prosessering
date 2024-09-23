import { headers } from 'next/headers'

export const requireAuthHeader = () => {
    const auth = headers().get('Authorization')

    if (!auth) {
        throw Error('Missing auth header')
    }

    return { Authorization: auth }
}
