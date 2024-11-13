'use client'

import React, { useState } from 'react'

interface MyExperienceItemProps {
  onDelete: () => void
}

export default function MyExperienceItem({ onDelete }: MyExperienceItemProps) {
  const [companyName, setCompanyName] = useState('')
  const [duration, setDuration] = useState('')
  const [selectedPosition, setSelectedPosition] = useState<string[]>([])
  const [isCurrentJob, setIsCurrentJob] = useState(false)
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
        <span className="text-xs text-gray my-2">재직중</span>
      </div>

      <div className="flex justify-start gap-5 text-pink text-xs">
        {positions.map((position, i) => (
          <button
            key={i}
            type="button"
            onClick={() => handlePositionClick(position)}
            className={`px-6 py-3 rounded-md border border-lightprimary  ${
              selectedPosition.includes(position)
                ? 'bg-lightprimary'
                : 'bg-white'
            }`}
          >
            {position}
          </button>
        ))}
      </div>
    </div>
  )
}
