import Image from 'next/image'

import mine from './mine.svg'

type Props = React.ImgHTMLAttributes<HTMLImageElement>

export const Mine: React.FC<Props> = ({
    className,
    width,
    height,
    ...props
}) => {
    return (
        <Image
            className={className}
            src={mine.src}
            alt=""
            width={+(width ?? 30)}
            height={+(height ?? 30)}
            {...props}
        />
    )
}
