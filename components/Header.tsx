import React from 'react'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { InternalHeader, Spacer } from '@navikt/ds-react'
import {
    InternalHeaderTitle,
    InternalHeaderUser,
} from '@navikt/ds-react/InternalHeader'
import { logger } from '@navikt/next-logger'

function getUser(): {
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
    logger.info(`jwt ${token}`)

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

export function Header() {
    const user = getUser()

    return (
        <InternalHeader>
            <InternalHeaderTitle as="h1">
                Utsjekk-prosessering
            </InternalHeaderTitle>
            <Spacer />
            <InternalHeaderUser name={`${user.firstName} ${user.lastName}`} />
        </InternalHeader>
    )
}
