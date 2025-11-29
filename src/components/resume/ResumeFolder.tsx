'use client'
import PositionTag from '../common/PositionTag'
import Link from 'next/link'
import Image from 'next/image'
import EmptyAnimation from '../common/EmptyAnimation'
import { useResumeLikeBookmark } from '@/hooks/resume/useResumeLikeBookmark'

interface ResumeProps {
  likeCount: number
  resume: Resume
  likeList: string[]
  onLikeUpdate: (resumeId: string, newLikeCount: number) => void
  bookmarkList: string[]
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
  const { isLike, isBookmark, likeCount, clickLike, clickBookmark } =
    useResumeLikeBookmark(
      resume,
      initialLikeCount,
      likeList,
      bookmarkList,
      onLikeUpdate,
      onBookmarkUpdate,
    )

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

  return (
    <div className="flex flex-wrap gap-12">
      <Link
        key={resume.id}
        href={`/resume/${resume.id}`}
        className="flex flex-col w-[16.5rem] h-[10.25rem] gap-2 px-5 border-t-[0.4rem] border-darkgray shadow-lg"
      >
        {/** 이름/기수 */}
        <div className="flex flex-row justify-between mt-3 mx-1">
          <span className="font-semibold text-[1.25rem] w-full truncate">
            {resume.title}
          </span>
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
