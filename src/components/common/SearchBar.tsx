'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { searchAPI } from '../search/api/search'
import { IoSearchOutline } from 'react-icons/io5'
import { useRouter } from 'next/navigation'
import {
  getSearchResults,
  getBasicSearchResults,
} from '../search/api/getSearch'

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

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

interface BasicResult {
  id: number
  title: string
  index: string
  url: string
}

export default function Search({
  placeholder,
  index,
  onSearchResult,
}: SearchBarProps) {
  const [inputValue, setInputValue] = useState('')

  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [basicResults, setBasicResults] = useState<BasicResult[]>([])
  const router = useRouter()

  const debouncedQuery = useDebounce(query, 100)

  const searchRef = useRef<HTMLFormElement>(null)

  const handleSearch = async () => {
    if (!query.trim()) return
    try {
      const result = await searchAPI({ index, query })
      onSearchResult(result || [])
    } catch (error) {
    }
  }

  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev)
    if (!isSearchOpen) {
      setQuery('')
      setBasicResults([])
    }
  }

  useEffect(() => {
    if (debouncedQuery) {
      setBasicResults([])
      const fetchBasicResults = async () => {
        try {
          const data = await getBasicSearchResults(debouncedQuery)
          if (data.results) {
            let filteredResults = data.results

            if (index !== 'blog' && index !== 'session' && index !== 'resume') {
              filteredResults = data.results.filter(
                (result) =>
                  result.index !== 'blog' &&
                  result.index !== 'session' &&
                  result.index !== 'resume',
              )
            } else {
              filteredResults = data.results.filter(
                (result) => result.index === index,
              )
            }
            setBasicResults(filteredResults)
          }
        } catch (error) {
        }
      }
      fetchBasicResults()
    }
  }, [debouncedQuery])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setQuery('')
        setIsSearchOpen(false)
      }
    }

    document.addEventListener('mouseup', handleClickOutside)
    return () => {
      document.removeEventListener('mouseup', handleClickOutside)
    }
  }, [])

  const handleSelectResult = async (
    selectedTitle: string,
    result: BasicResult,
    url: string,
    resultIndex: string,
  ) => {
    if (index === 'blog') {
      router.push(url)
      return
    } else if (index === 'session') {
      router.push(`/session/video/${result.id}`)
      return
    } else if (index === 'resume') {
      router.push(`/resume/${result.id}`)
      return
    }
    setQuery(selectedTitle)
    setIsSearchOpen(false)
    router.push(`/project/detail/${resultIndex}/${result.id}`)
  }

  return (
    <form ref={searchRef} className="relative flex items-center">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="검색어를 입력하세요"
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

      {debouncedQuery && (
        <ul className="absolute bg-white border border-gray rounded-lg mt-1 top-[2.813rem] w-[18.5rem] max-h-[17rem] overflow-y-auto z-10">
          {basicResults && basicResults.length > 0 ? (
            basicResults.map((result) => {
              const truncatedTitle =
                result.title.length > 16
                  ? result.title.slice(0, 16) + '...'
                  : result.title
              return (
                <div
                  key={result.id}
                  className="flex items-center pl-4 hover:bg-lightprimary"
                >
                  <IoSearchOutline className="w-3" onClick={toggleSearch} />
                  <li
                    className="p-1 cursor-pointer font-light"
                    onClick={() =>
                      handleSelectResult(
                        result.title.split('-').slice(-1).join(' '),
                        result,
                        result.url,
                        result.index,
                      )
                    }
                  >
                    <span className="text-gray text-sm">
                      {result.index} &nbsp; | &nbsp;
                    </span>
                    {truncatedTitle}
                  </li>
                </div>
              )
            })
          ) : (
            <li className="p-2 text-darkgray">검색 결과 없음</li>
          )}
        </ul>
      )}
    </form>
  )
}
