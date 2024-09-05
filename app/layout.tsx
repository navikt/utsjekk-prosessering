import React from 'react'
import clsx from 'clsx'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Header } from '@/app/Header'
import { Desktop } from '@/components/Desktop'

import styles from './layout.module.css'

import './globals.css'
import '@navikt/ds-css'

const msFont = localFont({
    src: [
        {
            path: '../public/fonts/ms_sans_serif.woff2',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../public/fonts/ms_sans_serif_bold.woff2',
            weight: '700',
            style: 'normal',
        },
    ],
})

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
            <body className={clsx(msFont.className, styles.body)}>
                <Header />
                <Desktop>{children}</Desktop>
            </body>
        </html>
    )
}
