'use client'

import { Toaster } from "@/components/ui/sonner"

type Props = {
    children: React.ReactNode
}

export default function GlobalProvider({ children }: Props) {
    return (
        <>
            {children}
            <Toaster />
        </>
    )
}