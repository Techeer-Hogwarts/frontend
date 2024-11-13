'use client'

import React, { useState } from 'react'
import ExperienceBtn from '../common/ExperienceBtn'

interface ExperienceItemProps {
  onDelete?: () => void
  btnPadding: string
}

const ExperienceItem: React.FC<ExperienceItemProps> = ({
  btnPadding,
  onDelete,
}) => {
  const [companyName, setCompanyName] = useState('')
  const [duration, setDuration] = useState('')
  const [selectedPosition, setSelectedPosition] = useState<string[]>([])
  const [isCurrentJob, setIsCurrentJob] = useState(false)

  // 고정된 포지션 리스트
  const positions = [
    'Frontend',
    'Backend',
    'DevOps',
    'Full-Stack',
    'Data Engineer',
  ]

  const handlePositionClick = (position: string) => {
    setSelectedPosition((prevSelected) => {
      if (prevSelected.includes(position)) {
        return prevSelected.filter((item) => item !== position)
      } else {
        // 포지션 최대 2개까지 선택 가능
        if (prevSelected.length < 2) {
          return [...prevSelected, position]
        } else {
          return prevSelected
        }
      }
    })
  }

  return (
    <div className="relative p-4 bg-[#F8F8F8] rounded-md mt-4">
      {/* X 버튼 */}
      <button
        onClick={onDelete}
        className="absolute top-0 right-2 text-gray hover:text-primary focus:outline-none text-lg"
      >
        ×
      </button>

      <div className="flex justify-between items-center text-sm">
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="회사명을 입력해주세요"
          className="w-3/5 h-9 px-4 py-2 border border-gray rounded-md focus:outline-none focus:border-primary"
        />
        <input
          type="text"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="YYYY.MM - YYYY.MM"
          className="h-9 py-2 text-right bg-[#F8F8F8] focus:outline-none"
        />
      </div>

      <div className="flex items-center justify-end">
        <input
          type="checkbox"
          checked={isCurrentJob}
          onChange={() => setIsCurrentJob(!isCurrentJob)}
          className="w-4 h-4 mr-2 border border-gray appearance-none rounded flex items-center justify-center checked:bg-[#FF7816] checked:border-[#FF7816] cursor-pointer checked:before:content-['✓'] checked:before:text-white checked:before:text-xs checked:before:flex checked:before:items-center checked:before:justify-center"
        />
        <label className="text-xs text-gray my-2">재직중</label>
      </div>

      <div className="flex justify-between text-pink text-xs">
        {positions.map((position, index) => (
          <ExperienceBtn
            key={index}
            position={position}
            handlePositionClick={handlePositionClick}
            btnPadding={btnPadding}
            selectedPosition={selectedPosition}
          />
        ))}
      </div>
    </div>
  )
}

export default ExperienceItem
