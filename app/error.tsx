'use client' // Error boundaries must be Client Components

import { useEffect } from 'react'
import styles from '@/app/page.module.css'
import { Alert } from '@navikt/ds-react'
import { logger } from '@navikt/next-logger'

type Props = {
    error: Error & { digest?: string }
    reset: () => void
}

export default function Error({ error }: Props) {
    useEffect(() => {
        logger.error(error)
    }, [error])

    return (
        <section className={styles.page}>
            <Alert className={styles.alert} variant="error">
                Klare ikke hente tasks. Prøv igjen senere
            </Alert>
        </section>
    )
}
