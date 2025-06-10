'use client'

import { useState, useEffect, useMemo } from 'react'
import { useGetBlogsAPI } from '@/api/blog/blog'
import { useInView } from 'react-intersection-observer'
import { useGetLikesAPI } from '@/api/likes/likes'
import { useTapBarStore } from '@/store/tapBarStore'

export const useBlogList = () => {
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
  } = useGetBlogsAPI(limit, activeOption, cursor)
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
  }, [activeOption])

  useEffect(() => {
    if (!blogResponse || isLoading) return

    console.log('Blog Response:', {
      cursor,
      hasData: Array.isArray(blogResponse) || !!blogResponse.data,
      nextCursor: blogResponse.nextCursor,
      hasNext: blogResponse.hasNext
    })

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
      console.log('Initial load, setting blogs:', blogs.length)
      setBlog(blogs)
    } else {
      // 무한 스크롤로 데이터 추가
      setBlog((prev) => {
        const existingIds = new Set(prev.map((blog) => blog.id))
        const newItems = blogs.filter(
          (blog: any) => !existingIds.has(blog.id),
        )
        console.log('Adding new items:', newItems.length, 'to existing:', prev.length)
        return [...prev, ...newItems]
      })
    }
  }, [blogResponse, isLoading, cursor])

  useEffect(() => {
    // 무한 스크롤 트리거
    console.log('Infinite scroll check:', {
      inView,
      hasNext,
      isLoading,
      isFetching,
      nextCursor: blogResponse?.nextCursor,
      currentCursor: cursor
    })

    if (inView && hasNext && !isLoading && !isFetching) {
      // 현재 응답에서 nextCursor가 있고, 이미 설정된 cursor와 다른 경우에만 업데이트
      if (blogResponse?.nextCursor && blogResponse.nextCursor !== cursor) {
        console.log('Setting new cursor:', blogResponse.nextCursor)
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
