import Image from 'next/image'

import flag from './flag.svg'

type Props = Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'width' | 'height'>

export const Flag: React.FC<Props> = ({ className, ...props }) => {
    return (
        <Image
            className={className}
            src={flag.src}
            alt=""
            width={30}
            height={30}
            {...props}
        />
    )
}
