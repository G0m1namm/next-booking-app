'use client'


import { Button } from '@/components/ui/button'

type Props = {
    error: Error & { digest?: string },
    reset?: () => void
}

export default function Error({ error, reset }: Props) {
    return (
        <div className='container min-h-dvh flex justify-center items-center'>
            <div className='flex flex-col text-center'>
                <h2 className='text-4xl mb-2'>
                    Something went wrong
                </h2>
                <p className='text-muted-foreground mb-8'>{error.message}</p>
                <Button onClick={() => reset?.()}>Try Again</Button>
            </div>
        </div>
    )
}