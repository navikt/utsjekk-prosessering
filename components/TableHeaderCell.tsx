import clsx from 'clsx'

import styles from './TableHeaderCell.module.css'

type Props = React.HTMLAttributes<HTMLTableCellElement> & {
    disabled?: boolean
}

export const TableHeaderCell: React.FC<Props> = ({ className, ...rest }) => {
    return <th className={clsx(className, styles.cell)} {...rest} />
}
