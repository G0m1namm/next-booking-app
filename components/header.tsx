'use client'

import UserNav from "./user-nav"

type Props = {}

export default function Header({ }: Props) {
    return (
        <header className="w-full sticky top-0 left-0">
            <div className="page-shell-container px-24 h-16 flex items-center justify-between">
                <h2 className="font-black text-lg">BookIt</h2>
                <UserNav />
            </div>
        </header>
    )
}