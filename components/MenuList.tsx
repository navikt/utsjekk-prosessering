import clsx from 'clsx'

import styles from './MenuList.module.css'

type Props = React.HTMLAttributes<HTMLUListElement>

export const MenuList: React.FC<Props> = ({ className, ...rest }) => {
    return <ul className={clsx(className, styles.list)} {...rest} />
}
