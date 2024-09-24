import styles from './Metadata.module.css'

type Props = {
    metadata: Record<string, string>
}
export const Metadata: React.FC<Props> = ({ metadata }) => {
    return (
        <ul className={styles.metadata}>
            {Object.entries(metadata).map(([key, value]) => (
                <li key={key}>
                    {key}: {value}
                </li>
            ))}
        </ul>
    )
}
