import { HStack, VStack } from '@navikt/ds-react'
import { XMarkOctagonFillIcon } from '@navikt/aksel-icons'
import { InsetWindowContent } from '@/components/window/InsetWindowContent'

import styles from './TasksErrorView.module.css'

type Props = {
    error: Error
}

export const TasksErrorView: React.FC<Props> = ({ error }) => {
    return (
        <VStack className={styles.error} gap="2">
            <HStack align="center" gap="2">
                <XMarkOctagonFillIcon />
                Følgende feil oppstod under henting av tasks:
            </HStack>
            <InsetWindowContent>
                <pre className={styles.errorContent}>{`${error}`}</pre>
            </InsetWindowContent>
        </VStack>
    )
}
