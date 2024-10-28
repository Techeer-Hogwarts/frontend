'use client'

import { useState } from 'react'

export default function AddRecruit() {
  const [recruitStatus, setRecruitStatus] = useState('모집하지 않음') // 모집 상태 관리
  const [description, setDescription] = useState('')

  return (
    <div>
      {/* 인원 모집 여부 */}
      <div className="flex justify-between items-center">
        <p className="font-medium text-gray">
          인원 모집 여부<span className="text-primary">*</span>
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setRecruitStatus('모집')}
            className={`w-[10.875rem] h-[2.125rem] border ${
              recruitStatus === '모집'
                ? 'border-primary text-primary'
                : 'border-gray'
            } rounded-[0.1875rem]`}
          >
            모집
          </button>
          <button
            onClick={() => setRecruitStatus('모집하지 않음')}
            className={`w-[10.875rem] h-[2.125rem] border ${
              recruitStatus === '모집하지 않음'
                ? 'border-primary text-primary'
                : 'border-gray'
            } rounded-[0.1875rem]`}
          >
            모집하지 않음
          </button>
        </div>
      </div>

      {/* 조건부 렌더링으로 모집정보 컴포넌트 표시 */}
      {recruitStatus === '모집' && (
        <div className="mt-6">
          <p className="font-medium text-gray mb-[1.22rem]">
            모집정보를 입력해주세요<span className="text-primary">*</span>
          </p>
          <div className="flex gap-[0.84rem]">
            {/* 프론트 인원 */}
            <div className="flex  mb-[0.69rem]">
              <div className="flex justify-center w-[5.7188rem] h-[1.4955rem] text-[0.9375rem] font-medium text-blue rounded-l-[0.3125rem] bg-lightblue">
                Frontend
              </div>
              <input
                type="text"
                className="text-right pr-1 w-[2.6875rem] h-[1.4955rem] rounded-r-[0.3125rem] border border-lightblue"
                placeholder="1명"
              />
            </div>
            {/* 백엔드 인원 */}
            <div className="flex  mb-[0.69rem]">
              <div className="flex justify-center w-[5.7188rem] h-[1.4955rem] text-[0.9375rem] font-medium text-blue rounded-l-[0.3125rem] bg-lightblue">
                Backend
              </div>
              <input
                type="text"
                className="text-right pr-1 w-[2.6875rem] h-[1.4955rem] rounded-r-[0.3125rem] border border-lightblue"
                placeholder="1명"
              />
            </div>
            {/* 데브옵스 인원 */}
            <div className="flex  mb-[0.69rem]">
              <div className="flex justify-center w-[5.7188rem] h-[1.4955rem] text-[0.9375rem] font-medium text-blue rounded-l-[0.3125rem] bg-lightblue">
                DevOps
              </div>
              <input
                type="text"
                className="text-right pr-1 w-[2.6875rem] h-[1.4955rem] rounded-r-[0.3125rem] border border-lightblue"
                placeholder="1명"
              />
            </div>
          </div>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={200}
            className="w-full h-[11.375rem] border border-gray rounded-xl p-4"
            placeholder={`• Of the techeer, By the techeer, For the techeer
          • 테커에서 사용할 수 있는 올인원 테커 포탈 서비스입니다(프로젝트, 이력서, 세션, 기술 블로그)
          • 다양한 기술을 시도해보고 싶은 분들 환영합니다
      `}
          />
          <p className="text-right text-xs mt-1">{description.length}/200</p>
        </div>
      )}
    </div>
  )
}
