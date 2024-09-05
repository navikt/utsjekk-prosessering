import { Table } from '@/components/Table'
import { TableHeaderCell } from '@/components/TableHeaderCell'
import { TableBody } from '@/components/TableBody'
import { TableDataCell } from '@/components/TableDataCell'
import { Window } from '@/components/Window'
import { getApiToken } from '@/lib/auth/token'
import { ProgramNames } from '@/components/programs/names'

function getSearchParam(name: string, searchParams: SearchParams): string {
    const statusFilter = searchParams[name]
    return statusFilter && statusFilter.length > 0
        ? `${name}=${statusFilter}`
        : ''
}

async function hentTasks(searchParams: SearchParams): Promise<Task[]> {
    const query = [
        getSearchParam('status', searchParams),
        getSearchParam('kind', searchParams),
        getSearchParam('after', searchParams),
    ]

    const queryString = query.length > 0 ? `?${query.join('&')}` : ''

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOSTNAME}/api/tasks${queryString}`,
        {
            headers: {
                Authorization: `Bearer ${await getApiToken()}`,
            },
        }
    )

    if (response.ok) {
        return await response.json()
    } else {
        console.error(
            'Klarte ikke hente tasks:',
            response.status,
            response.statusText,
            await response.json()
        )
        return []
    }
}

type Props = {
    searchParams: SearchParams
}

export const TasksProgram = async ({ searchParams }: Props) => {
    const tasks = await hentTasks(searchParams)

    return (
        <Window title="Tasks" name={ProgramNames.Tasks}>
            <Table>
                <thead>
                    <tr>
                        <TableHeaderCell>Status</TableHeaderCell>
                        <TableHeaderCell>Type</TableHeaderCell>
                        <TableHeaderCell>Kjøretid</TableHeaderCell>
                        <TableHeaderCell>Forsøk</TableHeaderCell>
                    </tr>
                </thead>
                <TableBody>
                    {tasks
                        .slice(0)
                        .sort(
                            (a, b) =>
                                new Date(b.updatedAt).getTime() -
                                new Date(a.updatedAt).getTime()
                        )
                        .map((task) => (
                            <tr key={task.id}>
                                <TableDataCell>{task.status}</TableDataCell>
                                <TableDataCell>{task.kind}</TableDataCell>
                                <TableDataCell>
                                    {task.scheduledFor}
                                </TableDataCell>
                                <TableDataCell>{task.attempt}</TableDataCell>
                            </tr>
                        ))}
                </TableBody>
            </Table>
        </Window>
    )
}
