import { randomUUID } from 'node:crypto'

const now = (): Date => {
    const date = new Date()
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset())
    return date
}

export const TestData = {
    taskStatus(): TaskStatus {
        const random = Math.random()
        switch (true) {
            case random < 0.75:
                return 'COMPLETE'
            case random < 0.95:
                return 'IN_PROGRESS'
            case random < 0.99:
                return 'FAIL'
            default:
                return 'MANUAL'
        }
    },
    task(status: TaskStatus = TestData.taskStatus()): Task {
        return {
            id: randomUUID(),
            payload: '',
            status: status,
            attempt: 1,
            updatedAt: now().toISOString(),
            createdAt: now().toISOString(),
            scheduledFor: now().toISOString(),
            kind: 'Iverksetting',
            metadata: {
                sakId: randomUUID(),
                behandlingId: randomUUID(),
                iverksettingId: randomUUID(),
            },
        }
    },
    tasks(n: number): Task[] {
        return new Array(n).fill(null).map((_) => TestData.task())
    },
    taskHistory(taskId: string): TaskHistory[] {
        return [
            {
                id: randomUUID(),
                taskId: taskId,
                createdAt: now().toISOString(),
                triggeredAt: now().toISOString(),
                triggeredBy: now().toISOString(),
                status: 'COMPLETE',
            },
            {
                id: randomUUID(),
                taskId: taskId,
                createdAt: now().toISOString(),
                triggeredAt: now().toISOString(),
                triggeredBy: now().toISOString(),
                status: 'IN_PROGRESS',
            },
        ]
    },
}
