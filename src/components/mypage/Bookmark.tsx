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
      setBookmarkList(checkData)
      const data = await fetchBookmarks(category, 0, limit)
      setBookmarks(data)
      return data
    } catch (err) {
      console.error(err)
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
      setLikeList(checkData)
      const data = await fetchLikes(category, 0, limit)
      setLike(data)
      return data
    } catch (err) {
      console.error(err)
      return []
    }
  }

  const handleBookmarkUpdate = (resumeId: string, newBookmarkCount: number) => {
    // 현재 이력서 데이터에서 해당 ID를 가진 이력서 찾아 업데이트
    setBookmarkList((prev) =>
      prev.map((resume) =>
        resume.id === resumeId
          ? { ...resume, bookmarkCount: newBookmarkCount }
          : resume,
      ),
    )

    // 탭 변경 시에도 좋아요 상태 유지를 위해 서버 데이터 갱신
    setTimeout(() => {
      checkBookmark()
      refetch()
    }, 500)
  }
  const handleLikeUpdate = (resumeId: string, newLikeCount: number) => {
    // 현재 이력서 데이터에서 해당 ID를 가진 이력서 찾아 업데이트
    setLikeList((prev) =>
      prev.map((resume) =>
        resume.id === resumeId
          ? { ...resume, likeCount: newLikeCount }
          : resume,
      ),
    )

    // 탭 변경 시에도 좋아요 상태 유지를 위해 서버 데이터 갱신
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
    // 카테고리가 변경되면 해당 카테고리에 맞는 블로그 데이터를 가져옵니다.
    setLimit(6) // 페이지네이션 초기화
    refetch()
  }
  return (
    <div className="ml-10">
      <div className="w-[800px]">
        <TapBar options={tapBarOptions} onSelect={handleCategoryChange} />
        <div className="flex w-full h-[1px] mt-5 bg-gray" />
      </div>
      <div
        className={`grid gap-7 mt-5 ${
          activeOption === '이력서' ? 'grid-cols-3' : 'grid-cols-2'
        }`}
      >
        {isLoading
          ? activeOption === '이력서'
            ? Array.from({ length: 6 }).map((_, index) => (
                <SkeletonResumeFolder key={index} />
              ))
            : Array.from({ length: 4 }).map((_, index) => (
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
    </div>
  )
}
