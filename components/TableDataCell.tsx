import clsx from 'clsx'

import styles from './TableDataCell.module.css'

type Props = React.HTMLAttributes<HTMLTableCellElement> & {
    disabled?: boolean
}

export const TableDataCell: React.FC<Props> = ({ className, ...rest }) => {
    return <td className={clsx(className, styles.cell)} {...rest} />
}
