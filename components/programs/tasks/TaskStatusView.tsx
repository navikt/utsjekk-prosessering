type Props = {
    status: TaskStatus
}

export const TaskStatusView: React.FC<Props> = ({ status }) => {
    return (() => {
        switch (status) {
            case 'IN_PROGRESS':
                return '⏳ Venter'
            case 'COMPLETE':
                return '✅ Ferdig'
            case 'FAIL':
                return '⛔️ Feilet'
            case 'MANUAL':
                return '✏️ Manuell'
            default:
                return '❔ Ukjent'
        }
    })()
}
