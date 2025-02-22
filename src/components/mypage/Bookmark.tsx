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
const tapBatOptions = ['세션영상', '블로그', '이력서']
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
    setActiveOption(tapBatOptions[0])
  }, [setActiveOption])

  useEffect(() => {
    if (!inView) return
    if (inView) {
      setLimit(limit + 6)
    }
  }, [inView])

  const handleCategoryChange = () => {}
  return (
    <div className="ml-10">
      <TapBar
        options={['이력서', '부트캠프', '파트너스']}
        // placeholder="세션 제목 혹은 이름을 검색해보세요"
        onSelect={handleSearch}
      />
      <div className="mt-5 grid grid-cols-2 gap-8">
        {/* {BookmarkProps.map((Bookmark) => (
          <BlogPost
            key={Bookmark.id}
            title={Bookmark.title}
            date={Bookmark.date}
            name={Bookmark.name}
          />
        ))} */}
      </div>
    </div>
  )
}
