export const deslugify = (value: string): string => {
    if (value.length === 0) {
        return value
    }

    return (
        value[0].toUpperCase() +
        value.slice(1).toLowerCase().replaceAll('_', ' ')
    )
}

export const slugifyUpperCase = (value: string): string => {
    if (value.length === 0) {
        return value
    }

    return value.toUpperCase().replaceAll(' ', '_')
}
