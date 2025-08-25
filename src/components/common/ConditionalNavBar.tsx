'use client'

import { usePathname } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import NavBar from './NavBar'

export default function ConditionalNavBar() {
  const pathname = usePathname()
  const { isLoggedIn } = useAuthStore()
  const isHomePage = pathname === '/home'

  if (isHomePage) {
    return null
  }

  return <NavBar homeLink={isLoggedIn ? '/home' : '/'} />
}
