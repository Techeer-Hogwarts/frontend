'use client'

import React, { useState } from 'react'
import ProgressBar from './ProgressBar'
import { SlArrowUp, SlArrowDown } from 'react-icons/sl'
import { useQuery } from '@tanstack/react-query'
import { getBlogChallengeAttendanceAPI } from '@/api/blog/blog'

const initialDisplayCount = 6

type UserProgress = {
  userId: number
  userName: string
  sequence: number[]
  totalCount?: number
}

interface ParticipantProgressListProps {
  selectedTermId?: number | null
  onApplyClick?: () => Promise<void>
}

export default function ParticipantProgressList({
  selectedTermId,
  onApplyClick,
}: ParticipantProgressListProps) {
  const [displayCount, setDisplayCount] = useState(initialDisplayCount)
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded)
    if (isExpanded) {
      setDisplayCount(initialDisplayCount)
    } else {
      setDisplayCount(userProgressList?.length || 0)
    }
  }

  const {
    data: userProgressList = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['attendance', selectedTermId],
    queryFn: () => getBlogChallengeAttendanceAPI(selectedTermId),
  })

  if (isLoading) {
    return (
      <div className="w-[1200px] mx-auto mt-5 rounded-xl border border-gray shadow-sm py-8">
        <div className="text-center text-gray">로딩 중...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-[1200px] mx-auto mt-5 rounded-xl border border-gray shadow-sm py-8">
        <div className="text-center text-gray">
          {error instanceof Error
            ? error.message
            : '참여 현황을 불러오는데 실패했습니다'}
        </div>
      </div>
    )
  }

  return (
    <div className="w-[1200px] mx-auto mt-5 rounded-xl border border-gray shadow-sm py-8">
      {!userProgressList || userProgressList.length === 0 ? (
        <div className="text-center text-gray">참여자가 없습니다</div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 px-3">
            {userProgressList.slice(0, displayCount).map((user) => (
              <div key={user.userId}>
                <ProgressBar
                  userName={user.userName}
                  sequence={user.sequence}
                />
              </div>
            ))}
          </div>

          {userProgressList &&
            userProgressList.length > initialDisplayCount && (
              <div className="text-center mt-6">
                <button
                  onClick={toggleExpansion}
                  className="text-gray hover:text-[#FE9142] pt-2"
                  aria-expanded={isExpanded}
                  aria-controls="progress-list"
                >
                  {isExpanded ? (
                    <>
                      <SlArrowUp className="inline-block mr-1" />
                      <span>접기</span>
                    </>
                  ) : (
                    <>
                      <SlArrowDown className="inline-block mr-1" />
                      <span>
                        더 보기 ({userProgressList.length - initialDisplayCount}
                        명)
                      </span>
                    </>
                  )}
                </button>
              </div>
            )}
        </>
      )}
    </div>
  )
}
