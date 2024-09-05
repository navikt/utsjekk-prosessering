import clsx from 'clsx'

import styles from './TableBody.module.css'

type Props = React.HTMLAttributes<HTMLElement>

export const TableBody: React.FC<Props> = ({ className, ...rest }) => {
    return <tbody className={clsx(className, styles.body)} {...rest} />
}
