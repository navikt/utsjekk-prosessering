import clsx from 'clsx'
import Image from 'next/image'

import { Button } from '@/components/Button'

import playing from './face_unpressed.svg'
import won from './face_win.svg'
import lost from './face_lose.svg'

import styles from './SmileyButton.module.css'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    status: GameStatus
}

export const SmileyButton: React.FC<Props> = ({
    status,
    className,
    ...rest
}) => {
    const source =
        status === 'playing' ? playing : status === 'lost' ? lost : won

    return (
        <Button className={clsx(className, styles.button)} {...rest}>
            <Image src={source.src} alt="" height={40} width={40} />
        </Button>
    )
}
