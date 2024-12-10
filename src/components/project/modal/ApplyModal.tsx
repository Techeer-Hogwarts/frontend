'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const ApplyModal = () => {
  const [apply, setApply] = useState('')
  const [position, setPosition] = useState('')
  const router = useRouter()

  // 지원동기
  const handleApply = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApply(e.target.value)
  }

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 text-center">
      <div className="flex flex-col p-8 w-[30.375rem] h-[39.375rem] bg-white border rounded-xl">
        <p className="w-full text-[1.375rem] text-center mb-4">지원하기</p>
        <div className="flex justify-center mb-[1.56rem]">
          <Image
            src="/images/project/modal/applyIcon.png"
            width={100}
            height={100}
            alt="img"
          />
        </div>
        {/* 스택 선택 */}
        <div className="mb-4">
          <p className="text-left mb-2">지원하고자하는 포지션을 선택주세요</p>
          <div className="w-full flex justify-between mb-[2.5rem]">
            {['Frontend', 'Backend', 'Full-Stack', 'DevOps'].map((el) => {
              return (
                <button
                  key={el}
                  className={`w-[5.875rem] h-[1.75rem] border border-lightprimary rounded-md ${position === el ? 'bg-lightprimary' : 'bg-white'} `}
                  onClick={() => {
                    setPosition(el)
                  }}
                >
                  {el}
                </button>
              )
            })}
          </div>
        </div>
        {/* 지원동기 입력 필드*/}
        <div className="mb-4">
          <p className="text-left mb-2">지원동기를 입력해주세요</p>
          <textarea
            type="text"
            className="w-full h-[9.3125rem] border border-gray rounded-sm"
            value={apply}
            onChange={handleApply}
          />
        </div>

        {/* 하단 고정 버튼 영역 */}
        <div className="flex gap-4 mt-6">
          <button
            type="button"
            onClick={() => router.back()}
            className="w-[200px] rounded-md text-sm h-[34px] bg-white text-gray border border-lightgray"
          >
            취소
          </button>
          <button
            type="button"
            className={`w-[200px] rounded-md text-sm h-[34px] ${
              position && apply ? 'bg-primary text-white' : 'bg-lightgray'
            }`}
          >
            저장
          </button>
        </div>
      </div>
    </div>
  )
}

export default ApplyModal
