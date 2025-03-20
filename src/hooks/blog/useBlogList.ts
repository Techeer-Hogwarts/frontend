// 'use client'

import { useState, useEffect, useMemo } from 'react'
import { useGetBlogsAPI } from '@/api/blog/blog'
import { useInView } from 'react-intersection-observer'
import { useGetLikesAPI } from '@/api/likes/likes'
import { useTapBarStore } from '@/store/tapBarStore'

export const useBlogList = () => {
  const { activeOption } = useTapBarStore()
  const [limit, setLimit] = useState(12)
  const [blog, setBlog] = useState([])
  const [ref, inView] = useInView({ threshold: 0.5 })
  const {
    data: blogData,
    isLoading,
    isFetching,
  } = useGetBlogsAPI(limit, activeOption)
  const { data: likeDate } = useGetLikesAPI('BLOG', 0, 50)

  const isInitialLoad = useMemo(
    () => blog.length === 0 && isLoading,
    [blog.length, isLoading],
  )

  useEffect(() => {
    setLimit(12)
    setBlog([])
  }, [activeOption])

  useEffect(() => {
    if (!isLoading && !isFetching && blogData) {
      if (blogData.length > blog.length) {
        setBlog(blogData)
      }
    }
  }, [blogData, isLoading, isFetching])

  useEffect(() => {
    if (
      inView &&
      !isFetching &&
      !isLoading &&
      blogData &&
      blogData.length === limit
    ) {
      setLimit((prevLimit) => prevLimit + 12)
    }
  }, [inView, limit, isFetching, isLoading, blogData])

  return { blog, isLoading, isInitialLoad, ref, likeDate }
}
