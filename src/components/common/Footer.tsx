'use client'

export default function Footer() {
  return (
    <div className="bg-black text-white w-[1200px] h-[10.4375rem] mt-[6.62rem] p-2">
      <div className="flex flex-col ">
        {/* 로고 영역 */}
        <div className="text-primary font-logo text-[2.25rem] mb-4 ">
          TECHEER.ZIP
        </div>

        {/* 소셜 링크 영역 */}
        <div className="flex space-x-8 text-[1.25rem] ">
          <a href="#" className="hover:text-gray-400 text-[1.15rem] font-logo">
            INSTAGRAM
          </a>
          <a href="#" className="hover:text-gray-400 text-[1.15rem] font-logo">
            MEDIUM
          </a>
          <a href="#" className="hover:text-gray-400 text-[1.15rem] font-logo">
            GITHUB
          </a>
        </div>
      </div>

      {/* 가로선 */}
      <div className="border-t border-gray-600 my-4 w-full" />

      {/* 저작권 영역 */}
      <div className="text-right text-[0.875rem] text-white">
        © 2024 Techeer. ALL RIGHTS RESERVED.
      </div>
    </div>
  )
}
