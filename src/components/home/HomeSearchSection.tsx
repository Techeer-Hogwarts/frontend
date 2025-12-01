'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { IoSearchOutline } from 'react-icons/io5'
import { useBasicSearchQuery } from '@/api/home/queries'
import Link from 'next/link'

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(handler)
  }, [value, delay])

  return debouncedValue
}

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

export default function MainSearchSection() {
  const [query, setQuery] = useState('')
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const debouncedQuery = useDebounce(query, 300)
  const router = useRouter()
  const searchRef = useRef<HTMLDivElement>(null)

  const { data: basicResults } = useBasicSearchQuery(debouncedQuery)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSearchOpen(false)
    setQuery('')

    if (query) {
      router.push(`/search/final?query=${query}`)
    }
  }

  const handleClickOutside = (e: MouseEvent) => {
    if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
      setQuery('')
      setIsSearchOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mouseup', handleClickOutside)
    return () => document.removeEventListener('mouseup', handleClickOutside)
  }, [])

  const handleSelectResult = async (
    selectedTitle: string,
    section: string,
    id: number,
    url?: string,
  ) => {
    setQuery(selectedTitle)
    setTimeout(() => setIsSearchOpen(false), 0)
    await handleSubmit(new Event('submit') as unknown as React.FormEvent)
    setQuery('')

    if (section === 'blog' || section === 'event') {
      if (url) router.push(url)
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

  // ✅ 메뉴 아이템들 (사용됨)
  const menuItems = [
    {
      label: '테커 소개',
      icon: '/images/home/HomeIcon.svg',
      href: '/',
    },
    {
      label: '프로필',
      icon: '/images/home/ProfileIcon.svg',
      href: '/profile',
    },
    {
      label: '세션',
      icon: '/images/home/SessionIcon.svg',
      href: '/session',
    },
    {
      label: '이력서',
      icon: '/images/home/ResumeIcon.svg',
      href: '/resume',
    },
    {
      label: '프로젝트',
      icon: '/images/home/ProjectIcon.svg',
      href: '/project',
    },
    { label: '블로그', icon: '/images/home/BlogIcon.svg', href: '/blog' },
    {
      label: '캘린더',
      icon: '/images/home/CalendarIcon.svg',
      href: '/calendar',
    },
  ]

  return (
    <section className="w-full mt-8" ref={searchRef}>
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <form
            onSubmit={handleSubmit}
            className="flex w-[447px] h-[39px] items-center border border-[#F57601] rounded-[11px] px-4 bg-white"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="테커에 대해 검색해보세요"
              className="flex-1 focus:outline-none text-sm text-gray-700 placeholder-gray-400"
            />
            <button type="submit" className="text-[#F57601]">
              <IoSearchOutline size={25} />
            </button>
          </form>

          {debouncedQuery &&
            basicResults?.results &&
            basicResults.results.length > 0 && (
              <ul className="absolute top-full left-0 mt-1 bg-white border border-gray rounded-lg w-[447px] max-h-[17rem] overflow-y-auto z-50 shadow-lg">
                {basicResults.results.map((result, index) => {
                  const truncatedTitle =
                    result.title.length > 16
                      ? result.title.slice(0, 16) + '...'
                      : result.title
                  return (
                    <li
                      key={`${result.id}-${index}`}
                      className="flex items-center p-2 hover:bg-lightprimary cursor-pointer text-sm"
                      onClick={() =>
                        handleSelectResult(
                          result.title.split('-').slice(-1).join(' '),
                          result.index,
                          result.id,
                          result.url,
                        )
                      }
                    >
                      <IoSearchOutline className="mr-2 text-primary" />
                      <span className="text-primary font-medium">
                        {indexMap[result.index] || result.index}
                      </span>
                      <span className="mx-2 text-gray-400">|</span>
                      <span>{truncatedTitle}</span>
                    </li>
                  )
                })}
              </ul>
            )}
        </div>
        <div className="grid grid-cols-7 gap-6">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center text-sm font-medium hover:text-orange-500"
            >
              <img src={item.icon} alt={item.label} className="w-8 h-8 mb-1" />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
