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
import { useGetResumeQuery } from '@/app/resume/query/useGetResumeQuery'
import ResumeFolder from './ResumeFolder'
import SkeletonResumeFolder from '../resume/SkeletonResume'
import { IoReturnDownBack } from 'react-icons/io5'
import EmptyLottie from '../common/EmptyLottie'

const tapBarOptions = ['세션영상', '블로그', '이력서']

export default function Bookmark() {
  const { refetch } = useGetResumeQuery({})

  const { fetchLikes } = useLike()
  const { fetchBookmarks } = useBookmark()

  const [limit, setLimit] = useState(6)

  const [likeList, setLikeList] = useState([])
  const [like, setLike] = useState([])
  const [bookmarks, setBookmarks] = useState([])
  const [bookmarkList, setBookmarkList] = useState([])

  const [inputValue, setInputValue] = useState('')

  const { activeOption, setActiveOption } = useTapBarStore()
  const [ref, inView] = useInView()
  const [isLoading, setIsLoading] = useState(true)

  const handleSearch = (query: string) => {
    sessionStorage.setItem('searchQuery', query)
    setInputValue(query)
  }

  const checkBookmark = async () => {
    const category =
      activeOption === '이력서'
        ? 'RESUME'
        : activeOption === '블로그'
          ? 'BLOG'
          : 'SESSION'
    try {
      const checkData = await fetchBookmarks(category, 0, 50)
      console.log('Bookmark checkData:', checkData)
      setBookmarkList(checkData)

      const data = await fetchBookmarks(category, 0, limit)
      console.log('Bookmark data:', data)
      setBookmarks(data)
      return data
    } catch (err) {
      console.error('Bookmark fetch error:', err)
      setBookmarks([])
      setBookmarkList([])
      return []
    }
  }

  const checkLike = async () => {
    const category =
      activeOption === '이력서'
        ? 'RESUME'
        : activeOption === '블로그'
          ? 'BLOG'
          : 'SESSION'
    try {
      const checkData = await fetchLikes(category, 0, 50)
      console.log('Like checkData:', checkData)
      setLikeList(checkData)

      const data = await fetchLikes(category, 0, limit)
      console.log('Like data:', data)
      setLike(data)
      return data
    } catch (err) {
      console.error('Like fetch error:', err)
      setLike([])
      setLikeList([])
    }
  }

  const handleBookmarkUpdate = (resumeId: string, newBookmarkCount: number) => {
    setBookmarkList((prev) =>
      prev.map((resume) =>
        resume.id === resumeId
          ? { ...resume, bookmarkCount: newBookmarkCount }
          : resume,
      ),
    )
    setTimeout(() => {
      checkBookmark()
      refetch()
    }, 500)
  }

  const handleLikeUpdate = (resumeId: string, newLikeCount: number) => {
    setLikeList((prev) =>
      prev.map((resume) =>
        resume.id === resumeId
          ? { ...resume, likeCount: newLikeCount }
          : resume,
      ),
    )
    setTimeout(() => {
      checkLike()
      refetch()
    }, 500)
  }

  useEffect(() => {
    setLimit(6)
    checkLike()
    checkBookmark()
    setBookmarkList([])
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1300)
  }, [activeOption])

  useEffect(() => {
    checkBookmark()
  }, [limit])

  useEffect(() => {
    if (!inView) IoReturnDownBack
    setLimit(limit + 6)
  }, [inView])

  const handleCategoryChange = () => {
    setLimit(6)
    refetch()
  }

  return (
    <div>
      <div className="w-[890px]">
        <TapBar options={tapBarOptions} />
        <div className="flex w-full h-[1px] mt-5 bg-gray" />
      </div>
      {isLoading ? (
        <div
          className={`grid gap-7 mt-5 ${activeOption === '이력서' ? 'grid-cols-3' : 'grid-cols-2'
            }`}
        >
          {activeOption === '이력서'
            ? Array.from({ length: 6 }).map((_, index) => (
              <SkeletonResumeFolder key={index} />
            ))
            : Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} />
            ))}
        </div>
      ) : bookmarks.length === 0 ? (
        // grid 외부에 빈 상태 컴포넌트를 flex 컨테이너로 중앙 정렬 처리
        <div className="flex flex-col items-center justify-center mt-20">
          <EmptyLottie text="북마크한 콘텐츠가 없습니다." text2="" />
        </div>
      ) : (
        <div
          className={`grid gap-7 mt-5 ${activeOption === '이력서' ? 'grid-cols-3' : 'grid-cols-2'
            }`}
        >
          {bookmarks.map((bookmark: any) => {
            if (activeOption === '블로그') {
              return (
                <BlogPost
                  key={bookmark.id}
                  title={bookmark.title}
                  id={bookmark.id}
                  category={bookmark.category}
                  date={bookmark.date}
                  url={bookmark.url}
                  likeCount={bookmark.likeCount}
                  userName={bookmark.user.name}
                  userImage={bookmark.user.profileImage}
                  authorName={bookmark.author?.authorName}
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
                  {...bookmark}
                  likeList={likeList}
                  onLikeUpdate={bookmark}
                />
              )
            } else if (activeOption === '이력서') {
              return (
                <ResumeFolder
                  key={bookmark.id}
                  likeCount={bookmark.likeCount}
                  resume={bookmark}
                  likeList={likeList}
                  onLikeUpdate={handleLikeUpdate}
                  bookmarkList={bookmarkList}
                  onBookmarkUpdate={handleBookmarkUpdate}
                />
              )
            }
            return null
          })}
          <div ref={ref} />
        </div>
      )}
    </div>
  )
}
