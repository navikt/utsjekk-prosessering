import { format } from 'date-fns/format'

export const formatDate = (date: datetime): string =>
    format(new Date(date), 'yyyy-MM-dd - HH:mm:ss')
