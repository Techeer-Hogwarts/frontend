'use client'

import TapBar from '@/components/common/TapBar'
import AddBtn from '@/components/common/AddBtn'
import BlogPost from '@/components/blog/BlogPost'
import { useLike } from '@/app/blog/_lib/useLike'
import { useTapBarStore } from '@/store/tapBarStore'
import { useInView } from 'react-intersection-observer'
import { useCallback, useEffect, useState } from 'react'
import { BlogProps } from '@/types/BlogProps'
import EmptyLottie from '@/components/common/EmptyLottie'
import SearchBar from '@/components/common/SearchBar'
import BlogPostSkeleton from '@/components/blog/BlogPostSkeleton'

const category = ['TECHEER', 'SHARED', '금주의 블로그']

export default function Page() {
  const [blog, setBlog] = useState<BlogProps[]>([])
  const [likeList, setLikeList] = useState([])
  const [message, setMessage] = useState<string | null>(null)

  // 로딩 & 데이터 유무 상태
  const [isLoading, setIsLoading] = useState(true)
  const [hasFetched, setHasFetched] = useState(false)

  // 검색어, 한 번에 가져올 limit
  const [inputValue, setInputValue] = useState('')
  const [limit, setLimit] = useState(12)

  // 탭 상태
  const { activeOption, setActiveOption } = useTapBarStore()

  // 무한 스크롤
  const [ref, inView] = useInView({ threshold: 0.5 })

  // 좋아요 API
  const { fetchLikes } = useLike()

  // 카테고리 변경 시 호출
  const handleCategoryChange = (selectedCategory: string) => {
    // 기존 데이터/상태 초기화
    setBlog([])
    setLikeList([])
    setLimit(12) // 초기 limit (원하시면 3도 가능)
    setHasFetched(false)
    setIsLoading(true)

    // 탭 상태만 변경 (실제 API 호출은 useEffect에서)
    setActiveOption(selectedCategory)
  }

  // 글 삭제 시 메시지 표시
  const handleDeleteSession = (id: string) => {
    setBlog((prevblogs) => prevblogs.filter((blog) => blog.id !== id))
    setMessage('블로그 글이 삭제되었습니다.')
    setTimeout(() => setMessage(null), 2000)
  }

  // (A) "금주의 블로그" API
  const getBestBlog = useCallback(async (newLimit: number) => {
    const response = await fetch(
      `/api/v1/blogs/best?offset=0&limit=${newLimit}`,
    )
    if (!response.ok) {
      throw new Error('블로그 데이터를 불러오는데 실패했습니다.')
    }
    return response.json() // 블로그 배열
  }, [])

  // (B) 일반 블로그 API
  const getBlog = useCallback(
    async (newLimit: number, query: string, category: string) => {
      const baseUrl = 'https://api.techeerzip.cloud/api/v1/blogs'
      const params = {
        keyword: query,
        category,
        offset: '0',
        limit: String(newLimit),
      }
      const filteredParams = Object.fromEntries(
        Object.entries(params).filter(
          ([, value]) => value !== null && value !== '',
        ),
      )
      const queryString = new URLSearchParams(filteredParams).toString()
      const url = `${baseUrl}?${queryString}`

      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('블로그 데이터 로딩 중 오류')
      }
      return response.json() // 블로그 배열
    },
    [],
  )

  // (C) 좋아요 목록
  const checkLike = async () => {
    try {
      return await fetchLikes('BLOG', 0, 50)
    } catch (err) {
      console.error(err)
      return []
    }
  }

  // (D) 불러온 데이터에 "좋아요" 반영
  const syncLikeCount = (blogs: BlogProps[], likes: { id: string }[]) => {
    return blogs.map((b) => ({
      ...b,
      likeCount: likes.some((like) => like.id === b.id)
        ? b.likeCount + 1
        : b.likeCount,
    }))
  }

  // (E) 메인 fetchData: 탭 변경/검색어 변경 시 한 번만 호출
  const fetchData = async () => {
    setIsLoading(true) // 로딩 시작
    setHasFetched(false)

    try {
      let newBlogs: BlogProps[] = []
      if (activeOption === '금주의 블로그') {
        newBlogs = await getBestBlog(limit)
      } else {
        newBlogs = await getBlog(limit, inputValue, activeOption)
      }

      const newLikeList = await checkLike()
      const updated = syncLikeCount(newBlogs, newLikeList)

      setBlog(updated)
      setLikeList(newLikeList)
    } catch (err) {
      console.error('fetchData error:', err)
    } finally {
      // 모든 API 완료 후
      setIsLoading(false)
      setHasFetched(true)
    }
  }

  // (F) 탭 변경 or 검색어 변경 시 fetch
  useEffect(() => {
    // 초기화
    setBlog([])
    setLikeList([])
    // fetch
    fetchData()
  }, [activeOption, inputValue])

  // (G) 무한 스크롤
  useEffect(() => {
    // 이미 로딩 중이면 추가 호출 방지
    if (!inView || isLoading) return

    const fetchMore = async () => {
      let newLimit = limit + 12
      let newBlogs: BlogProps[] = []

      try {
        if (activeOption === '금주의 블로그') {
          newBlogs = await getBestBlog(newLimit)
        } else {
          newBlogs = await getBlog(newLimit, inputValue, activeOption)
        }
        const newLikeList = await checkLike()
        const updated = syncLikeCount(newBlogs, newLikeList)
        setBlog(updated)
        setLimit(newLimit)
      } catch (err) {
        console.error(err)
      }
    }

    fetchMore()
  }, [inView, isLoading, limit, activeOption, inputValue])

  return (
    <div className="flex justify-center h-auto min-h-screen">
      <div className="flex flex-col">
        {/* 삭제 메시지 */}
        {message && (
          <div className="fixed z-50 px-4 py-2 text-center text-white transform -translate-x-1/2 rounded-md bg-red-500/80 bottom-5 left-1/2">
            {message}
          </div>
        )}

        {/* 상단 제목 */}
        <div className="w-[1200px] text-left mt-14 mb-[2.84rem]">
          <p className="text-[2rem] font-bold">블로그</p>
          <p className="text-[1.25rem]">테커인들의 블로그를 확인해보세요.</p>
        </div>

        {/* 탭바 + 검색바 */}
        <div className="flex justify-between">
          <TapBar options={category} onSelect={handleCategoryChange} />
          <SearchBar
            placeholder="이름 또는 키워드로 검색해보세요"
            index="blog"
            onSearchResult={() => null /* 필요시 구현 */}
          />
        </div>

        {/* 구분선 */}
        <div className="flex w-full h-[1px] mt-5 bg-gray" />

        {/* 메인 렌더 */}
        {isLoading ? (
          <div className="grid grid-cols-4 gap-8 mt-[2.84rem] ">
          {Array.from({ length: 8 }).map((_, i) => (
            <BlogPostSkeleton key={i} />
          ))}
        </div>
        ) : blog.length === 0 && hasFetched ? (
          // 로딩 완료 & 빈 배열
          <div className="flex justify-center">
            <EmptyLottie
              text="블로그 데이터가 없습니다."
              text2="다시 조회해주세요"
            />
          </div>
        ) : (
          // 데이터 있음
          <div className="grid grid-cols-4 gap-8 mt-[2.84rem]">
            {blog.map((b, index) => (
              <BlogPost
                key={index}
                title={b.title}
                id={b.id}
                date={b.date}
                url={b.url}
                likeCount={b.likeCount}
                name={b.author.authorName}
                image={b.thumbnail}
                authorImage={b.author.authorImage}
                onDelete={handleDeleteSession}
                likeList={likeList}
              />
            ))}
            {/* 무한 스크롤 감지 ref */}
            <div ref={ref} />
          </div>
        )}
      </div>
      {/* 오른쪽 아래 추가 버튼 */}
      <AddBtn />
    </div>
  )
}
