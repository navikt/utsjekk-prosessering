'use server'

import React from 'react'
import { InternalHeader, Spacer } from '@navikt/ds-react'
import { InternalHeaderTitle } from '@navikt/ds-react/InternalHeader'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { faker } from '@faker-js/faker'
import { UserMenu } from '@/components/header/UserMenu.tsx'

function getUser(): {
    name: string
    email: string
    ident: string
} {
    if (process.env.NODE_ENV === 'development') {
        return {
            name: `${faker.person.firstName()} ${faker.person.lastName()}`,
            email: 'dev@localhost',
            ident: 'A12345',
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
    const ident = payload.NAVident

    return {
        name,
        email,
        ident,
    }
}

export async function Header() {
    const user = getUser()

    return (
        <InternalHeader>
            <InternalHeaderTitle as="h1">
                Utsjekk-prosessering
            </InternalHeaderTitle>
            <Spacer />
            <UserMenu name={user.name} ident={user.ident} />
        </InternalHeader>
    )
}
