import clsx from 'clsx'

import styles from './Table.module.css'

type Props = React.TableHTMLAttributes<HTMLTableElement>

export const Table: React.FC<Props> = ({ className, children, ...rest }) => {
    return (
        <div className={clsx(className, styles.container)} {...rest}>
            <table className={styles.table}>{children}</table>
        </div>
    )
}
