import { checkToken, getApiToken } from '@/lib/auth/token'
import { Window } from '@/components/Window'
import { Table } from '@/components/Table'

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

export default async function Home({ searchParams }: Props) {
    await checkToken()
    const tasks = await hentTasks(searchParams)

    return (
        <>
            <Window title="Tasks">
                <Table>
                    <thead>
                        <tr>
                            <th>A</th>
                            <th>B</th>
                            <th>C</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>2</td>
                            <td>3</td>
                        </tr>
                    </tbody>
                </Table>
            </Window>
            {/*<Filtere />*/}
            {/*{tasks.length > 0 && (*/}
            {/*    <div className={styles.tableContainer}>*/}
            {/*        <Table className={styles.table}>*/}
            {/*            <TableHeader>*/}
            {/*                <TableRow>*/}
            {/*                    <TableHeaderCell>Status</TableHeaderCell>*/}
            {/*                    <TableHeaderCell>Type</TableHeaderCell>*/}
            {/*                    <TableHeaderCell>Sist kjørt</TableHeaderCell>*/}
            {/*                    <TableHeaderCell>Forsøk</TableHeaderCell>*/}
            {/*                    <TableHeaderCell />*/}
            {/*                    <TableHeaderCell />*/}
            {/*                </TableRow>*/}
            {/*            </TableHeader>*/}
            {/*            <TableBody>*/}
            {/*                {tasks*/}
            {/*                    .slice(0)*/}
            {/*                    .sort(*/}
            {/*                        (a, b) =>*/}
            {/*                            new Date(b.updatedAt).getTime() -*/}
            {/*                            new Date(a.updatedAt).getTime()*/}
            {/*                    )*/}
            {/*                    .map((task) => (*/}
            {/*                        <TaskTableRow key={task.id} task={task} />*/}
            {/*                    ))}*/}
            {/*            </TableBody>*/}
            {/*        </Table>*/}
            {/*    </div>*/}
            {/*)}*/}
            {/*{tasks.length === 0 && (*/}
            {/*    <Alert className={styles.alert} variant="info">*/}
            {/*        Fant ingen tasks med gjeldende filtere*/}
            {/*    </Alert>*/}
            {/*)}*/}
        </>
    )
}
