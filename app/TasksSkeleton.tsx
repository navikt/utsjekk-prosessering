import { Filtere } from '@/components/Filtere.tsx'
import { TaskTableSkeleton } from '@/components/taskTable/TaskTableSkeleton.tsx'
import { Footer } from '@/components/Footer.tsx'
import { Checkbox, Loader, TextField } from '@navikt/ds-react'

import styles from './Tasks.module.css'

export const TasksSkeleton: React.FC = () => {
    return (
        <>
            <Filtere className={styles.filtere} />
            <div className={styles.refetch}>
                <span>
                    <Checkbox>Refresh hvert</Checkbox>
                    <TextField
                        size="small"
                        label="Sekunder"
                        hideLabel
                        type="number"
                        inputMode="numeric"
                        min={1}
                        max={60}
                        value={5}
                        disabled
                    />
                    <span>sekund(er)</span>
                </span>
                <span>
                    Oppdaterer <Loader size="xsmall" />
                </span>
            </div>
            <TaskTableSkeleton className={styles.tasks} />
            <Footer
                className={styles.footer}
                page={1}
                pageSize={0}
                totalTasks={0}
            />
        </>
    )
}
