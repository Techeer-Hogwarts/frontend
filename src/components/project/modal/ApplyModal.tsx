'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { handleApplyStudy } from '@/api/project/study/study'
import { handleApplyProject } from '@/api/project/project/project'
import { getPositionStyle } from '@/styles/positionStyles'

export default function ApplyModal() {
  const [apply, setApply] = useState('')
  const [position, setPosition] = useState('')
  const [projectType, setProjectType] = useState<null | string>(null)
  const router = useRouter()
  const queryClient = useQueryClient()

  // 로컬 스토리지에서 projectId 가져오기
  const projectId = Number(localStorage.getItem('projectId'))

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedProjectType = localStorage.getItem('projectType')
      setProjectType(storedProjectType)
    }
  }, [])

  // 지원동기(요약) 입력 핸들러
  const handleApply = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setApply(e.target.value)
  }

  // 저장(지원) 버튼 클릭
  const handleSave = async () => {
    try {
      if (!apply) {
        alert('지원 동기를 입력해주세요.')
        return
      }

      // 1) 스터디 지원 로직
      if (projectType === 'study') {
        const data = {
          studyTeamId: projectId,
          summary: apply,
        }
        const result = await handleApplyStudy(data)
        queryClient.invalidateQueries({
          queryKey: ['getStudyDetails', projectId],
        })
        router.back()

        // 2) 프로젝트 지원 로직
      } else if (projectType === 'project') {
        if (!position) {
          alert('지원하고자 하는 포지션을 선택해주세요.')
          return
        }
        const data = {
          projectTeamId: projectId,
          teamRole: position,
          summary: apply,
        }
        const result = await handleApplyProject(data)
        queryClient.invalidateQueries({
          queryKey: ['getStudyApplicants', projectId],
        })
        router.back()
      }
    } catch (error) {
      alert('지원에 실패했습니다. 모집하지 않는 포지션입니다.')
    }
  }

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 text-center">
      <div className="flex flex-col p-8 w-[36rem] max-h-[39.375rem] bg-white border rounded-xl">
        <p className="w-full text-[1.375rem] text-center mb-4">지원하기</p>
        <div className="flex justify-center mb-[1.56rem]">
          <Image
            src="/images/project/modal/applyIcon.png"
            width={100}
            height={100}
            alt="img"
          />
        </div>

        {/* (A) 프로젝트일 경우 → 포지션 선택 */}
        {projectType === 'project' && (
          <div className="mb-4">
            <p className="text-left mb-2">지원하고자하는 포지션을 선택주세요</p>
            <div className="w-full flex justify-between mb-[2.5rem] gap-2">
              {[
                'Frontend',
                'Backend',
                'DevOps',
                'FullStack',
                'DataEngineer',
              ].map((el) => {
                const { bg, textColor } = getPositionStyle(el)
                return (
                  <button
                    key={el}
                    className={`px-2 h-[1.75rem]  rounded-md ${
                      position === el
                        ? `bg-${bg} ${textColor} mx-[1px]`
                        : 'bg-white border border-lightprimary'
                    } `}
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

        {/* (B) 지원동기(요약) 입력 */}
        <div className="mb-4">
          <p className="text-left mb-2">
            지원동기를 입력해주세요(30자 이내로 작성해주세요)
          </p>
          <textarea
            className="w-full h-[9.3125rem] border border-gray rounded-sm p-2 focus:outline-none"
            value={apply}
            onChange={handleApply}
          />
        </div>

        {/* (C) 하단 버튼 영역 */}
        <div className="flex gap-4 mt-6 justify-between">
          <button
            type="button"
            onClick={() => router.back()}
            className=" w-full rounded-md text-sm h-[34px] bg-white text-gray border border-lightgray"
          >
            취소
          </button>
          <button
            type="button"
            className={` w-full rounded-md text-sm h-[34px] ${
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
