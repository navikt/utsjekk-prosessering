import React from 'react'
import clsx from 'clsx'

import { Digit } from '@/components/programs/minesweeper/components/digit/Digit'

import styles from './Counter.module.css'

const getDigits = (value: number, numOfDigits: number): number[] => {
    const digits = `${value}`.split('')

    if (digits.length < numOfDigits) {
        digits.unshift(...Array(numOfDigits - digits.length).fill('0'))
    }

    return digits.map((it) => +it)
}

type Props = Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> & {
    value: number
    numOfDigits: number
}

export const Counter: React.FC<Props> = ({
    value,
    numOfDigits,
    className,
    ...rest
}) => {
    return (
        <div className={clsx(className, styles.counter)} {...rest}>
            {getDigits(value, numOfDigits).map((digit, i) => (
                <Digit key={i} digit={digit} />
            ))}
        </div>
    )
}
