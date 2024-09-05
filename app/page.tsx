import { checkToken } from '@/lib/auth/token'
import { TasksProgram } from '@/components/programs/tasks/TasksProgram'
import { ProgramNames } from '@/components/programs/names'

const showTasksProgram = (searchParams: SearchParams) => {
    const value = searchParams[ProgramNames.Tasks]
    return typeof value === 'string' && value === 'true'
}

type Props = {
    searchParams: SearchParams
}

export default async function Home({ searchParams }: Props) {
    await checkToken()

    return (
        <>
            {showTasksProgram(searchParams) && (
                <TasksProgram searchParams={searchParams} />
            )}
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
            {/*            </TableBody>*/}
            {/*        </Table>*/}
            {/*    </div>*/}
            {/*)}*/}
        </>
    )
}
