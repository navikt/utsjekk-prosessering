import { format } from 'date-fns/format'

const formatDate = (
    dateString: string,
    differenceInMinutes: number = 0
): string => {
    const date = new Date(dateString)
    date.setMinutes(date.getMinutes() - differenceInMinutes) // Vi mottar datoer med TZ=Europe/Oslo, ikke UTC. Konverterer til UTC ved å ta vekk 2 timer
    return format(date, 'yyyy-MM-dd - HH:mm:ss')
}

export const formatUTCDate = (dateString: datetime): string => {
    return formatDate(dateString)
}

export const formatCESTDate = (dateString: datetime): string => {
    return formatDate(dateString, 120) // Vi mottar datoer med TZ=Europe/Oslo, ikke UTC. Konverterer til UTC ved å ta vekk 2 timer
}
