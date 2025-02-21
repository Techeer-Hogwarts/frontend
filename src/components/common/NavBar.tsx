'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import {
  IoSearchOutline,
  IoCalendarOutline,
  IoPersonCircle,
} from 'react-icons/io5'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { getSearchList } from '@/app/search/api/getSearchList'
import {
  getBasicSearchResults,
  getFinalSearchResults,
} from '../search/api/getSerachResults'

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
  title: string
}

export default function NavBar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [basicResults, setBasicResults] = useState<BasicResult[]>([])
  const [finalResults, setFinalResults] = useState([])
  const { isLoggedIn, checkAuth, logout } = useAuthStore()
  const router = useRouter()

  const debouncedQuery = useDebounce(query, 100) // 500ms 뒤에 쿼리값을 반영

  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen)
  }

  useEffect(() => {
    // debouncedQuery가 바뀔 때마다 /api/v2/search/basic 호출
    if (debouncedQuery) {
      const fetchBasicResults = async () => {
        const data = await getBasicSearchResults(debouncedQuery)
        // console.log('data:', data) // 데이터 확인
        // console.log('현재검색결과:', basicResults)
        setBasicResults(data.results)
      }
      fetchBasicResults()
    }
  }, [debouncedQuery])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (query) {
      // /api/v2/search/final 요청
      const data = await getFinalSearchResults(query)
      setFinalResults(data)
      // 결과를 페이지에 전달하는 방식으로 리디렉션
      router.push(`/search/final?query=${query}`)
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      setTimeout(() => {
        if (
          searchRef.current &&
          !searchRef.current.contains(event.target as Node)
        ) {
          setIsSearchOpen(false) // 자동완성 창 닫기
        }
      }, 0)
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSelectResult = async (selectedTitle: string) => {
    setQuery(selectedTitle)
    setTimeout(() => setIsSearchOpen(false), 0) // 검색 결과 클릭 시 자동완성 창 닫기
    await handleSubmit(new Event('submit') as unknown as React.FormEvent) // 강제 제출 실행

    setQuery('') //자동 완성창 초기화
  }

  const handleLogout = async () => {
    try {
      await logout()
      router.push('/login')
    } catch (error) {
      console.error('Logout error:', error)
      alert('로그아웃에 실패하였습니다.')
    }
  }

  return (
    <div
      ref={searchRef}
      className="flex items-center w-[1200px] max-w-[1200px] h-[3.8125rem] justify-between border-b border-[#D7D7D7]"
    >
      <div className="flex">
        {/* 로고 */}
        <Link
          href="/"
          className="font-logo text-primary text-[2rem] font-extrabold mr-[2.12rem]"
        >
          TECHEER.ZIP
        </Link>

        {/* 메뉴 */}
        <div className="flex items-center gap-[1.62rem]">
          <Link href="/project" className="hover:text-gray-700 cursor-pointer">
            프로젝트
          </Link>
          <Link href="/profile" className="hover:text-gray-700 cursor-pointer">
            프로필
          </Link>
          <Link href="/blog" className="hover:text-gray-700 cursor-pointer">
            블로그
          </Link>
          <Link href="/resume" className="hover:text-gray-700 cursor-pointer">
            이력서
          </Link>
          <Link href="/session" className="hover:text-gray-700 cursor-pointer">
            세션
          </Link>
        </div>
      </div>
      <div className="flex items-center">
        {/* 돋보기 및 기타 아이콘 */}
        <div className="flex items-center">
          {/* 검색 영역 */}
          <div className="p-2">
            <form onSubmit={handleSubmit} className="flex items-center">
              <button
                type="button"
                aria-label="검색"
                className="focus:outline-none flex items-center border rounded-full px-1 transition-all duration-300 ease-in-out"
              >
                <IoSearchOutline onClick={toggleSearch} />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="검색어를 입력하세요"
                  className={`${
                    isSearchOpen ? 'w-[18rem] rounded-xl px-2' : 'w-0  px-0'
                  } transition-all duration-300 ease-in-out focus:outline-none`}
                />
              </button>
            </form>
            {/* 자동완성 결과 출력 */}
            {debouncedQuery && basicResults.length > 0 && (
              <ul className="absolute bg-white border border-gray rounded-lg mt-1 w-[18rem] max-h-[17rem] overflow-y-auto z-10">
                {basicResults.map((result, index) => (
                  <li
                    key={index}
                    className="p-2 hover:bg-lightgray cursor-pointer"
                    onClick={() => handleSelectResult(result.title)} // 클릭 시 자동 입력 & 검색 실행
                  >
                    {result.title}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        {/* 캘린더 아이콘 */}
        <Link href="/calendar" className="p-2">
          <IoCalendarOutline size={24} />
        </Link>
        {/* 마이페이지 아이콘 */}
        <Link href="/mypage" className="p-2">
          <IoPersonCircle size={24} />
        </Link>
        {isLoggedIn ? (
          <button
            type="button"
            className="ml-4 text-gray-600 hover:text-gray-800"
            onClick={handleLogout}
          >
            로그아웃
          </button>
        ) : (
          <Link
            href="/login"
            className="ml-4 text-gray-600 hover:text-gray-800"
          >
            로그인
          </Link>
        )}
      </div>
    </div>
  )
}
