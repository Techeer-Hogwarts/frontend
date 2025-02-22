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
  // placeholder: string
  index: 'resume'
  // onSearchResult: (results: SearchResultItem[]) => void
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

// Debounce 함수
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
}

export default function Search({
  // placeholder,
  index,
  // onSearchResult,
}: SearchBarProps) {
  const [inputValue, setInputValue] = useState('')

  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [basicResults, setBasicResults] = useState<BasicResult[]>([])
  // const [finalResults, setFinalResults] = useState([])
  const router = useRouter()

  const debouncedQuery = useDebounce(query, 100)

  const searchRef = useRef<HTMLFormElement>(null)

  const handleSearch = async () => {
    if (!query.trim()) return // inputValue → query 변경
    try {
      const result = await searchAPI({ index, query })
      // onSearchResult가 주석 처리되어 있으므로 필요 시 다시 활성화
      // onSearchResult(result || [])
    } catch (error) {
      console.error('검색 API 호출 실패:', error)
    }
  }

  // const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === 'Enter') {
  //     handleSearch()
  //   }
  // }

  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev)
    if (!isSearchOpen) {
      setQuery('')
      setBasicResults([])
    }
  }

  useEffect(() => {
    // debouncedQuery가 바뀔 때마다 /api/v2/search/basic 호출
    if (debouncedQuery) {
      setBasicResults([]) // 기존 결과 초기화
      const fetchBasicResults = async () => {
        try {
          const data = await getBasicSearchResults(debouncedQuery)
          setBasicResults(data.results || [])
        } catch (error) {
          console.error('기본 검색 결과 가져오기 실패:', error)
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
        setIsSearchOpen(false) // 자동완성 창 닫기
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
  ) => {
    setQuery(selectedTitle)
    setIsSearchOpen(false)
    router.push(`/${result.index}/${result.id}`)
  }

  return (
    <form ref={searchRef} className="relative flex items-center">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="검색어를 입력하세요"
        // onKeyDown={handleKeyDown}
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

      {/* 자동완성 결과 출력 */}
      {debouncedQuery && (
        <ul className="absolute bg-white border border-gray rounded-lg mt-1 top-[2.813rem] w-[18.5rem] max-h-[17rem] overflow-y-auto z-10">
          {basicResults && basicResults.length > 0 ? (
            basicResults.map((result, index) => {
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
                    // key={index}
                    className="p-1 cursor-pointer font-light"
                    onClick={() =>
                      handleSelectResult(
                        result.title.split('-').slice(-1).join(' '),
                        result,
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
