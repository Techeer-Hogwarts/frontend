'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface Member {
  name: string
  generation: string
  imageSrc: string | null
}

interface ApplyModalProps {
  initialMembers: Member[]
}

const RecruitmentModal = ({ initialMembers }: ApplyModalProps) => {
  const [approval, setApproval] = useState('')
  const router = useRouter()

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 text-center">
      <div className="flex flex-col p-8 w-[30.375rem] h-[39.375rem] bg-white border rounded-xl">
        <p className="w-full text-[1.375rem] text-center mb-4">
          지원자 상세 정보
        </p>
        <div className="flex justify-center mb-[1.56rem]">
          <Image
            src="/images/project/modal/applyIcon.png"
            width={100}
            height={100}
            alt="img"
          />
        </div>
        <div className="flex justify-between mb-[1.56rem]">
          {['승인', '거절'].map((el) => (
            <button
              key={el}
              onClick={() => {
                setApproval(el)
              }}
              className={`w-[12.5rem] h-[2.125rem] border rounded-[0.1875rem] text-pink ${approval === el ? 'border-primary' : 'border-gray'}  `}
            >
              {el}
            </button>
          ))}
        </div>
        {/* 스택 */}
        <div className="mb-[1.56rem]">
          <p className="text-left mb-2">지원한 포지션</p>
          <div className="w-full flex justify-between">
            {['Frontend', 'Backend', 'Full-Stack', 'DevOps'].map((el) => {
              return (
                <div
                  key={el}
                  className={`w-[5.875rem] h-[1.75rem] border border-lightprimary rounded-md ${'Frontend' === el ? 'bg-lightprimary' : 'bg-white'} `}
                >
                  {el}
                </div>
              )
            })}
          </div>
        </div>
        {/* 지원동기 입력 필드*/}
        <div className="mb-3">
          <p className="text-left mb-2">지원동기</p>
          <div className="w-full h-[9.3125rem] p-1 border border-gray rounded-sm text-left break-words">
            {
              'fsdfsfsdfsfsdfsfsdfsfsdfsfsdfsfsdfsfsdfsfsdfsfsdfsfsdfsfsdfsfsdfsfsdfsfsdfsfsdfsfsdfsfsdfsfsdfsfsdfsfsdfsfsdfs'
            }
          </div>
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
              approval ? 'bg-primary text-white' : 'bg-lightgray'
            }`}
          >
            저장
          </button>
        </div>
      </div>
    </div>
  )
}

export default RecruitmentModal
