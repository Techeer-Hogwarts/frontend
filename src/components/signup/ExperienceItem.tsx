'use client'

import React, { useState, useEffect } from 'react'
import ExperienceBtn from '../common/ExperienceBtn'

export interface ExperienceItemProps {
  index: number
  data: any
  onDelete?: () => void
  onChange: (data: any) => void
  experienceType: '인턴' | '정규직'
  btnPadding: string
}

const ExperienceItem: React.FC<ExperienceItemProps> = ({
  btnPadding,
  index,
  data,
  onDelete,
  onChange,
  experienceType,
}) => {
  // ISO 형식 날짜 문자열을 "YYYY-MM-DD"로 변환하는 함수
  const convertDate = (rawDate: string): string => {
    if (!rawDate) return ''
    const date = new Date(rawDate)
    if (isNaN(date.getTime())) return ''
    return date.toISOString().substring(0, 10)
  }

  // 초기 상태 설정: 날짜는 변환해서 사용
  const [companyName, setCompanyName] = useState(data.companyName || '')
  const [startDate, setStartDate] = useState(() => {
    const raw =
      data.internStartDate || data.fullTimeStartDate || data.startDate || ''
    return convertDate(raw)
  })
  const [endDate, setEndDate] = useState(() => {
    const raw = data.internEndDate || data.fullTimeEndDate || data.endDate || ''
    return convertDate(raw)
  })
  // endDate가 null이면 현재 재직중으로 판단
  const [isCurrentJob, setIsCurrentJob] = useState(
    data.endDate === null ? true : data.isCurrentJob || false,
  )
  // 포지션 배열: API에서 여러 포지션이 전달되었을 경우 사용; 없으면 단일 값을 배열로 만듭니다.
  const [selectedPosition, setSelectedPosition] = useState<string[]>(
    data.internPositions ||
      data.fullTimePositions ||
      (data.position ? [data.position] : []),
  )

  const positions = [
    'FRONTEND',
    'BACKEND',
    'DEVOPS',
    'FULL-STACK',
    'DATA ENGINEER',
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

  // onChange 호출: 입력값 변경 시 부모로 업데이트된 데이터를 전달합니다.
  // onChange prop은 의존성 배열에서 제외하여 무한 업데이트를 방지합니다.
  useEffect(() => {
    const updatedData =
      experienceType === '인턴'
        ? {
            internCompanyName: companyName,
            internPositions: selectedPosition,
            internStartDate: startDate,
            internEndDate: isCurrentJob ? '' : endDate,
            isCurrentJob,
          }
        : {
            fullTimeCompanyName: companyName,
            fullTimePositions: selectedPosition,
            fullTimeStartDate: startDate,
            fullTimeEndDate: isCurrentJob ? '' : endDate,
            isCurrentJob,
          }
    onChange(updatedData)
  }, [
    companyName,
    selectedPosition,
    startDate,
    endDate,
    isCurrentJob,
    experienceType,
    // onChange는 제외
  ])

  return (
    <div className="relative p-4 bg-filterbg rounded-md mt-4">
      {/* 삭제 버튼 */}
      <button
        onClick={onDelete}
        className="absolute top-0 right-2 text-gray hover:text-primary focus:outline-none text-lg"
      >
        ×
      </button>

      <div className="flex flex-col space-y-2">
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="회사명을 입력해주세요"
          className="w-3/5 h-9 px-4 py-2 border border-gray rounded-md focus:outline-none focus:border-primary"
        />
        <div className="flex justify-between items-center text-sm mt-2">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(convertDate(e.target.value))}
            className="w-[48%] h-9 px-4 py-2 border border-gray rounded-md focus:outline-none focus:border-primary"
          />
          {isCurrentJob ? (
            <div className="w-[48%] h-9 px-4 py-2 border border-gray rounded-md bg-gray-100 flex items-center justify-center text-gray-400">
              현재 재직중
            </div>
          ) : (
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(convertDate(e.target.value))}
              className="w-[48%] h-9 px-4 py-2 border border-gray rounded-md focus:outline-none focus:border-primary"
            />
          )}
        </div>
        <div className="flex items-center mt-2">
          <input
            type="checkbox"
            checked={isCurrentJob}
            onChange={() => setIsCurrentJob(!isCurrentJob)}
            className="w-4 h-4 mr-2 border border-gray rounded"
          />
          <label className="text-xs text-gray">재직중</label>
        </div>
        <div className="flex justify-between text-pink text-[10px] mt-2">
          {positions.map((position, idx) => (
            <ExperienceBtn
              key={idx}
              position={position}
              handlePositionClick={handlePositionClick}
              btnPadding={btnPadding}
              selectedPosition={selectedPosition}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ExperienceItem
