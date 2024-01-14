export const getBaseUrl = (): string => {
    const environments: Record<string, string> = {
        production: process.env.PUBLIC_URL!,
        preview: process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL!,
        development: process.env.NEXT_PUBLIC_VERCEL_URL!
    }
    const url = environments[process.env.NEXT_PUBLIC_VERCEL_ENV ?? process.env.NODE_ENV]
    return `${process.env.NODE_ENV === 'development' ? 'http://' : 'https://'}${url}`
}

export const getApiUrl = () => {
    return `${getBaseUrl()}/api`
}