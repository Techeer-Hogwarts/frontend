'use client'

import { useState } from 'react'

interface NavbarBtnProps {
  children: string
}
export default function TapBtn({ children }: NavbarBtnProps) {
  const [isClicked, setIsClicked] = useState(false)
  return (
    <button
      type="button"
      onClick={() => setIsClicked(!isClicked)}
      className={`px-4 text-xl ${isClicked ? 'text-primary ' : ' text-black '}`}
    >
      {children}
    </button>
  )
}
