import React from 'react'
import { ModeToggle } from './mode-toggle'
import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="flex w-full justify-between items-center h-[10vh] border-b p-10">
      <Link href="/" className="text-3xl font-bold">MemeCoin Cooker</Link>
      <ModeToggle />
    </nav>
  )
}

