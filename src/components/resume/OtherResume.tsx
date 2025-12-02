'use client'

import Image from 'next/image'
import CareerTag from '../common/CareerTag'
import PositionTag from '../common/PositionTag'
import { useUserResumeListQuery } from '@/api/resume/queries'
import { useRouter } from 'next/navigation'

interface Resume {
  id: number
  createdAt: number
  title: string
  position: string
  year: number
}

interface OtherResumeProps {
  id: number
  offset: number
  limit: number
}

export default function OtherResume({ id, offset, limit }: OtherResumeProps) {
  const router = useRouter()

  // 사용자 이력서 목록 조회
  const { data, isLoading, isError } = useUserResumeListQuery(id, limit)

  const handleResumeClick = (resumeId: number) => {
    router.push(`/resume/${resumeId}`)
  }

  // 모든 페이지의 데이터를 평탄화하여 첫 번째 페이지만 사용
  const otherData = data?.pages[0]?.data ?? []

  if (isLoading) {
    return (
      <div className="flex flex-col w-[14.5rem] h-auto rounded-xl shadow-md mt-1">
        <div className="p-4 text-center text-gray">로딩 중...</div>
      </div>
    )
  }

  if (isError || otherData.length === 0) {
    return (
      <div className="flex flex-col w-[14.5rem] h-auto rounded-xl shadow-md mt-1">
        <div className="p-4 text-center text-gray">이력서가 없습니다.</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col w-[14.5rem] h-auto rounded-xl shadow-md mt-1">
      {otherData.map((user) => {
        const resumeTitle = user.title.split('-').slice(-1).join(' ')
        const truncatedTitle =
          resumeTitle.length > 14
            ? resumeTitle.slice(0, 14) + '...'
            : resumeTitle

        const formattedDate = new Date(user.createdAt)
          .toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })
          .replace(/\.$/, '')

        return (
          <button
            key={user.id}
            onClick={() => handleResumeClick(user.id)}
            className="flex justify-left items-center py-3 pl-3 gap-2 hover:bg-lightprimary"
            role="button"
            tabIndex={0}
          >
            <Image
              src="/file.png"
              width={30}
              height={30}
              alt="file"
              style={{ width: '40px', height: '40px', objectFit: 'contain' }}
            />
            <div className="flex flex-col items-start gap-1">
              <span className="font-medium text-[1rem]">{truncatedTitle}</span>
              <div className="flex justify-between gap-2">
                <PositionTag position={user.position} />
                <span className="font-light text-[0.8rem]">
                  {formattedDate}
                </span>
              </div>
            </div>
          </button>
        )
      })}
    </div>
  )
}
