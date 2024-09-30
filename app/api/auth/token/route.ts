import { NextRequest, NextResponse } from 'next/server'
import { checkToken, fetchApiToken, updateCookieToken } from '@/lib/auth/token'
import { requireEnv } from '@/lib/env'

export const GET = async (_: NextRequest) => {
    await checkToken()
    const token = await fetchApiToken()
    await updateCookieToken(token)

    return NextResponse.redirect(requireEnv('NEXT_PUBLIC_HOSTNAME'))
}
