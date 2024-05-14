import { Alert, Table } from '@navikt/ds-react'
import {
    TableBody,
    TableHeader,
    TableHeaderCell,
    TableRow,
} from '@navikt/ds-react/Table'
import { TaskTableRow } from '@/components/TaskTableRow'
import { ClientPagination } from '@/components/ClientPagination'
import { UrlSearchParamInput } from '@/components/UrlSearchParamInput'
import { Filtere } from '@/app/Filtere'

import styles from './page.module.css'

function getSearchParam(name: string, searchParams: SearchParams): string {
    const statusFilter = searchParams[name]
    return statusFilter && statusFilter.length > 0
        ? `${name}=${statusFilter}`
        : ''
}

type TasksResponse = {
    tasks: Task[]
    pages: number
    currentPage: number
    totaltAntallTasks: number
}

async function hentTasks(searchParams: SearchParams): Promise<TasksResponse> {
    const query = [
        getSearchParam('status', searchParams),
        getSearchParam('callId', searchParams),
        getSearchParam('page', searchParams),
        getSearchParam('type', searchParams),
        getSearchParam('tasksPerPage', searchParams),
    ]

    const queryString = query.length > 0 ? `?${query.join('&')}` : ''

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOSTNAME}/api/tasks${queryString}`,
        {
            method: 'GET',
        }
    )

    if (response.ok) {
        return response.json()
    } else {
        console.error(
            'Klarte ikke hente tasks:',
            response.status,
            response.statusText,
            await response.json()
        )
        return { tasks: [], pages: 1, currentPage: 1, totaltAntallTasks: 0 }
    }
}

type Props = {
    searchParams: SearchParams
}

export default async function Home({ searchParams }: Props) {
    const { tasks, pages, currentPage, totaltAntallTasks } =
        await hentTasks(searchParams)

    return (
        <section className={styles.page}>
            <Filtere />
            {tasks.length > 0 && (
                <div className={styles.tableContainer}>
                    <Table className={styles.table}>
                        <TableHeader>
                            <TableRow>
                                <TableHeaderCell>Status</TableHeaderCell>
                                <TableHeaderCell>ID</TableHeaderCell>
                                <TableHeaderCell>Type</TableHeaderCell>
                                <TableHeaderCell>Call-ID</TableHeaderCell>
                                <TableHeaderCell>Sist kjørt</TableHeaderCell>
                                <TableHeaderCell>Hendelser</TableHeaderCell>
                                <TableHeaderCell />
                                <TableHeaderCell />
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {tasks.map((task) => (
                                <TaskTableRow key={task.id} task={task} />
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
            {tasks.length === 0 && (
                <Alert className={styles.alert} variant="info">
                    Fant ingen tasks med gjeldende filtere
                </Alert>
            )}
            <div className={styles.footer}>
                <ClientPagination
                    className={styles.pagination}
                    pages={pages}
                    currentPage={currentPage}
                />
                <div className={styles.antallTasksContainer}>
                    Viser{' '}
                    <UrlSearchParamInput
                        label=""
                        defaultValue={tasks.length}
                        searchParamName="tasksPerPage"
                        size="small"
                        inputMode="numeric"
                        maxLength={3}
                        className={styles.antallTasksInput}
                    />
                    av {totaltAntallTasks} tasks
                </div>
            </div>
        </section>
    )
}
