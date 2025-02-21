'use client'

import { useState } from 'react'
import Image from 'next/image'
import { searchAPI } from '../search/api/search'

interface SearchBarProps {
  placeholder: string
  index: string
  onSearchResult: (results: SearchResultItem[]) => void
}

interface SearchResultItem {
  id: string
  title: string
  url: string
  createdAt: string
  userID: string
  userName: string
  userProfileImage: string
  index: string
  score: number
}

export default function Search({
  placeholder,
  index,
  onSearchResult,
}: SearchBarProps) {
  const [inputValue, setInputValue] = useState('')

  const handleSearch = async () => {
    if (!inputValue.trim()) return
    const result = await searchAPI({ index, query: inputValue })
    // result가 null일 경우 빈 배열을 전달
    onSearchResult(result || [])
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="relative">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
        className="w-[392px] h-9 border border-gray outline-none rounded-2xl pl-4 pr-8"
      />
      <Image
        src="/images/session/search.png"
        width={16}
        height={16}
        alt="SearchIMG"
        onClick={handleSearch}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
      />
    </div>
  )
}
