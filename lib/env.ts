export const isLocal = process.env.NODE_ENV !== 'production'

export function requireEnv(name: string): string {
    return (
        process.env[name] ??
        (() => {
            throw Error(`Mangler miljøvariabel ${name}`)
        })()
    )
}
