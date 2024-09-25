'use client'

import { Button } from '@navikt/ds-react'
import { useRouter } from 'next/navigation'
import { logger } from '@navikt/next-logger'

const retryTask = async (task: Task) => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOSTNAME}/api/tasks/${task.id}`,
        {
            method: 'PATCH',
        }
    )

    if (!response.ok) {
        logger.error(`Klarte ikke rekjøre task:`, response)
    }
}

type Props = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
    task: Task
}

export const RetryTaskButton: React.FC<Props> = ({ task, ...rest }) => {
    const router = useRouter()

    const onClick = async () => {
        await retryTask(task)
        router.refresh()
    }

    return (
        <Button variant="secondary" size="small" onClick={onClick} {...rest}>
            Rekjør
        </Button>
    )
}
