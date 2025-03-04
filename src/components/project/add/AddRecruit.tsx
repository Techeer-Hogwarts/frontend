'use client'

import { useEffect, useState } from 'react'

import RecruitInput from '../modal/RecruitInput'

interface AddRecruitProps {
  isRecruited: boolean
  recruitNum?: number
  frontendNum?: number
  backendNum?: number
  devopsNum?: number
  fullStackNum?: number
  dataEngineerNum?: number
  recruitExplain: string
  onUpdate: (key: string, value: any) => void
}

export default function AddRecruit({
  isRecruited,
  recruitNum,
  frontendNum,
  backendNum,
  devopsNum,
  fullStackNum,
  dataEngineerNum,
  recruitExplain,
  onUpdate,
}: AddRecruitProps) {
  const handleRecruitStatusChange = (status) => {
    const isRecruit = status === '모집'
    onUpdate('isRecruited', isRecruit)

    // "모집하지 않음"일 때 기존 입력값 초기화
    if (!isRecruit) {
      onUpdate('frontendNum', 0)
      onUpdate('backendNum', 0)
      onUpdate('devopsNum', 0)
      onUpdate('fullStackNum', 0)
      onUpdate('dataEngineerNum', 0)
      onUpdate('recruitExplain', '')
    }
  }

  // const handleRecruitNumChange = (event) => {
  //   onUpdate('recruitNum', Number(event.target.value))
  // }

  const handleRecruitNumChange = (
    role: string,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = Number(event.target.value)
    onUpdate(role, value)
  }

  const handleRecruitExplainChange = (event) => {
    onUpdate('recruitExplain', event.target.value)
  }

  return (
    <div>
      {/* 인원 모집 여부 */}
      <div className="flex justify-between items-center">
        <p className="font-medium text-gray">
          인원 모집 여부<span className="text-primary">*</span>
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => handleRecruitStatusChange('모집')}
            className={`w-[10.875rem] h-[2.125rem] border ${
              isRecruited
                ? 'border-primary text-primary'
                : 'border-gray text-gray'
            } rounded-[0.1875rem]`}
          >
            모집
          </button>
          <button
            onClick={() => handleRecruitStatusChange('모집하지 않음')}
            className={`w-[10.875rem] h-[2.125rem] border ${
              isRecruited
                ? 'border-gray text-gray'
                : 'border-primary text-primary'
            } rounded-[0.1875rem]`}
          >
            모집하지 않음
          </button>
        </div>
      </div>

      {/* 조건부 렌더링으로 모집정보 컴포넌트 표시 */}
      {isRecruited && (
        <div className="mt-6">
          <p className="font-medium text-gray mb-[1.22rem]">
            모집정보를 입력해주세요<span className="text-primary">*</span>
          </p>
          <div className="flex gap-[0.84rem]">
            <>
              <RecruitInput
                role="Frontend"
                placeholder="1명"
                value={frontendNum || ''}
                onChange={(event) =>
                  handleRecruitNumChange('frontendNum', event)
                }
              />
              <RecruitInput
                role="Backend"
                placeholder="1명"
                value={backendNum || ''}
                onChange={(event) =>
                  handleRecruitNumChange('backendNum', event)
                }
              />
              <RecruitInput
                role="DevOps"
                placeholder="1명"
                value={devopsNum || ''}
                onChange={(event) => handleRecruitNumChange('devopsNum', event)}
              />
              <RecruitInput
                role="FullStack"
                placeholder="1명"
                value={fullStackNum || ''}
                onChange={(event) =>
                  handleRecruitNumChange('fullStackNum', event)
                }
              />
              <RecruitInput
                role="DataEngineer"
                placeholder="1명"
                value={dataEngineerNum || ''}
                onChange={(event) =>
                  handleRecruitNumChange('dataEngineerNum', event)
                }
              />
            </>
          </div>

          <textarea
            value={recruitExplain || ''}
            onChange={handleRecruitExplainChange}
            maxLength={1000}
            className="w-full h-[11.375rem] border border-gray rounded-xl p-4 focus:outline-none"
            placeholder={`• Of the techeer, By the techeer, For the techeer
          • 테커에서 사용할 수 있는 올인원 테커 포탈 서비스입니다(프로젝트, 이력서, 세션, 기술 블로그)
          • 다양한 기술을 시도해보고 싶은 분들 환영합니다
      `}
          />
          <p className="text-right text-xs mt-1 text-gray">
            {recruitExplain.length}/1000
          </p>
        </div>
      )}
    </div>
  )
}
