'use client'

import React, { useState, useEffect } from 'react'
import ExperienceBtn from '../common/ExperienceBtn'

export interface Experience {
  id?: number
  companyName: string
  position: string
  startDate: string
  endDate: string | null
  category: string
  isFinished?: boolean
  isCurrentJob?: boolean
}

export interface ExperienceItemProps {
  data: Experience
  onDelete?: () => void
  onChange: (updated: Experience) => void
  experienceType: '인턴' | '정규직'
  btnPadding: string
}

export default function ExperienceItem({
  data,
  onDelete,
  onChange,
  experienceType,
  btnPadding,
}: ExperienceItemProps) {
  // 날짜 문자열을 "YYYY-MM-DD"로 변환
  const convertDate = (rawDate: string): string => {
    if (!rawDate) return ''
    const date = new Date(rawDate)
    if (isNaN(date.getTime())) return ''
    return date.toISOString().substring(0, 10)
  }

  // 상태 초기화
  const [companyName, setCompanyName] = useState(data.companyName || '')
  const [startDate, setStartDate] = useState(() =>
    convertDate(data.startDate || ''),
  )
  const [endDate, setEndDate] = useState(() => convertDate(data.endDate || ''))
  // endDate가 없으면 현재 재직중
  const [isCurrentJob, setIsCurrentJob] = useState(
    !data.endDate || data.endDate === '' ? true : false,
  )
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

  // 상태 변경 시, 상위로 업데이트
  useEffect(() => {
    const updated: Experience = {
      ...data, // 기존 데이터(id 포함)
      companyName,
      startDate,
      endDate: isCurrentJob ? '' : endDate,
      position,
      category: experienceType, // "인턴" or "정규직"
    }
    onChange(updated)
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
          className="w-3/5 h-9 px-4 border border-gray rounded-md focus:outline-none focus:border-primary"
        />

        <div className="flex justify-between items-center text-sm mt-2">
          {/* 시작일 */}
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(convertDate(e.target.value))}
            className="w-[48%] h-9 px-4 border border-gray rounded-md focus:outline-none focus:border-primary"
          />

          {/* 종료일 or 현재 재직중 */}
          {isCurrentJob ? (
            <div className="w-[48%] h-9 px-4 border border-gray rounded-md bg-gray-100 flex items-center justify-center text-gray-400">
              현재 재직중
            </div>
          ) : (
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(convertDate(e.target.value))}
              className="w-[48%] h-9 px-4 border border-gray rounded-md focus:outline-none focus:border-primary"
            />
          )}
        </div>

        {/* 재직중 체크 */}
        <div className="flex items-center mt-2">
          <input
            type="checkbox"
            checked={isCurrentJob}
            onChange={() => setIsCurrentJob(!isCurrentJob)}
            className="w-4 h-4 mr-2 border border-gray rounded"
          />
          <label className="text-xs text-gray">재직중</label>
        </div>

        {/* 포지션 버튼 */}
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
