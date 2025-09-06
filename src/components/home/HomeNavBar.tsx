'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { IoPersonCircle } from 'react-icons/io5'
import { useAuthStore } from '@/store/authStore'

export default function HomeNavBar() {
  const router = useRouter()
  const { isLoggedIn, logout } = useAuthStore()

  const handleLogoClick = () => {
    router.push(isLoggedIn ? '/home' : '/')
  }

  const handleLogout = async () => {
    try {
      await logout()
      router.push('/')
    } catch {
      router.push('/login')
    }
  }

  return (
    <div className="flex items-center w-full max-w-[1280px] h-[4rem] justify-between px-4 mx-auto">
      <button
        onClick={handleLogoClick}
        className="font-logo text-primary text-[2rem] font-extrabold mr-[2.12rem]"
      >
        TECHEER.ZIP
      </button>

      <div className="flex items-center gap-4 cursor-pointer">
        <Link href="/mypage" className="p-[6px] cursor-pointer">
          <IoPersonCircle size={28} />
        </Link>
        {isLoggedIn ? (
          <button
            type="button"
            className="hover:text-primary cursor-pointer"
            onClick={handleLogout}
          >
            로그아웃
          </button>
        ) : (
          <Link href="/login" className="hover:text-primary cursor-pointer">
            로그인
          </Link>
        )}
      </div>
    </div>
  )
}
