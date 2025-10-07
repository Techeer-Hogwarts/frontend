'use client'

import { usePathname } from 'next/navigation'
import NavBar from './NavBar'

export default function NavConditional() {
  const pathname = usePathname()
  const isHome = pathname.startsWith('/home')

  if (isHome) return null

  return <NavBar />
}
