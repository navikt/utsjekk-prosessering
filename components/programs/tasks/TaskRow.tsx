import clsx from 'clsx'

import styles from './TaskRow.module.css'

type Props = React.HTMLAttributes<HTMLTableRowElement> & {
    selected: boolean
}

export const TaskRow: React.FC<Props> = ({ selected, className, ...rest }) => {
    return (
        <tr
            className={clsx(className, styles.row, selected && styles.selected)}
            {...rest}
        />
    )
}
