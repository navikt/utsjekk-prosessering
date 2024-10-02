import { z } from 'zod'

const taskStatusSchema = z.enum(['IN_PROGRESS', 'COMPLETE', 'FAIL', 'MANUAL'])

const taskKindSchema = z.enum(['Avstemming', 'Iverksetting', 'SjekkStatus'])

export const taskSchema = z.object({
    id: z.string(),
    payload: z.string(),
    status: taskStatusSchema,
    attempt: z.number(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    scheduledFor: z.coerce.date(),
    message: z.string().optional(),
    kind: taskKindSchema,
    metadata: z.record(z.string(), z.string()),
})
