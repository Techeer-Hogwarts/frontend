'use client'

import { useState } from 'react'
import Image from 'next/image'

interface SearchBarProps {
  placeholder: string
  onSearch: (query: string) => void
}

export default function SearchBar({ placeholder, onSearch }: SearchBarProps) {
  const [inputValue, setInputValue] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
  }
  const handleClick = () => {
    onSearch(inputValue)
  }
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(inputValue)
    }
  }

  return (
    <div className="relative">
      <input
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
        className="w-[392px] h-9 border border-gray outline-none rounded-2xl pl-4 pr-8"
      />
      <Image
        src="/images/session/search.png"
        width={16}
        height={16}
        alt="SearchIMG"
        onClick={handleClick}
        className="absolute right-2 top-1/2 transform -translate-y-1/2"
      />
    </div>
  )
}
