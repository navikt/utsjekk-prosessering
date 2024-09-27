import { NextRequest, NextResponse } from 'next/server'
import { checkToken, fetchApiToken } from '@/lib/auth/token'
import { requireEnv } from '@/lib/env'

export const GET = async (_: NextRequest) => {
    await checkToken()
    await fetchApiToken()

    return NextResponse.redirect(requireEnv('NEXT_PUBLIC_HOSTNAME'))
}
