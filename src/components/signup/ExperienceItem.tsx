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
  // ISO 형식 날짜 문자열을 "YYYY-MM-DD" 형식으로 변환하는 함수
  const convertDate = (rawDate: string): string => {
    if (!rawDate) return ''
    const date = new Date(rawDate)
    if (isNaN(date.getTime())) return ''
    return date.toISOString().substring(0, 10)
  }

  // 공통 키 사용: 모든 경험 항목은 동일한 필드로 관리합니다.
  const [companyName, setCompanyName] = useState(data.companyName || '')
  const [startDate, setStartDate] = useState(() =>
    convertDate(data.startDate || ''),
  )
  const [endDate, setEndDate] = useState(() => convertDate(data.endDate || ''))
  // endDate가 없으면 현재 재직중으로 간주
  const [isCurrentJob, setIsCurrentJob] = useState(
    data.endDate === null || data.endDate === '' ? true : false,
  )
  // 단일 포지션 사용
  const [position, setPosition] = useState(data.position || '')

  const positions = [
    'FRONTEND',
    'BACKEND',
    'DEVOPS',
    'FULL_STACK',
    'DATA_ENGINEER',
  ]

  const handlePositionClick = (pos: string) => {
    setPosition(pos)
  }

  // 상태 변경 시 부모에 업데이트된 데이터를 전달합니다.
  useEffect(() => {
    const updatedData = {
      companyName,
      startDate,
      endDate: isCurrentJob ? '' : endDate,
      position,
      category: experienceType, // "인턴" 또는 "정규직"
      isCurrentJob,
    }
    onChange(updatedData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyName, startDate, endDate, isCurrentJob, position, experienceType])

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
          {positions.map((pos, idx) => (
            <ExperienceBtn
              key={idx}
              position={pos}
              handlePositionClick={handlePositionClick}
              btnPadding={btnPadding}
              selectedPosition={[position]}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ExperienceItem
