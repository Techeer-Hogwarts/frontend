'use client'
import { useEffect, useState } from 'react'
import CareerTag from '../common/CareerTag'
import PositionTag from '../common/PositionTag'
import Link from 'next/link'
import Image from 'next/image'
import { handleLikeClick } from '@/app/resume/api/like'
import { handleBookmarkClick } from '@/app/resume/api/bookmarks'
import EmptyLottie from '../common/EmptyLottie'

interface ResumeProps {
  resume: {
    id: number
    createdAt: number
    title: string
    category: string
    position: string
    likeCount: number
    year: string
    user: {
      id: number
      name: string
      profileImage: string
      year: number
      mainPosition: string
    }
  }
}
export default function ResumeFolder({ resume }: ResumeProps) {
  // 로컬스토리지에서 좋아요, 북마크 상태 불러오기
  const [likes, setLikes] = useState<{
    [key: number]: { count: number; isLiked: boolean }
  }>({
    [resume.id]: { count: resume.likeCount, isLiked: false },
  })

  const [bookmarks, setBookmarks] = useState<{
    [key: number]: { count: number; isMarked: boolean }
  }>({
    [resume.id]: { count: 0, isMarked: false },
  })

  useEffect(() => {
    const storedLikes = JSON.parse(localStorage.getItem('likes') || '{}')
    setLikes(storedLikes)

    const storedBookmarks = JSON.parse(
      localStorage.getItem('bookmarks') || '{}',
    )
    setBookmarks(storedBookmarks)
  }, [])

  // resume이 undefined일 경우 기본값을 설정합니다.
  if (!resume) {
    return (
      <EmptyLottie text="이력서 데이터가 없습니다." text2="다시 조회해주세요" />
    ) // 로딩 중일 때나 resume이 없을 때 기본 UI
  }

  // 좋아요 상태를 localStorage에 저장하는 함수
  const saveLikesToLocalStorage = (updatedLikes: any) => {
    localStorage.setItem('likes', JSON.stringify(updatedLikes))
  }

  // 북마크 상태를 로컬스토리지에 저장하는 함수
  const saveBookmarksToLocalStorage = (updatedBookmarks: any) => {
    localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks))
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
            <button
              type="button"
              onClick={(event) => {
                event.preventDefault() // 페이지 이동 방지
                handleBookmarkClick(
                  resume.id,
                  'RESUME',
                  bookmarks,
                  setBookmarks,
                ).then(() => {
                  saveBookmarksToLocalStorage(bookmarks)
                })
              }}
            >
              <Image
                src={
                  bookmarks[resume.id]?.isMarked
                    ? '/images/bookmark-on.svg'
                    : '/images/bookmark-off.svg'
                }
                alt="bookmark"
                width={18}
                height={18}
              />
            </button>
            {/* 좋아요 */}
            <button
              type="button"
              onClick={(event) => {
                event.preventDefault() // 페이지 이동 방지
                handleLikeClick(resume.id, 'RESUME', likes, setLikes).then(
                  () => {
                    saveLikesToLocalStorage(likes)
                  },
                )
              }}
            >
              <Image
                src={
                  likes[resume.id]?.isLiked
                    ? '/images/like-on.svg'
                    : '/images/like-off.svg'
                }
                alt="like"
                width={18}
                height={18}
              />
            </button>
            {/* <span className="font-light text-[1rem]">
              {likes[resume.id]?.count}
            </span> */}
          </div>
        </div>
      </Link>
    </div>
  )
}
