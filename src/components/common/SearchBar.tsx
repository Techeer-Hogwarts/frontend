'use client'

import { useState } from 'react'
import Image from 'next/image'
import { searchAPI } from '../../api/search/search'
import type { SearchResult } from '../../api/search/search'
import { useRouter } from 'next/navigation'

interface SearchBarProps {
  placeholder: string
  index: string
  onSearchResult?: (results: SearchResult[]) => void
  navigateTo?: string // if provided, navigate with ?query= instead of returning results
}

// 별도 타입 정의 제거: API의 SearchResult 사용

// Typeahead/auto-complete removed: search happens only on submit or click

export default function Search({
  placeholder,
  index,
  onSearchResult,
  navigateTo,
}: SearchBarProps) {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const handleSearch = async () => {
    if (!query.trim()) return
    try {
      if (navigateTo) {
        router.push(`${navigateTo}?query=${encodeURIComponent(query)}`)
        return
      }
      const result = await searchAPI({ index, query })
      onSearchResult?.(result || [])
    } catch (error) {}
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await handleSearch()
  }

  return (
    <form onSubmit={handleSubmit} className="relative flex items-center">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-[300px] h-9 border border-gray outline-none rounded-2xl pl-4 pr-8 transition-all duration-300 ease-in-out focus:outline-none"
      />
      <Image
        src="/images/session/search.png"
        width={16}
        height={16}
        alt="SearchIMG"
        onClick={handleSearch}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
      />
    </form>
  )
}
