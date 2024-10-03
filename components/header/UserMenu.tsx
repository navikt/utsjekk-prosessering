'use client'

import { InternalHeaderUserButton } from '@navikt/ds-react/InternalHeader'
import { BodyShort, Detail, Dropdown, Link, Spacer } from '@navikt/ds-react'
import {
    DropdownMenu,
    DropdownMenuDivider,
    DropdownMenuList,
    DropdownMenuListItem,
    DropdownToggle,
} from '@navikt/ds-react/Dropdown'
import { LeaveIcon } from '@navikt/aksel-icons'

type Props = {
    name: string
    ident: string
}

export const UserMenu: React.FC<Props> = ({ name, ident }) => {
    return (
        <Dropdown>
            <InternalHeaderUserButton as={DropdownToggle} name={name} />
            <DropdownMenu>
                <dl>
                    <BodyShort as="dt" size="small">
                        {name}
                    </BodyShort>
                    <Detail as="dd">{ident}</Detail>
                </dl>
                <DropdownMenuDivider />
                <DropdownMenuList>
                    <DropdownMenuListItem as={Link} href="/oauth2/logout">
                        Logg ut <Spacer />{' '}
                        <LeaveIcon aria-hidden fontSize="1.5rem" />
                    </DropdownMenuListItem>
                </DropdownMenuList>
            </DropdownMenu>
        </Dropdown>
    )
}
