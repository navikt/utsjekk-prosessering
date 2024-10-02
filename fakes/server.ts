import express from 'express'
import { TestData } from './testData.ts'
import QueryString from 'qs'

const app = express()
const port = 8080

app.use(express.json())

const tasks: Record<string, Task> = {}
const taskHistory: Record<string, TaskHistory[]> = {}

for (const task of TestData.tasks(100)) {
    tasks[task.id] = task
    taskHistory[task.id] = TestData.taskHistory(task.id)
}

const parseStringQueryParam = (
    value?: string | string[] | QueryString.ParsedQs | QueryString.ParsedQs[]
): undefined | string[] => {
    if (typeof value === 'string') {
        return value.split(',')
    } else if (
        Array.isArray(value) &&
        value.every((it) => typeof it === 'string')
    ) {
        return value
    }

    return undefined
}

app.get('/api/tasks', (req, res) => {
    const page = req.query.page ? +req.query.page : 1
    const pageSize = req.query.pageSize ? +req.query.pageSize : 20
    const status = parseStringQueryParam(req.query.status) ?? []
    const kind = typeof req.query.kind === 'string' ? req.query.kind : undefined

    const allTasks = Object.values(tasks)
        .filter((it) => status.length === 0 || status.includes(it.status))
        .filter((it) => !kind || it.kind === kind)
    const currentPage = Math.min(page, Math.ceil(allTasks.length / pageSize))
    const start = (currentPage - 1) * pageSize
    const paginatedTasks = allTasks.slice(start, start + pageSize)

    const body = {
        tasks: paginatedTasks,
        page: currentPage,
        pageSize: pageSize,
        totalTasks: allTasks.length,
    }
    res.send(JSON.stringify(body)).status(200)
})

app.get('/api/tasks/:taskId/history', (req, res) => {
    const body = taskHistory[req.params.taskId]
    res.send(JSON.stringify(body)).status(200)
})

app.patch('/api/tasks/:taskId', (req, res) => {
    const requestBody = req.body as {
        message: string
        status: TaskStatus
    }

    tasks[req.params.taskId] = {
        ...tasks[req.params.taskId],
        ...requestBody,
    }

    res.sendStatus(200)
})

app.listen(port, () => {
    console.log(`Utsjekk mock listening on port ${port}`)
})
