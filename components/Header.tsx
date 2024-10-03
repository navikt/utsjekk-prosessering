import React from 'react'
import { InternalHeader, Spacer } from '@navikt/ds-react'
import {
    InternalHeaderTitle,
    InternalHeaderUser,
} from '@navikt/ds-react/InternalHeader'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

function getUser(): {
    name: string
    email: string
} {
    if (process.env.NODE_ENV === 'development') {
        return {
            name: 'Ola Kari Nordmann',
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
    const name = payload.name
    const email = payload.preferred_username.toLowerCase()

    return {
        name,
        email,
    }
}

export function Header() {
    const user = getUser()

    return (
        <InternalHeader>
            <InternalHeaderTitle as="h1">
                Utsjekk-prosessering
            </InternalHeaderTitle>
            <Spacer />
            <InternalHeaderUser name={user.name} />
        </InternalHeader>
    )
}
