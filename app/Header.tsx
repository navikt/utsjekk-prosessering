import React from 'react'
import { InternalHeader, Spacer } from '@navikt/ds-react'
import {
    InternalHeaderTitle,
    InternalHeaderUser,
} from '@navikt/ds-react/InternalHeader'

export function Header() {
    return (
        <InternalHeader>
            <InternalHeaderTitle href="/">
                Utsjekk-prosessering
            </InternalHeaderTitle>
            <Spacer />
            <InternalHeaderUser name="Stephen Ramthun" />
        </InternalHeader>
    )
}
