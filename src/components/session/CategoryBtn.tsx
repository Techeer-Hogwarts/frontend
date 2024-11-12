'use client'

import { useState } from 'react'

interface CategoryBtnProps {
  title: string
}

export default function CategoryBtn({ title }: CategoryBtnProps) {
  const [isClicked, setIsClicked] = useState(false)
  return (
    <button
      type="button"
      onClick={() => setIsClicked(!isClicked)}
      className={`w-24 h-[34px] rounded-sm border text-sm ${isClicked ? 'text-primary border-primary ' : ' border-lightgray text-gray'}`}
    >
      {title}
    </button>
  )
}
