import { z } from 'zod'

const taskStatusSchema = z.enum(['IN_PROGRESS', 'COMPLETE', 'FAIL', 'MANUAL'])

const taskKindSchema = z.enum(['Avstemming', 'Iverksetting', 'SjekkStatus'])

export const taskSchema = z.object({
    id: z.string(),
    payload: z.string(),
    status: taskStatusSchema,
    attempt: z.number(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
    scheduledFor: z.string().datetime({ offset: true }),
    message: z.string().nullish(),
    kind: taskKindSchema,
    metadata: z.record(z.string(), z.string()),
})
