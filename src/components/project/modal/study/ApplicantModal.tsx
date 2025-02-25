'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import {
  acceptStudyApplicant,
  denyStudyApplicant,
} from '@/api/project/study/study'
import { useQueryClient } from '@tanstack/react-query'

interface User {
  name: string
  email: string
  profileImage: string
}

interface Applicant {
  id: number
  createdAt: string
  updatedAt: string
  isDeleted: boolean
  isLeader: boolean
  studyTeamId: number
  userId: number
  summary: string
  status: string
  user: User
  profileImage: string
  name: string
  teamRole: string
  year: string
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
    let data
    try {
      if (projectType === 'study') {
        data = {
          studyTeamId: projectId,
          applicantId: applicant.userId,
        }
      } else {
        data = {
          projectTeamId: projectId,
          applicantId: applicant.userId,
        }
      }

      await acceptStudyApplicant(data)

      // alert(`${applicant.name}님의 지원이 승인되었습니다.`)
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
      const data = {
        studyTeamId: projectId,
        applicantId: applicant.userId,
      }
      await denyStudyApplicant(data)
      onClose()
      queryClient.invalidateQueries({
        queryKey: ['getStudyDetails', projectId],
      })
    } catch (error) {
      alert('오류가 발생했습니다.')
    }
    onClose()
  }

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
            src={applicant.profileImage}
            width={100}
            height={100}
            alt="img"
            className="border "
          />
        </div>
        <div className="flex items-center justify-center gap-2 mb-3">
          <p className="text-lg font-bold">{applicant.name}</p>

          {/* 추후 수정 예정 */}
          <span className="text-gray-500 text-sm">| {applicant.year}기</span>
        </div>

        {/* 승인 / 거절 버튼 */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            className={`w-[200px] rounded-md text-sm h-[34px]  bg-white border ${approve ? 'border-primary text-primary' : 'border-gray  text-gray'}`}
            onClick={() => {
              setApprove(true)
            }}
          >
            승인
          </button>
          <button
            className={`w-[200px] rounded-md text-sm h-[34px]  bg-white border ${!approve ? 'border-primary text-primary' : 'border-gray  text-gray'}`}
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
              {['Frontend', 'Backend', 'Full-Stack', 'DevOps'].map((el) => {
                return (
                  <div
                    key={el}
                    className={`w-[5.875rem] h-[1.75rem] border border-lightprimary rounded-md ${applicant.teamRole === el ? 'bg-lightprimary text-primary' : 'bg-white text-gray'} `}
                    // className={`w-[5.875rem] h-[1.75rem] border border-lightprimary rounded-md `}
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
          <div className="w-full p-1 h-[9.3125rem] border border-lightgray rounded-sm text-start">
            {applicant?.summary}
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className="flex gap-4 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="w-[200px] rounded-md text-sm h-[34px] bg-white text-gray border border-lightgray"
          >
            취소
          </button>
          <button
            type="button"
            className={`w-[200px] rounded-md text-sm h-[34px] bg-primary text-white`}
            onClick={handleSave}
          >
            저장
          </button>
        </div>
      </div>
    </div>
  )
}
