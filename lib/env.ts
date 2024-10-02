export const isLocal = process.env.NODE_ENV !== 'production'

export const isFaking = process.env.NEXT_PUBLIC_API_FAKING === 'enabled'

export function requireEnv(name: string): string {
    return (
        process.env[name] ??
        (() => {
            throw Error(`Mangler miljøvariabel ${name}`)
        })()
    )
}
