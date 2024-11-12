import { Routes } from '@/lib/api/routes.ts'
import { logger } from '@navikt/next-logger'
import { Button } from '@navikt/ds-react'
import { useRouter } from 'next/navigation'

const retryTasks = async () => {
    const response = await fetch(Routes.internal.retryAll(), { method: 'PUT' })

    if (!response.ok) {
        logger.error('Klarte ikke rekjøte task:', response)
    }
}

type Props = {
    numberOfTasks: number
}

export const RetryMultipleTasksButton: React.FC<Props> = ({ numberOfTasks }) => {
    const router = useRouter()

    const onClick = async () => {
        await retryTasks()
        router.refresh()
    }

    return (
        <Button size="small" onClick={onClick}>
            Rekjør alle ({numberOfTasks})
        </Button>
    )
}