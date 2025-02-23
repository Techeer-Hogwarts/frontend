'use client'

import TapBar from '../common/TapBar'
import BlogPost from '../blog/BlogPost'
import { useEffect, useState } from 'react'
import SessionPost from '../session/SessionPost'
import { useLike } from '@/app/blog/_lib/useLike'
import { useTapBarStore } from '@/store/tapBarStore'
import { useInView } from 'react-intersection-observer'
import { useBookmark } from '@/app/blog/_lib/useBookmark'
import Skeleton from './Skeleton'
const tapBarOptions = ['세션영상', '블로그', '이력서']
export default function Bookmark() {
  const { fetchLikes } = useLike()
  const [limit, setLimit] = useState(6)
  const [likeList, setLikeList] = useState([])
  const [bookmarks, setBookmarks] = useState([])
  const [inputValue, setInputValue] = useState('')
  const { fetchBookmarks } = useBookmark()
  const { activeOption, setActiveOption } = useTapBarStore()
  const [ref, inView] = useInView()
  const [isLoading, setIsLoading] = useState(true)

  const handleSearch = (query: string) => {
    sessionStorage.setItem('searchQuery', query)
    setInputValue(query)
  }
  const checkLike = async (category: string) => {
    try {
      const data = await fetchLikes(category, 0, 50)
      setLikeList(data)
      return data
    } catch (err) {
      console.error(err)
      return []
    }
  }
  const getBookmarks = async () => {
    const category =
      activeOption === '이력서'
        ? 'RESUME'
        : activeOption === '블로그'
          ? 'BLOG'
          : 'SESSION'
    try {
      const data = await fetchBookmarks(category, 0, limit)
      setBookmarks(data)
      checkLike(category)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    setLimit(6)
    getBookmarks()
    setLikeList([])
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1300)
  }, [activeOption])

  useEffect(() => {
    if (limit !== 6) {
      getBookmarks()
    }
  }, [limit])

  useEffect(() => {
    if (!inView) return
    if (inView) {
      setLimit(limit + 6)
    }
  }, [inView])

  const handleCategoryChange = () => {}
  return (
    <div className="w-[890px]">
        <TapBar options={tapBarOptions} onSelect={handleSearch} />
        <div className="flex w-full h-[1px] mt-5 bg-gray" />
      <div className="grid grid-cols-2 gap-8 mt-5">
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} />
            ))
          : bookmarks.map((bookmark: any) => {
              if (activeOption === '블로그') {
                return (
                  <BlogPost
                    key={bookmark.id}
                    title={bookmark.title}
                    id={bookmark.id}
                    date={bookmark.date}
                    url={bookmark.url}
                    likeCount={bookmark.likeCount}
                    name={bookmark.author?.authorName || ''}
                    image={bookmark.thumbnail}
                    authorImage={bookmark.author?.authorImage}
                    onDelete={bookmark}
                    likeList={likeList}
                  />
                )
              } else if (activeOption === '세션영상') {
                return (
                  <SessionPost
                    key={bookmark.id}
                    likeCount={bookmark.likeCount}
                    id={bookmark.id}
                    thumbnail={bookmark.thumbnail}
                    title={bookmark.title}
                    date={bookmark.date}
                    presenter={bookmark.presenter}
                    fileUrl={bookmark.fileUrl}
                    showMessage={bookmark}
                    userImage={bookmark.user.profileImage}
                    likeList={likeList}
                    onLikeUpdate={bookmark}
                  />
                )
              }
              return null
            })}
        <div ref={ref} />
      </div>
    </div>
  )
}
