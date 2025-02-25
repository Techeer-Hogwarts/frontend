'use client'

import { useState, useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { getPositionStyle } from '@/styles/positionStyles'

import {
  acceptStudyApplicant,
  denyStudyApplicant,
} from '@/api/project/study/study'
import {
  acceptProjectApplicant,
  denyProjectApplicant,
} from '@/api/project/project/project'

interface Applicant {
  id: number
  userId: number
  name: string
  isLeader: boolean
  teamRole: string
  summary: string
  status: string
  profileImage: string
  year: number
}

interface ApplicantModalProps {
  onClose: () => void
  applicant: Applicant
}

export default function ApplicantModal({
  onClose,
  applicant,
}: ApplicantModalProps) {
  const [projectType, setProjectType] = useState<null | string>(null)
  const [approve, setApprove] = useState(true)
  const projectId = Number(localStorage.getItem('projectId'))

  const queryClient = useQueryClient()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedProjectType = localStorage.getItem('projectType')
      setProjectType(storedProjectType)
    }
  }, [])

  // 승인 버튼 핸들러
  const handleApprove = async () => {
    try {
      if (projectType === 'project') {
        // 프로젝트 지원자 승인
        await acceptProjectApplicant({
          projectTeamId: projectId,
          applicantId: applicant.userId,
        })
      } else {
        // study 지원자 승인
        await acceptStudyApplicant({
          studyTeamId: projectId,
          applicantId: applicant.userId,
        })
      }

      queryClient.invalidateQueries({
        queryKey: ['getProjectDetails', projectId],
      })

      onClose()
      queryClient.invalidateQueries({
        queryKey: ['getStudyDetails', projectId],
      })
      queryClient.invalidateQueries({
        queryKey: ['getStudyApplicants', projectId],
      })
    } catch (error) {
      alert('오류가 발생했습니다.')
    }
  }

  // 거절 버튼 핸들러
  const handleReject = async () => {
    try {
      if (projectType === 'project') {
        // 프로젝트 지원자 거절
        await denyProjectApplicant({
          projectTeamId: projectId,
          applicantId: applicant.userId,
        })
      } else {
        // study 지원자 거절
        await denyStudyApplicant({
          studyTeamId: projectId,
          applicantId: applicant.userId,
        })
      }

      queryClient.invalidateQueries({
        queryKey: ['getProjectDetails', projectId],
      })

      onClose()
      queryClient.invalidateQueries({
        queryKey: ['getStudyDetails', projectId],
      })
    } catch (error) {
      alert('오류가 발생했습니다.')
    }
  }

  // "전송" 버튼 클릭 시 승인/거절 결정
  const handleSave = () => {
    if (approve) {
      handleApprove()
    } else {
      handleReject()
    }
    onClose()
  }

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 text-center">
      <div className="flex flex-col p-8 w-[30.375rem] max-h-[39.375rem] bg-white border rounded-xl">
        <p className="w-full text-[1.375rem] text-center mb-4">
          지원자 상세 정보
        </p>
        <div className="flex justify-center mb-1">
          <Image
            src={applicant.profileImage || '/default-profile.png'}
            width={100}
            height={100}
            alt="img"
            className="border  object-cover w-[100px] h-[100px] rounded-md"
          />
        </div>
        <div className="flex items-center justify-center gap-2 mb-3">
          <p className="text-lg font-bold">{applicant.name}</p>

          {/* 추후 수정 예정 */}
          <span className="text-darkgray text-sm">{applicant.year}기</span>
        </div>

        {/* 승인 / 거절 버튼 */}
        <div className="flex justify-between gap-4 mb-6">
          <button
            className={`w-full rounded-md text-sm h-[34px]  bg-white border ${approve ? 'border-primary text-primary' : 'border-gray  text-gray'}`}
            onClick={() => {
              setApprove(true)
            }}
          >
            승인
          </button>
          <button
            className={`w-full rounded-md text-sm h-[34px]  bg-white border ${!approve ? 'border-primary text-primary' : 'border-gray  text-gray'}`}
            onClick={() => {
              setApprove(false)
            }}
          >
            거절
          </button>
        </div>

        {/*project일 경우에만 보임 : 스택 선택 */}
        {projectType === 'project' && (
          <div className="mb-4">
            <p className="text-left mb-2 font-medium">지원한 포지션</p>
            <div className="w-full flex justify-between">
              {[
                'Frontend',
                'Backend',
                'DevOps',
                'FullStack',
                'DataEngineer',
              ].map((el) => {
                const { bg, textColor } = getPositionStyle(el)

                return (
                  <div
                    key={el}
                    className={`px-1 h-[1.75rem] rounded-md ${applicant.teamRole === el ? `bg-${bg} ${textColor} mx-[1px]` : 'bg-white text-gray border border-lightprimary'} `}
                  >
                    {el}
                  </div>
                )
              })}
            </div>
          </div>
        )}
        {/* 지원 동기 */}
        <div className="mb-4">
          <p className="text-left mb-2 font-medium">
            {applicant.name}의 지원동기
          </p>
          <div className="w-full px-2 py-1 h-[9.3125rem] border border-lightgray rounded-sm text-start">
            {applicant.summary}
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className="flex gap-4 mt-4 justify-between">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-md text-sm h-[34px] bg-white text-gray border border-lightgray"
          >
            취소
          </button>
          <button
            type="button"
            className={`w-full rounded-md text-sm h-[34px] bg-primary text-white`}
            onClick={handleSave}
          >
            전송
          </button>
        </div>
      </div>
    </div>
  )
}
