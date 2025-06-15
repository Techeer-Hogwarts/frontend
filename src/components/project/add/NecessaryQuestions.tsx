'use client'

import React from 'react'

interface NecessaryQuestionsProps {
  /** 'project' 또는 'study' 중 어떤 용도인지 */
  variant: 'project' | 'study'
  /** 완료 여부 */
  isFinished: boolean
  /** 상태 변경 콜백 */
  onUpdate: (key: string, value: any) => void
}

export default function NecessaryQuestions({
  variant,
  isFinished,
  onUpdate,
}: NecessaryQuestionsProps) {
  const handleStatusChange = (status: '진행중' | '완료') => {
    onUpdate('isFinished', status === '완료')
  }

  const label =
    variant === 'project' ? '프로젝트 진행 여부' : '스터디 진행 여부'

  return (
    <div className="flex flex-col w-full gap-6">
      <div className="flex justify-between items-center">
        <p className="font-medium text-gray">
          {label}
          <span className="text-primary">*</span>
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => handleStatusChange('진행중')}
            className={`w-[10.875rem] h-[2.125rem] border ${
              !isFinished
                ? 'border-primary text-primary'
                : 'border-gray text-gray'
            } rounded-[0.1875rem]`}
          >
            진행중
          </button>
          <button
            onClick={() => handleStatusChange('완료')}
            className={`w-[10.875rem] h-[2.125rem] border ${
              isFinished
                ? 'border-primary text-primary'
                : 'border-gray text-gray'
            } rounded-[0.1875rem]`}
          >
            완료
          </button>
        </div>
      </div>
    </div>
  )
}
