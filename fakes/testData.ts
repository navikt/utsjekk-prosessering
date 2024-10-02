import { randomUUID } from 'node:crypto'

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
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            scheduledFor: new Date().toISOString(),
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
                createdAt: new Date().toISOString(),
                triggeredAt: new Date().toISOString(),
                triggeredBy: new Date().toISOString(),
                status: 'COMPLETE',
            },
            {
                id: randomUUID(),
                taskId: taskId,
                createdAt: new Date().toISOString(),
                triggeredAt: new Date().toISOString(),
                triggeredBy: new Date().toISOString(),
                status: 'IN_PROGRESS',
            },
        ]
    },
}
