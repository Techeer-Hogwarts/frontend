'use client'

import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'
import { useState } from 'react'

export default function AddBtn() {
  const [isSession, setIsSession] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const handleClickBtn = () => {
    if (pathname === '/blog') {
      router.push('/blog/post')
    } else if (pathname === '/session') {
      setIsSession(!isSession)
    }
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleClickBtn}
        className="fixed right-36 bottom-8 w-12 h-12 rounded-full shadow-md flex justify-center items-center text-xl text-[#545454] bg-white border border-lightgray"
      >
        <Image src="/plus.png" alt="addBtn" width={15} height={15} />
      </button>
      {isSession && (
        <div className="fixed text-black/60 flex flex-col shadow-md justify-center items-center right-36 bottom-[88px] w-24 rounded-md h-[66px] bg-white border border-lightgray">
          <span>부트캠프</span>
          <div className="h-[1px] w-16 my-1 bg-lightgray" />
          <span>파트너스</span>
        </div>
      )}
    </div>
  )
}
