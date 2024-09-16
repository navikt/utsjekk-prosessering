import Image from 'next/image'

import d0 from './d0.svg'
import d1 from './d1.svg'
import d2 from './d2.svg'
import d3 from './d3.svg'
import d4 from './d4.svg'
import d5 from './d5.svg'
import d6 from './d6.svg'
import d7 from './d7.svg'
import d8 from './d8.svg'
import d9 from './d9.svg'

const getSvg = (digit: number) => {
    switch (digit) {
        case 0:
            return d0
        case 1:
            return d1
        case 2:
            return d2
        case 3:
            return d3
        case 4:
            return d4
        case 5:
            return d5
        case 6:
            return d6
        case 7:
            return d7
        case 8:
            return d8
        case 9:
            return d9
        default: {
            throw Error(`Unsupported digit: ${digit}`)
        }
    }
}

type Props = {
    digit: number
}

export const Digit: React.FC<Props> = ({ digit }) => {
    return <Image src={getSvg(digit).src} alt="" width={20} height={40} />
}
