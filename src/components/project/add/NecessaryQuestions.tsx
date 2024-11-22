'use client'

import { useState } from 'react'

export default function NecessaryQuestions() {
  const [projectStatus, setProjectStatus] = useState('진행중') // 기본 값: 진행중
  const [recruitStatus, setRecruitStatus] = useState('모집') // 기본 값: 모집

  return (
    <div className="flex flex-col w-full gap-6">
      {/* 프로젝트 진행 여부 */}
      <div className="flex justify-between items-center">
        <p className="font-medium text-gray">
          프로젝트 진행 여부<span className="text-primary">*</span>
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setProjectStatus('진행중')}
            className={`w-[10.875rem] h-[2.125rem] border ${
              projectStatus === '진행중'
                ? 'border-primary  text-primary'
                : 'border-gray text-gray'
            } rounded-[0.1875rem]`}
          >
            진행중
          </button>
          <button
            onClick={() => setProjectStatus('완료')}
            className={`w-[10.875rem] h-[2.125rem] border ${
              projectStatus === '완료'
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
