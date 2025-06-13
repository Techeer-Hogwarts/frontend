'use client'

import React from 'react'
import ExperienceBtn from '../common/ExperienceBtn'

export interface Experience {
  experienceId?: number
  companyName: string
  position: string
  startDate: string
  endDate: string | null
  category?: string
  finished?: boolean
  description?: string
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
  // 날짜 문자열을 "YYYY-MM-DD"로 맞춰주는 헬퍼 함수
  const convertDate = (rawDate: string | null): string => {
    if (!rawDate) return ''
    const d = new Date(rawDate)
    if (Number.isNaN(d.getTime())) return ''
    return d.toISOString().substring(0, 10)
  }

  const handleCompanyNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...data,
      companyName: e.target.value,
    })
  }

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...data,
      startDate: e.target.value,
    })
  }

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...data,
      endDate: e.target.value,
    })
  }

  // 재직중 체크박스 토글
  const handleIsFinishedToggle = () => {
    const newIsFinished = !data.finished
    // 만약 새로 토글 후 재직중(false)이 되면 endDate=null 처리
    const newEndDate = newIsFinished ? data.endDate : null

    onChange({
      ...data,
      finished: newIsFinished,
      endDate: newEndDate,
    })
  }

  const handlePositionClick = (pos: string) => {
    onChange({
      ...data,
      position: pos,
    })
  }
  const isWorking = !data.finished

  return (
    <div className="relative p-4 bg-filterbg rounded-md mt-4">
      {/* 삭제 버튼 */}
      <button
        onClick={onDelete}
        className="absolute top-0 right-4 text-gray hover:text-primary focus:outline-none text-lg"
      >
        ×
      </button>
      
      <div className="flex flex-col space-y-2">
        <div className='flex justify-between items-center'>
            {/* 회사명 */}
            <input
              type="text"
              value={data.companyName}
              onChange={handleCompanyNameChange}
              placeholder="회사명을 입력해주세요"
              className="w-3/5 h-9 px-4 border border-gray rounded-md focus:outline-none focus:border-primary"
            />

            {/* 재직중 체크박스 */}
            <div className="flex items-end mr-4">
              <input
                type="checkbox"
                checked={isWorking}
                onChange={handleIsFinishedToggle}
                className="w-4 h-4 mr-1 border border-gray rounded"
              />
              <label className="text-xs text-gray">재직중이신가요?</label>
            </div>
        </div>

        {/* 날짜 입력 (시작일/종료일) */}
        <div className="flex justify-between items-center space-x-2 text-sm mt-3">
          {/* 시작일 */}
          <input
            type="date"
            value={convertDate(data.startDate)}
            onChange={handleStartDateChange}
            className="w-full h-9 px-4 border border-gray rounded-md focus:outline-none focus:border-primary"
          />

          {/* 종료일 or "현재 재직중" */}
          {isWorking ? (
            <div className="w-full h-9 px-4 border border-gray rounded-md bg-gray-100 flex items-center justify-center text-gray-400">
              현재 재직중
            </div>
          ) : (
            <input
              type="date"
              value={convertDate(data.endDate)}
              onChange={handleEndDateChange}
              className="w-full h-9 px-4 border border-gray rounded-md focus:outline-none focus:border-primary"
            />
          )}
        </div>

        {/* 포지션 버튼들 */}
        <div className="flex justify-center flex-wrap gap-2 text-pink text-[12px] mt-5">
          {['FRONTEND', 'BACKEND', 'DEVOPS', 'FULL_STACK', 'DATA_ENGINEER'].map(
            (pos) => (
              <ExperienceBtn
                key={pos}
                position={pos}
                handlePositionClick={handlePositionClick}
                btnPadding={btnPadding}
                selectedPosition={[data.position]}
              />
            ),
          )}
        </div>

        <div className='flex mt-3'>
          <textarea
            onChange={(e) =>
              onChange({
                ...data,
                description: e.target.value,
              })
            }
            placeholder='회사에서 자신의 기여에 대해 간단하게 적어주세요.(선택)'
            value={data.description || ''}
            className='w-full min-h-[110px] max-h-[110px] background-transparent border border-gray rounded-md py-2 px-3 focus:outline-none focus:border-primary resize-none'>

          </textarea>

        </div>
      </div>
    </div>
  )
}
