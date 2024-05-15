import React from 'react'
import { InternalHeader, Spacer } from '@navikt/ds-react'
import {
    InternalHeaderTitle,
    InternalHeaderUser,
} from '@navikt/ds-react/InternalHeader'
import { getUser } from '@/lib/auth/token'

export function Header() {
    const user = getUser()

    return (
        <InternalHeader>
            <InternalHeaderTitle href="/">
                Utsjekk-prosessering
            </InternalHeaderTitle>
            <Spacer />
            <InternalHeaderUser name={`${user.firstName} ${user.lastName}`} />
        </InternalHeader>
    )
}
