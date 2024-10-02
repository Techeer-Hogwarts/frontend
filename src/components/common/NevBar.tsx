'use client'

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
        <p className="font-logo text-primary text-[2rem] font-extrabold mr-[2.12rem]">
          TECHEER.ZIP
        </p>

        {/* 메뉴 */}
        <div className="flex items-center gap-[1.62rem]">
          <p className="hover:text-gray-700 cursor-pointer">프로젝트</p>
          <p className="hover:text-gray-700 cursor-pointer">블로그</p>
          <p className="hover:text-gray-700 cursor-pointer">이력서</p>
          <p className="hover:text-gray-700 cursor-pointer">세션</p>
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
        {/* 기타 아이콘 */}
        <button type="button" className="p-2">
          <IoCalendarOutline size={24} />
        </button>
        <button type="button" className="p-2">
          <IoPersonCircle size={24} />
        </button>
        <button type="button" className="hover:text-gray-800">
          로그아웃
        </button>
      </div>
    </div>
  )
}
