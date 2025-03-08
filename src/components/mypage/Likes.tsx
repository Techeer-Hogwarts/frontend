'use client'

import { useEffect, useState } from 'react'
import TapBar from '../common/TapBar'
import SessionPost from '../session/SessionPost'
import { useLike } from '@/app/blog/_lib/useLike'
import { useTapBarStore } from '@/store/tapBarStore'
import { useInView } from 'react-intersection-observer'
import BlogPost from '../blog/BlogPost'
import Skeleton from './Skeleton'
import ResumeFolder from './ResumeFolder'
import { useGetResumeQuery } from '@/app/resume/query/useGetResumeQuery'
import SkeletonResumeFolder from '../resume/SkeletonResume'
import { useBookmark } from '@/app/blog/_lib/useBookmark'
import EmptyLottie from '../common/EmptyLottie'

const tapBarOptions = ['세션영상', '블로그', '이력서']

export default function Likes() {
  const { refetch } = useGetResumeQuery({})
  const { fetchLikes } = useLike()
  const { fetchBookmarks } = useBookmark()

  const [likeList, setLikeList] = useState([])
  const [likes, setLikes] = useState([])
  const [bookmarkList, setBookmarkList] = useState<string[]>([])

  const [inputValue, setInputValue] = useState('')
  const { activeOption, setActiveOption } = useTapBarStore()
  const [isLoading, setIsLoading] = useState(true)
  const [ref, inView] = useInView()
  const [limit, setLimit] = useState(6)

  const handleSearch = (query: string) => {
    sessionStorage.setItem('searchQuery', query)
    setInputValue(query)
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
      setLikes(data)
      return data
    } catch (err) {
      return []
    }
  }

  const checkBookmark = async () => {
    try {
      const data = await fetchBookmarks('RESUME', 0, 50)
      setBookmarkList(data)
      return data
    } catch (err) {
      console.error(err)
      return []
    }
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
    setLimit(9)
    checkLike()
    checkBookmark()
    setLikeList([])
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1300)
  }, [activeOption])

  useEffect(() => {
    checkLike()
  }, [limit])

  const handleBookmarkUpdate = (resumeId: string, newBookmarkCount: number) => {
    setLikeList((prev) =>
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

  useEffect(() => {
    if (!inView) return
    setLimit((prev) => prev + 6)
  }, [inView])

  const handleCategoryChange = () => {
    setLimit(6) // 페이지네이션 초기화
    refetch()
  }

  return (
    <div className="w-[890px]">
      <TapBar options={tapBarOptions} onSelect={handleCategoryChange} />
      <div className="flex w-full h-[1px] mt-5 bg-gray" />

      {isLoading ? (
        <div
          className={`grid gap-7 mt-5 ${
            activeOption === '이력서' ? 'grid-cols-3' : 'grid-cols-2'
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
      ) : likes.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20">
          <EmptyLottie text="좋아요한 콘텐츠가 없습니다." text2="" />
        </div>
      ) : (
        <div
          className={`grid gap-7 mt-5 ${
            activeOption === '이력서' ? 'grid-cols-3' : 'grid-cols-2'
          }`}
        >
          {likes.map((like: any) => {
            if (activeOption === '블로그') {
              return (
                <BlogPost
                  key={like.id}
                  title={like.title}
                  id={like.id}
                  category={like.category}
                  date={like.date}
                  url={like.url}
                  likeCount={like.likeCount}
                  userName={like.user.name}
                  userImage={like.user.profileImage}
                  authorName={like.author.authorName}
                  authorImage={like.author?.authorImage}
                  image={like.thumbnail}
                  onDelete={like}
                  likeList={likeList}
                />
              )
            } else if (activeOption === '세션영상') {
              return (
                <SessionPost
                  key={like.id}
                  likeCount={like.likeCount}
                  id={like.id}
                  thumbnail={like.thumbnail}
                  title={like.title}
                  date={like.date}
                  presenter={like.presenter}
                  fileUrl={like.fileUrl}
                  showMessage={like}
                  userImage={like.user.profileImage}
                  likeList={likeList}
                  onLikeUpdate={like}
                />
              )
            } else if (activeOption === '이력서') {
              return (
                <ResumeFolder
                  key={like.id}
                  likeCount={like.likeCount}
                  resume={like}
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
