'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  IoSearchOutline,
  IoCalendarOutline,
  IoPersonCircle,
} from 'react-icons/io5'

export default function NevBar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen)
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
          <Link href="/profile" className="hover:text-gray-700 cursor-pointer">
            프로필
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
      <div className="flex">
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

        <Link href="/mypage" className="p-2">
          <IoPersonCircle size={24} />
        </Link>
        <Link href="/login" className="p-2">
          로그인
        </Link>
      </div>
    </div>
  )
}
