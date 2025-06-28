'use client'

import React, { useEffect, useState } from 'react'
import ProgressBar from './ProgressBar'
import { SlArrowUp, SlArrowDown } from 'react-icons/sl'
import { getBlogChallengeAttendanceAPI } from '@/api/blog/blog'

const initialDisplayCount = 6

type UserProgress = {
  userId: number
  userName: string
  sequence: number[]
  totalCount?: number
}

export default function ParticipantProgressList() {
  const [userProgressList, setUserProgressList] = useState<UserProgress[]>([])
  const [displayCount, setDisplayCount] = useState(initialDisplayCount)
  const [isExpanded, setIsExpanded] = useState(false)
  const toggleExpansion = () => {
    setIsExpanded(!isExpanded)
    if (isExpanded) {
      setDisplayCount(initialDisplayCount)
    } else {
      setDisplayCount(userProgressList.length)
    }
  }

  useEffect(() => {
    getBlogChallengeAttendanceAPI().then((data) => {
      setUserProgressList(data)
    })
  }, [])

  return (
    <div className="w-[1000px] mx-auto mt-5 rounded-xl border border-gray shadow-sm pt-5 pb-6">
      <p className="font-semibold text-center text-xl mb-6 text-[#FE9142]">
        블로깅 챌린지 참여 현황
      </p>
      <div className="grid grid-cols-2 gap-4 px-3">
        {userProgressList.slice(0, displayCount).map((user) => (
          <div key={user.userId}>
            <ProgressBar userName={user.userName} sequence={user.sequence} />
          </div>
        ))}
      </div>

      {userProgressList.length > initialDisplayCount && (
        <div className="text-center mt-6">
          <button
            onClick={toggleExpansion}
            className="text-gray-500 hover:text-[#FE9142] pt-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
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
                  더 보기 ({userProgressList.length - initialDisplayCount}명)
                </span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  )
}
