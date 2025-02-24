'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { handleApplyStudy } from '@/api/project/study/study'
import { useQueryClient } from '@tanstack/react-query'

const ApplyModal = () => {
  const [apply, setApply] = useState('')
  const [position, setPosition] = useState('')
  const [projectType, setProjectType] = useState<null | string>(null)
  const router = useRouter()

  const projectId = Number(localStorage.getItem('projectId'))

  const queryClient = useQueryClient()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedProjectType = localStorage.getItem('projectType')
      setProjectType(storedProjectType)
    }
  }, [])

  const handleApply = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setApply(e.target.value)
  }

  const handleSave = async () => {
    if (projectType === 'study') {
      if (projectId && apply) {
        const data = {
          studyTeamId: Number(projectId),
          summary: apply,
        }
        const result = await handleApplyStudy(data)
        queryClient.invalidateQueries({
          queryKey: ['getStudyApplicants', projectId],
        })
        router.back()

        return result
      } else {
        alert('지원 동기를 입력해주세요.')
      }
    }
  }

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 text-center">
      <div className="flex flex-col p-8 w-[30.375rem] max-h-[39.375rem] bg-white border rounded-xl">
        <p className="w-full text-[1.375rem] text-center mb-4">지원하기</p>
        <div className="flex justify-center mb-[1.56rem]">
          <Image
            src="/images/project/modal/applyIcon.png"
            width={100}
            height={100}
            alt="img"
          />
        </div>

        {/*project일 경우에만 보임 : 스택 선택 */}
        {projectType === 'project' && (
          <div className="mb-4">
            <p className="text-left mb-2">
              지원하고자하는 포지션을 선택주세요(30자 이내로 작성해주세요)
            </p>
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
        )}

        {/* 지원동기 입력 필드*/}
        <div className="mb-4">
          <p className="text-left mb-2">지원동기를 입력해주세요</p>
          <textarea
            className="w-full h-[9.3125rem] border border-gray rounded-sm p-2"
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
              apply ? 'bg-primary text-white' : 'bg-lightgray'
            }`}
            onClick={handleSave}
          >
            저장
          </button>
        </div>
      </div>
    </div>
  )
}

export default ApplyModal
