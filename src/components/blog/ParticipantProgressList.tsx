'use client'

import React, { useState } from 'react'
import ProgressBar from './ProgressBar'
import { SlArrowUp, SlArrowDown } from 'react-icons/sl'

export default function ParticipantProgressList() {
  const allUsersProgress = [
    {
      id: 101,
      userName: '홍길동',
      sequence: [1, 2, 3, 0, 0, 1, 0, 0, 0, 0, 1, 1],
    },
    {
      id: 102,
      userName: '김영희',
      sequence: [1, 0, 1, 0, 1, 0, 1, 0, 2, 3, 0, 1],
    },
    {
      id: 103,
      userName: '김철수',
      sequence: [3, 1, 1, 2, 0, 0, 1, 0, 0, 0, 0, 0],
    },
    {
      id: 104,
      userName: '박지민',
      sequence: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    },
    {
      id: 105,
      userName: '최수진',
      sequence: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      id: 106,
      userName: '이동건',
      sequence: [1, 2, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0],
    },
    {
      id: 107,
      userName: '정미소',
      sequence: [3, 3, 3, 2, 2, 1, 1, 1, 0, 0, 0, 0],
    },
    {
      id: 108,
      userName: '하준영',
      sequence: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    },
  ]

  const initialDisplayCount = 6
  const [displayCount, setDisplayCount] = useState(initialDisplayCount)
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded)
    if (isExpanded) {
      setDisplayCount(initialDisplayCount)
    } else {
      setDisplayCount(allUsersProgress.length)
    }
  }

  return (
    <div className="w-[1000px] mx-auto mt-5 rounded-xl border border-gray shadow-sm pt-5 pb-6">
      <p className="font-semibold text-center text-xl mb-6 text-[#FE9142]">
        블로깅 챌린지 참여 현황
      </p>
      <div className="grid grid-cols-2 gap-4 px-3">
        {allUsersProgress.slice(0, displayCount).map((user) => (
          <div key={user.id}>
            <ProgressBar userName={user.userName} sequence={user.sequence} />
          </div>
        ))}
      </div>

      {allUsersProgress.length > initialDisplayCount && (
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
                  더 보기 ({allUsersProgress.length - initialDisplayCount}명)
                </span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  )
}
