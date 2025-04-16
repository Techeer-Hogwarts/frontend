'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import {
  IoSearchOutline,
  IoCalendarOutline,
  IoPersonCircle,
} from 'react-icons/io5'
import { useRouter, usePathname } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import {
  getBasicSearchResults,
  getFinalSearchResults,
} from '../search/api/getSearch'

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
  url?: string
}

export default function NavBar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [basicResults, setBasicResults] = useState<BasicResult[]>([])
  const [finalResults, setFinalResults] = useState([])
  const { isLoggedIn, logout, checkAuth } = useAuthStore()
  const router = useRouter()
  const pathname = usePathname()

  const debouncedQuery = useDebounce(query, 300)

  const searchRef = useRef<HTMLDivElement>(null)

  // index 값을 한글 이름으로 매핑하는 객체
  const indexMap: Record<string, string> = {
    user: '사용자',
    blog: '블로그',
    study: '스터디',
    project: '프로젝트',
    resume: '이력서',
    event: '이벤트',
    session: '세션',
    profile: '프로필',
  }

  const toggleSearch = () => {
    if (isSearchOpen) {
      setIsSearchOpen(false)
      setQuery('')
      setBasicResults([])
    } else {
      setIsSearchOpen(true)
    }
  }

  useEffect(() => {
    // debouncedQuery가 바뀔 때마다 /api/v2/search/basic 호출
    if (debouncedQuery) {
      const fetchBasicResults = async () => {
        const data = await getBasicSearchResults(debouncedQuery)
        setBasicResults(data.results)
      }
      fetchBasicResults()
    }
  }, [debouncedQuery])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // 자동완성창 닫기 및 검색어 초기화
    setIsSearchOpen(false)
    setQuery('')
    setBasicResults([])

    if (query) {
      const data = await getFinalSearchResults(query)
      setFinalResults(data)
      router.push(`/search?query=${query}`)
    }
  }

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

  useEffect(() => {
    checkAuth()
  }, [])

  const handleSelectResult = async (
    selectedTitle: string,
    section: string,
    id: number,
    url?: string,
  ) => {
    setQuery(selectedTitle)
    setTimeout(() => setIsSearchOpen(false), 0) // 검색 결과 클릭 시 자동완성 창 닫기
    await handleSubmit(new Event('submit') as unknown as React.FormEvent) // 강제 제출 실행

    setQuery('') //자동 완성창 초기화

    // section이 'event' 또는 'session'인 경우에는 URL로 직접 이동
    if (section === 'blog' || section === 'event') {
      if (url) {
        router.push(url) // 반환된 URL로 이동
      } else {
      }
    } else if (section === 'project') {
      router.push(`/project/detail/project/${id}`)
    } else if (section === 'study') {
      router.push(`/project/detail/study/${id}`)
    } else if (section === 'session') {
      router.push(`/session/video/${id}`)
    } else {
      router.push(`/${section}/${id}`)
    }
  }

  const handleLogout = async () => {
    try {
      await logout()
      router.push('/')
    } catch (error) {
      router.push('/login')
    }
  }

  const navItems: { key: string; href: string }[] = [
    { key: 'project', href: '/project' },
    { key: 'profile', href: '/profile' },
    { key: 'resume', href: '/resume' },
    { key: 'blog', href: '/blog' },
    { key: 'session', href: '/session' },
  ]

  return (
    <div
      ref={searchRef}
      className="flex items-center w-[1280px] max-w-[1280px] h-[4rem] justify-between"
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
          {navItems.map((item) => {
            // (C) 현재 경로(pathname)가 item.href로 시작하면 active 스타일
            const isActive = pathname.startsWith(item.href)
            return (
              <Link
                key={item.key}
                href={item.href}
                className={`hover:text-primary cursor-pointer ${
                  isActive ? 'text-primary' : ''
                }`}
              >
                {indexMap[item.key]}
              </Link>
            )
          })}
        </div>
      </div>
      <div className="flex items-center cursor-pointer">
        {/* 돋보기 및 기타 아이콘 */}
        <div className="flex items-center">
          {/* 검색 영역 */}
          <div className="p-2 relative">
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
            {debouncedQuery && (
              <ul className="absolute bg-white border border-gray rounded-lg mt-1 w-[314px] max-h-[17rem] overflow-y-auto z-10">
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
                        <IoSearchOutline
                          className="w-3"
                          onClick={toggleSearch}
                        />
                        <li
                          key={index}
                          className="p-1 cursor-pointer font-light"
                          onClick={() =>
                            handleSelectResult(
                              result.title.split('-').slice(-1).join(' '),
                              result.index,
                              result.id,
                              result.url,
                            )
                          }
                        >
                          <span className=" text-primary text-sm">
                            {indexMap[result.index] || result.index}
                            <span className="text-gray"> &nbsp; | &nbsp;</span>
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
          </div>
        </div>
        {/* 캘린더 아이콘 */}
        <Link href="/calendar" className="p-2 cursor-pointer">
          <IoCalendarOutline size={24} />
        </Link>
        {/* 마이페이지 아이콘 */}
        <Link href="/mypage" className="p-[6px] cursor-pointer">
          <IoPersonCircle size={28} />
        </Link>
        {isLoggedIn ? (
          <button
            type="button"
            className="ml-4 hover:text-primary cursor-pointer"
            onClick={handleLogout}
          >
            로그아웃
          </button>
        ) : (
          <Link
            href="/login"
            className="ml-4 hover:text-primary cursor-pointer"
          >
            로그인
          </Link>
        )}
      </div>
    </div>
  )
}
