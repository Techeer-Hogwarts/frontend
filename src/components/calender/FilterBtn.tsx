'use client'

import { useState } from 'react'

interface FilterBtnProps {
  title: string
}
export default function FilterBtn({ title }: FilterBtnProps) {
  const [isClicked, setIsClicked] = useState(false)
  return (
    <button
      type="button"
      className={`h-8 px-6 border rounded-2xl text-lg ${isClicked ? 'text-gray bg-lightgray/50 border-gray' : 'text-[#DD7E3A] bg-[#FFF6F0] border-primary'}`}
      onClick={() => setIsClicked(!isClicked)} // 임시로 해둠
    >
      {title}
    </button>
  )
}
