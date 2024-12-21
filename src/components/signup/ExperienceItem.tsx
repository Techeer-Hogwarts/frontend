'use client'

import React, { useState, useEffect } from 'react'

interface ExperienceItemProps {
  index: number
  data: any
  onDelete?: () => void
  onChange: (data: any) => void
  experienceType: 'intern' | 'fullTime'
}

const ExperienceItem: React.FC<ExperienceItemProps> = ({
  index,
  data,
  onDelete,
  onChange,
  experienceType,
}) => {
  const [companyName, setCompanyName] = useState(data.companyName || '')
  const [duration, setDuration] = useState(data.duration || '')
  const [startDate, setStartDate] = useState(data.startDate || '')
  const [endDate, setEndDate] = useState(data.endDate || '')
  const [isCurrentJob, setIsCurrentJob] = useState(data.isCurrentJob || false)
  const [selectedPosition, setSelectedPosition] = useState<string[]>(
    data.selectedPosition || [],
  )

  // 포지션 리스트
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

  // 데이터 변경 시 상위 컴포넌트로 전달
  useEffect(() => {
    if (experienceType === 'intern') {
      onChange({
        internCompanyName: companyName,
        internPositions: selectedPosition, // 수정된 부분: 포지션 배열로 전달
        internStartDate: startDate,
        internEndDate: isCurrentJob ? '' : endDate,
        isCurrentJob,
      })
    } else {
      onChange({
        fullTimeCompanyName: companyName,
        fullTimePositions: selectedPosition, // 수정된 부분: 포지션 배열로 전달
        fullTimeStartDate: startDate,
        fullTimeEndDate: isCurrentJob ? '' : endDate,
        isCurrentJob,
      })
    }
  }, [
    companyName,
    selectedPosition,
    startDate,
    endDate,
    isCurrentJob,
    onChange,
    experienceType,
  ])

  return (
    <div className="relative p-4 bg-filterbg rounded-md mt-4">
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
      </div>

      {/* 기간 선택 */}
      <div className="flex justify-between items-center text-sm mt-2">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-[48%] h-9 px-4 py-2 border border-gray rounded-md focus:outline-none focus:border-primary"
        />

        {isCurrentJob ? (
          <div className="w-[48%] h-9 px-4 border border-gray rounded-md bg-gray-100 flex items-center justify-center text-gray-400 select-none">
            현재 재직중
          </div>
        ) : (
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-[48%] h-9 px-4 py-2 border border-gray rounded-md focus:outline-none focus:border-primary"
            disabled={isCurrentJob}
          />
        )}
      </div>

      <div className="flex items-center mt-2">
        <input
          type="checkbox"
          checked={isCurrentJob}
          onChange={() => setIsCurrentJob(!isCurrentJob)}
          className="w-4 h-4 mr-2 border border-gray appearance-none rounded flex items-center justify-center checked:bg-[#FF7816] checked:border-[#FF7816] cursor-pointer checked:before:content-['✓'] checked:before:text-white checked:before:text-xs checked:before:flex checked:before:items-center checked:before:justify-center"
        />
        <label className="text-xs text-gray my-2">재직중</label>
      </div>

      {/* 포지션 선택 */}
      <div className="flex justify-between text-pink text-xs mt-2">
        {positions.map((position, index) => (
          <button
            key={index}
            type="button"
            onClick={() => handlePositionClick(position)}
            className={`px-3.5 py-2 rounded-md border border-lightprimary  ${
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

export default ExperienceItem
