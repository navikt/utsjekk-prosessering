import express from 'express'
import { TestData } from './testData.ts'

const app = express()
const port = 8080

const tasks: Record<string, Task> = {}
const taskHistory: Record<string, TaskHistory[]> = {}

for (const task of TestData.tasks(100)) {
    tasks[task.id] = task
    taskHistory[task.id] = TestData.taskHistory(task.id)
}

app.get('/api/tasks', (req, res) => {
    const page = req.query.page ? +req.query.page : 1
    const pageSize = req.query.pageSize ? +req.query.pageSize : 20

    const start = (page - 1) * pageSize
    const allTasks = Object.values(tasks)
    const paginatedTasks = allTasks.slice(start, start + pageSize)

    const body = {
        tasks: paginatedTasks,
        page: page,
        pageSize: pageSize,
        totalTasks: allTasks.length,
    }
    res.send(JSON.stringify(body)).status(200)
})

app.get('/api/tasks/:taskId/history', (req, res) => {
    const body = taskHistory[req.params.taskId]
    res.send(JSON.stringify(body)).status(200)
})

app.patch('/api/tasks/:taskId', (req, res) => {})

app.listen(port, () => {
    console.log(`Utsjekk mock listening on port ${port}`)
})
