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

const category = ['전체보기', 'TECHEER', 'SHARED', '금주의 블로그']
export default function Page() {
  const { activeOption, setActiveOption } = useTapBarStore()
  const [blog, setBlog] = useState<BlogProps[]>([])
  const [likeList, setLikeList] = useState([])
  const [message, setMessage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasFetched, setHasFetched] = useState(false)
  const [limit, setLimit] = useState(12)
  const [isRequesting, setIsRequesting] = useState(false)
  const [ref, inView] = useInView({ threshold: 0.5 })
  const { fetchLikes } = useLike()
  const handleCategoryChange = (selectedCategory: string) => {
    setBlog([])
    setLikeList([])
    setLimit(12)
    setHasFetched(false)
    setIsLoading(true)
    setActiveOption(selectedCategory)
  }
  const handleDeleteSession = (id: string) => {
    setBlog((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id))
    setMessage('블로그 글이 삭제되었습니다.')
    setTimeout(() => setMessage(null), 2000)
  }
  const fetchMore = async () => {
    const newLimit = limit + 12
    try {
      const newBlogs = await fetchBlogs(newLimit, activeOption)
      const newLikeList = await checkLike()
      const updatedBlogs = newBlogs.map((b: BlogProps) => ({
        ...b,
        likeCount: newLikeList.some((like) => like.id === b.id)
          ? b.likeCount + 1
          : b.likeCount,
      }))
      setBlog(updatedBlogs)
      setLimit(newLimit)
    } catch (err) {}
  }
  const fetchBlogs = useCallback(async (newLimit: number, category: string) => {
    if (category === '금주의 블로그') {
      let url = `/api/v1/blogs/best?offset=0&limit=${newLimit}`
      const response = await fetch(url)
      if (!response.ok)
        throw new Error('블로그 데이터를 불러오는데 실패했습니다.')
      return response.json()
    }
    if (category === '전체보기') category = ''
    let url = `/api/v1/blogs?offset=0&limit=${newLimit}`
    if (category) {
      url += `&category=${category}`
    }
    const response = await fetch(url)
    if (!response.ok)
      throw new Error('블로그 데이터를 불러오는데 실패했습니다.')
    return response.json()
  }, [])
  const checkLike = async () => {
    try {
      return await fetchLikes('BLOG', 0, 50)
    } catch {
      return []
    }
  }
  const fetchData = async () => {
    setIsLoading(true)
    setHasFetched(false)
    if (!category.includes(activeOption)) {
      setActiveOption('전체보기')
    }
    try {
      const newBlogs = await fetchBlogs(limit, activeOption)
      const newLikeList = await checkLike()
      const updatedBlogs = newBlogs.map((b: BlogProps) => ({
        ...b,
        likeCount: newLikeList.some((like) => like.id === b.id)
          ? b.likeCount + 1
          : b.likeCount,
      }))

      setBlog(updatedBlogs)
      setLikeList(newLikeList)
    } catch (err) {
    } finally {
      setIsLoading(false)
      setHasFetched(true)
    }
  }
  useEffect(() => {
    if (!category.includes(activeOption)) {
      setActiveOption('전체보기')
      return
    }
    setBlog([])
    setLikeList([])
    fetchData()
  }, [activeOption])

  useEffect(() => {
    if (!inView || isLoading) return
    if (inView) {
      setIsRequesting(true)
      fetchMore()
    }
  }, [inView, isLoading, isRequesting, activeOption])

  return (
    <div className="flex justify-center h-auto min-h-screen">
      <div className="flex flex-col">
        {message && (
          <div className="fixed z-50 px-4 py-2 text-center text-white transform -translate-x-1/2 rounded-md bg-red-500/80 bottom-5 left-1/2">
            {message}
          </div>
        )}
        <div className="w-[1200px] text-left mt-14 mb-[2.84rem]">
          <p className="text-[2rem] font-bold">블로그</p>
          <p className="text-[1.25rem]">테커인들의 블로그를 확인해보세요.</p>
        </div>
        <div className="flex justify-between">
          <TapBar options={category} onSelect={handleCategoryChange} />
          <SearchBar
            placeholder="이름 또는 키워드로 검색해보세요"
            index="blog"
            onSearchResult={() => null}
          />
        </div>
        <div className="flex w-full h-[1px] mt-5 bg-gray" />
        {isLoading ? (
          <div className="grid grid-cols-4 gap-8 mt-[2.84rem]">
            {Array.from({ length: 8 }).map((_, i) => (
              <BlogPostSkeleton key={i} />
            ))}
          </div>
        ) : blog.length === 0 && hasFetched ? (
          <div className="flex justify-center">
            <EmptyLottie
              text="블로그 데이터가 없습니다."
              text2="다시 조회해주세요"
            />
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-8 mt-[2.84rem]">
            {blog.map((b, index) => (
              <BlogPost
                key={index}
                title={b.title}
                id={b.id}
                category={b.category}
                date={b.date}
                url={b.url}
                likeCount={b.likeCount}
                userName={b.user.name}
                userImage={b.user.profileImage}
                image={b.thumbnail}
                authorImage={b.author.authorImage}
                authorName={b.author.authorName}
                onDelete={handleDeleteSession}
                likeList={likeList}
              />
            ))}
            <div ref={ref} />
          </div>
        )}
      </div>
      <AddBtn />
    </div>
  )
}
