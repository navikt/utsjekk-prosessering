import React from 'react'
import { BodyShort, Box, Heading, Link, List, Page } from '@navikt/ds-react'
import { PageBlock } from '@navikt/ds-react/Page'
import { ListItem } from '@navikt/ds-react/List'

export default function NotFound() {
    return (
        <Page>
            <PageBlock as="main" width="xl" gutters>
                <Box paddingBlock="20 16">
                    <div>
                        <Heading level="1" size="large" spacing>
                            Beklager, vi fant ikke siden
                        </Heading>
                        <BodyShort>
                            Denne siden kan være slettet eller flyttet, eller
                            det er en feil i lenken.
                        </BodyShort>
                        <List>
                            <ListItem>
                                Bruk gjerne søket eller menyen
                            </ListItem>
                            <ListItem>
                                <Link href="/">Gå til forsiden</Link>
                            </ListItem>
                        </List>
                    </div>
                </Box>
            </PageBlock>
        </Page>
    )
}
