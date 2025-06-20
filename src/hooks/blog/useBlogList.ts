'use client'

import { useState, useEffect, useMemo } from 'react'
import { useGetBlogsAPI } from '@/api/blog/blog'
import { useInView } from 'react-intersection-observer'
import { useGetLikesAPI } from '@/api/likes/likes'
import { useTapBarStore } from '@/store/tapBarStore'

export const useBlogList = (sortBy: string = '최신순') => {
  const sortByValue =
    sortBy === '조회순' ? 'viewCount'
    : sortBy === '가나다순' ? 'name'
    : 'latest'
  
  const { activeOption } = useTapBarStore()
  const limit = 12 // 고정값으로 변경
  const [cursor, setCursor] = useState<number | undefined>(undefined)
  const [hasNext, setHasNext] = useState(true)
  const [blog, setBlog] = useState([])
  const [ref, inView] = useInView({ threshold: 0.5 })
  const {
    data: blogResponse,
    isLoading,
    isFetching,
  } = useGetBlogsAPI(limit, activeOption, cursor, sortByValue)
  const { data: likeDate } = useGetLikesAPI('BLOG', 0, 50)

  const isInitialLoad = useMemo(
    () => blog.length === 0 && isLoading && !cursor,
    [blog.length, isLoading, cursor],
  )

  useEffect(() => {
    // 필터나 탭이 변경되면 초기화
    setBlog([])
    setCursor(undefined)
    setHasNext(true)
  }, [activeOption, sortBy])

  useEffect(() => {
    if (!blogResponse || isLoading) return

    // 응답에서 데이터와 메타정보 추출
    const blogs = Array.isArray(blogResponse)
      ? blogResponse
      : blogResponse.data || blogResponse.content || []

    // 커서 기반 메타정보 업데이트
    if (blogResponse.hasNext !== undefined) {
      setHasNext(blogResponse.hasNext)
    }

    // 첫 로드이거나 필터가 변경된 경우
    if (!cursor) {
      setBlog(blogs)
    } else {
      // 무한 스크롤로 데이터 추가
      setBlog((prev) => {
        const existingIds = new Set(prev.map((blog) => blog.id))
        const newItems = blogs.filter(
          (blog: any) => !existingIds.has(blog.id),
        )
        return [...prev, ...newItems]
      })
    }
  }, [blogResponse, isLoading, cursor])

  useEffect(() => {
    // 무한 스크롤 트리거


    if (inView && hasNext && !isLoading && !isFetching) {
      // 현재 응답에서 nextCursor가 있고, 이미 설정된 cursor와 다른 경우에만 업데이트
      if (blogResponse?.nextCursor && blogResponse.nextCursor !== cursor) {
        setCursor(blogResponse.nextCursor)
      }
    }
  }, [inView, hasNext, isLoading, isFetching, blogResponse, cursor])

  const removeBlog = (blogId: string) => {
    setBlog((prev) => prev.filter((blog: any) => blog.id !== blogId))
  }

  return {
    blog,
    isLoading,
    isInitialLoad,
    ref,
    likeDate: Array.isArray(likeDate) ? likeDate : likeDate?.data || likeDate?.content || [],
    removeBlog,
  }
}
