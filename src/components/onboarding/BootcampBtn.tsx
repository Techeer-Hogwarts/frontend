'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function GradientButton() {
  const [gradientPosition, setGradientPosition] = useState({ x: 50, y: 50 })
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setGradientPosition({ x, y })
  }

  const handleMouseLeave = () => {
    // 마우스를 벗어나면 중앙 위치로 초기화
    setGradientPosition({ x: 80, y: 50 })
  }

  return (
    <Link
      href="https://forms.gle/7D9WvJDJgzG6KZdR9"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative overflow-hidden flex items-center justify-center w-52 h-14 rounded-3xl bg-[#F57601] text-white font-semibold transition-transform duration-200"
      style={{
        backgroundImage: `radial-gradient(circle at ${gradientPosition.x}% ${gradientPosition.y}%, rgba(0,0,0,0.15), transparent 60%)`,
      }}
    >
      <span className="group-hover:scale-[0.95] flex items-center transition-transform duration-200 ease-in-out text-[22px]">
        부트캠프 지원하기
      </span>
    </Link>
  )
}
