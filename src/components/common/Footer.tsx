'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <div className=" text-darkgray w-[75rem] h-[6rem] mt-[2rem] p-2">
      {/* 가로선 */}
      <div className="border-t border-lightgray my-2 w-full" />
      <div className="flex items-center justify-between">
        {/* 로고 영역 */}
        <div className="text-primary font-logo text-[1.5rem] mb-2 ">
          TECHEER.ZIP
        </div>

        {/* 링크 영역 */}
        <div className="flex space-x-8 text-[0.8rem] ">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.instagram.com/techeer_in_sv/?igsh=NG03bjZ6ODdvN3Fi"
            className="hover:text-gray-400 text-[0.8rem] font-logo"
          >
            INSTAGRAM
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://blog.techeer.net/"
            className="hover:text-gray-400 text-[0.8rem] font-logo"
          >
            MEDIUM
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/techeer-sv"
            className="hover:text-gray-400 text-[0.8rem] font-logo"
          >
            GITHUB
          </a>
        </div>
      </div>

      {/* 저작권 영역 */}
      <div className="text-right text-[0.6rem] text-darkgray">
        © 2025 Techeer. ALL RIGHTS RESERVED.
      </div>
    </div>
  )
}
