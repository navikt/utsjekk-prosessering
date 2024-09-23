import clsx from 'clsx'

import styles from './InsetWindowContent.module.css'

type Props = React.HTMLAttributes<HTMLDivElement>

export const InsetWindowContent: React.FC<Props> = ({ className, ...rest }) => {
    return <div className={clsx(className, styles.content)} {...rest} />
}
