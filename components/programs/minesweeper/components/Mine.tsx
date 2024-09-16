import Image from 'next/image'

import mine from './mine.svg'

type Props = Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'width' | 'height'>

export const Mine: React.FC<Props> = ({ className, ...props }) => {
    return (
        <Image
            className={className}
            src={mine.src}
            alt=""
            width={30}
            height={30}
            {...props}
        />
    )
}
