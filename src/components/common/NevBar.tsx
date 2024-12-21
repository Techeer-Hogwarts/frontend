'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import {
  IoSearchOutline,
  IoCalendarOutline,
  IoPersonCircle,
} from 'react-icons/io5'
import Cookies from 'js-cookie'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'

export default function NevBar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { isLoggedIn, setIsLoggedIn, logout } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    const accessToken = Cookies.get('accessToken')
    setIsLoggedIn(!!accessToken)
  }, [setIsLoggedIn])

  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev)
  }

  const handleLogout = async () => {
    try {
      await logout()
      router.push('/login')
    } catch (error) {
      console.error('Logout error:', error)
      alert('로그아웃에 실패하였습니다.')
    }
  }

  return (
    <div className="flex items-center w-[1200px] max-w-[1200px] h-[3.8125rem] justify-between border-b border-[#D7D7D7]">
      <div className="flex">
        {/* 로고 */}
        <Link
          href="/"
          className="font-logo text-primary text-[2rem] font-extrabold mr-[2.12rem]"
        >
          TECHEER.ZIP
        </Link>

        {/* 메뉴 */}
        <div className="flex items-center gap-[1.62rem]">
          <Link href="/project" className="hover:text-gray-700 cursor-pointer">
            프로젝트
          </Link>
          <Link href="/blog" className="hover:text-gray-700 cursor-pointer">
            블로그
          </Link>
          <Link href="/resume" className="hover:text-gray-700 cursor-pointer">
            이력서
          </Link>
          <Link href="/session" className="hover:text-gray-700 cursor-pointer">
            세션
          </Link>
        </div>
      </div>
      <div className="flex items-center">
        {/* 돋보기 및 기타 아이콘 */}
        <div className="flex items-center ">
          {/* 검색 영역 */}
          <div className="p-2">
            <button
              type="button"
              aria-label="검색"
              className="focus:outline-none flex items-center border rounded-full px-1 transition-all duration-300 ease-in-out"
            >
              <IoSearchOutline onClick={toggleSearch} />
              <input
                type="text"
                placeholder="검색어를 입력하세요"
                className={`${
                  isSearchOpen ? 'w-[18rem] rounded-xl px-2' : 'w-0  px-0'
                } transition-all duration-300 ease-in-out focus:outline-none`}
              />
            </button>
          </div>
        </div>
        {/* 캘린더 아이콘 */}
        <Link href="/calendar" className="p-2">
          <IoCalendarOutline size={24} />
        </Link>
        {/* 마이페이지 아이콘 */}
        <Link href="/detail" className="p-2">
          <IoPersonCircle size={24} />
        </Link>

        {isLoggedIn ? (
          <button
            type="button"
            className="ml-4 text-gray-600 hover:text-gray-800 h"
            onClick={handleLogout}
          >
            로그아웃
          </button>
        ) : (
          <Link
            href="/login"
            className="ml-4 text-gray-600 hover:text-gray-800"
          >
            로그인
          </Link>
        )}
      </div>
    </div>
  )
}
