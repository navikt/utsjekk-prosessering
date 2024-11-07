import { useSearchParams } from 'next/navigation'

const isStatusFilter = (value: any): value is TaskStatus =>
    value === 'IN_PROGRESS' ||
    value === 'COMPLETE' ||
    value === 'FAIL' ||
    value === 'MANUAL'

export const useStatusFilter = () => {
    const searchParams = useSearchParams()
    return searchParams.get('status')?.split(',').filter(isStatusFilter)
}
