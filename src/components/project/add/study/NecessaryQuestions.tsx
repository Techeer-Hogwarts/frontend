'use client'

import { useState } from 'react'

export default function NecessaryQuestions({ isFinished, onUpdate }) {
  const handleProjectStatusChange = (status) => {
    onUpdate('isFinished', status === '완료')
  }

  return (
    <div className="flex flex-col w-full gap-6">
      {/* 프로젝트 진행 여부 */}
      <div className="flex justify-between items-center">
        <p className="font-medium text-gray">
          스터디 진행 여부<span className="text-primary">*</span>
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => handleProjectStatusChange('진행중')}
            className={`w-[10.875rem] h-[2.125rem] border ${
              !isFinished
                ? 'border-primary  text-primary'
                : 'border-gray text-gray'
            } rounded-[0.1875rem]`}
          >
            진행중
          </button>
          <button
            onClick={() => handleProjectStatusChange('완료')}
            className={`w-[10.875rem] h-[2.125rem] border ${
              isFinished
                ? 'border-primary  text-primary'
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
