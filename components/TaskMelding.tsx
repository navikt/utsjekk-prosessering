import Link from 'next/link'
import { useRef } from 'react'
import { Button, Modal } from '@navikt/ds-react'
import { ModalBody, ModalFooter } from '@navikt/ds-react/Modal'

import styles from './TaskMelding.module.css'

type Props = {
    melding?: string | null
}

export function TaskMelding({ melding }: Props) {
    const ref = useRef<HTMLDialogElement>(null)

    if (!melding) {
        return 'Ingen melding'
    }

    const åpneModal = () => {
        ref.current?.showModal()
    }

    const lukkModal = () => {
        ref.current?.close()
    }

    return (
        <>
            <Link
                href="#"
                role="button"
                onClick={åpneModal}
                className={styles.button}
            >
                {melding}
            </Link>
            <Modal
                ref={ref}
                header={{ heading: 'Melding' }}
                className={styles.modal}
            >
                <ModalBody>
                    <pre className={styles.melding}>
                        {JSON.stringify(JSON.parse(melding), null, 2)}
                    </pre>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={lukkModal}>Lukk</Button>
                </ModalFooter>
            </Modal>
        </>
    )
}
