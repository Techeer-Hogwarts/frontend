'use client'
import { useEffect, useState } from 'react'
import CareerTag from '../common/CareerTag'
import PositionTag from '../common/PositionTag'
import Link from 'next/link'
import Image from 'next/image'
import EmptyAnimation from '../common/EmptyAnimation'
import { useLike } from '@/app/blog/_lib/useLike'
import { useBookmark } from '@/app/blog/_lib/useBookmark'
import {
  useResumeLikeMutation,
  useResumeBookmarkMutation,
} from '@/api/resume/mutations'

interface ResumeProps {
  likeCount: number
  resume: Resume
  likeList: string[] // 좋아요 리스트
  onLikeUpdate: (resumeId: string, newLikeCount: number) => void
  bookmarkList: string[] // 북마크 리스트
  onBookmarkUpdate: (resumeId: string, newBookmarkCount: number) => void
}
export default function ResumeFolder({
  likeCount: initialLikeCount,
  resume,
  likeList,
  onLikeUpdate,
  bookmarkList,
  onBookmarkUpdate,
}: ResumeProps) {
  // resume이 undefined일 경우 기본값을 설정합니다.
  const { postLike } = useLike()
  const { postBookmark } = useBookmark()

  //   const [resumes, setResumes] = useState<Resume[]>([])

  const [isLike, setIsLike] = useState(false)
  const [isBookmark, setIsBookmark] = useState(false)

  const [likeCount, setLikeCount] = useState(initialLikeCount)
  const [bookmarkCount, setBookmarkCount] = useState(initialLikeCount)

  const likeMutation = useResumeLikeMutation()
  const bookmarkMutation = useResumeBookmarkMutation()

  useEffect(() => {
    if (Array.isArray(likeList)) {
      setIsLike(likeList.some((bookmark: any) => bookmark.id === resume.id))
    }
    if (Array.isArray(bookmarkList)) {
      setIsBookmark(
        bookmarkList.some((bookmark: any) => bookmark.id === resume.id),
      )
    }
  }, [likeList, bookmarkList, resume.id])

  const clickLike = async (event: React.MouseEvent) => {
    event.preventDefault()
    try {
      const newIsLike = !isLike
      const newLikeCount = newIsLike ? likeCount + 1 : likeCount - 1

      // 낙관적 업데이트
      setIsLike(newIsLike)
      setLikeCount(newLikeCount)

      await likeMutation.mutateAsync({
        contentId: Number(resume.id),
        category: 'RESUME',
        likeStatus: newIsLike,
      })

      onLikeUpdate(resume.id, newLikeCount)
    } catch (err) {
      setIsLike(!isLike)
      setLikeCount(isLike ? likeCount : likeCount - 1)
      console.error(err)
    }
  }

  const clickBookmark = async (event: React.MouseEvent) => {
    event.preventDefault()
    try {
      const newIsBookmark = !isBookmark
      const newBookmarkCount = newIsBookmark
        ? bookmarkCount + 1
        : bookmarkCount - 1

      // 낙관적 업데이트
      setIsBookmark(newIsBookmark)
      setBookmarkCount(newBookmarkCount)

      await bookmarkMutation.mutateAsync({
        contentId: Number(resume.id),
        category: 'RESUME',
        bookmarkStatus: newIsBookmark,
      })

      onBookmarkUpdate(resume.id, newBookmarkCount)
    } catch (err) {
      setIsBookmark(!isBookmark)
      setBookmarkCount(isBookmark ? bookmarkCount : bookmarkCount - 1)
      console.error(err)
    }
  }

  if (!resume) {
    return (
      <EmptyAnimation
        text="이력서 데이터가 없습니다."
        text2="다시 조회해주세요"
      />
    ) // 로딩 중일 때나 resume이 없을 때 기본 UI
  }

  const formattedDate = new Date(resume.createdAt)
    .toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/\.$/, '')

  //이력서 타이틀 설정
  const resumeTitle = resume.title.split('-').slice(-1).join(' ')
  const truncatedTitle =
    resumeTitle.length > 16 ? resumeTitle.slice(0, 16) + '...' : resumeTitle

  return (
    <div className="flex flex-wrap gap-12">
      <Link
        key={resume.id}
        href={`/resume/${resume.id}`}
        className="flex flex-col w-[16.5rem] h-[10.25rem] gap-2 px-5 border-t-[0.4rem] border-darkgray shadow-lg"
      >
        {/** 이름/기수 */}
        <div className="flex flex-row justify-between mt-3 mx-1">
          <span className="font-semibold text-[1.25rem]">{truncatedTitle}</span>
        </div>
        <span className="flex w-[14rem] border-t border-darkgray"></span>
        {/** 포지션/경력 */}
        <div className="flex flex-row justify-between gap-1 mt-1 mb-6">
          <PositionTag position={resume.position} />
          {/* <CareerTag career={userPosition} /> */}
          <div className="flex gap-2">
            <span className="ml-2 text-[1rem]">{resume.user.name}</span>
            <span className="text-darkgray">{resume.user.year}기</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          {/** 날짜 */}
          <span className="ml-1 font-light text-[1rem]">{formattedDate}</span>
          {/* 북마크/좋아요 버튼 */}
          <div className="flex items-center gap-1">
            {/* 북마크 */}
            <button type="button" onClick={clickBookmark}>
              {isBookmark ? (
                <Image
                  src="/images/bookmark-on.svg"
                  alt="like-on"
                  width={18}
                  height={18}
                />
              ) : (
                <Image
                  src="/images/bookmark-off.svg"
                  alt="like-off"
                  width={18}
                  height={18}
                />
              )}
            </button>
            {/* 좋아요 */}
            <button type="button" onClick={clickLike}>
              {isLike ? (
                <Image
                  src="/images/like-on.svg"
                  alt="like-on"
                  width={18}
                  height={18}
                />
              ) : (
                <Image
                  src="/images/like-off.svg"
                  alt="like-off"
                  width={18}
                  height={18}
                />
              )}
            </button>
            <span className="font-light text-[1rem]">{likeCount}</span>
          </div>
        </div>
      </Link>
    </div>
  )
}
