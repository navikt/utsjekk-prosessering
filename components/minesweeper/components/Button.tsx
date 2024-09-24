import clsx from 'clsx'
import { forwardRef } from 'react'

import styles from './Button.module.css'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>

export const Button = forwardRef<HTMLButtonElement, Props>(
    ({ className, ...rest }, ref) => {
        return (
            <button
                className={clsx(className, styles.button)}
                {...rest}
                ref={ref}
            />
        )
    }
)

Button.displayName = 'Button'
