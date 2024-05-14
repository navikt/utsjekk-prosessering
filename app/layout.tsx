import React from 'react'
import type { Metadata } from 'next'
import { Source_Sans_3 } from 'next/font/google'
import { Header } from '@/app/Header'
import clsx from 'clsx'

import styles from './layout.module.css'

import './globals.css'
import '@navikt/ds-css'

const sourceSans = Source_Sans_3({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Utsjekk-prosessering',
    description:
        'Oversikt og administrering av automatiske oppgaver for Utsjekk',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={clsx(sourceSans.className, styles.body)}>
                <Header />
                <main className={styles.main}>{children}</main>
            </body>
        </html>
    )
}
