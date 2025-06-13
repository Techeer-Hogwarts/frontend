// components/ApplicantModal.tsx

'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { getPositionStyle } from '@/styles/positionStyles'

import { Applicant } from '@/types/project/project'

// 프로젝트 API
import {
  acceptProjectApplicant,
  denyProjectApplicant,
} from '@/api/project/project/project'
// 스터디 API
import {
  acceptStudyApplicant,
  denyStudyApplicant,
} from '@/api/project/study/study'

interface ApplicantModalProps {
  /** 'project' 또는 'study' 지정 */
  variant: 'project' | 'study'
  onClose: () => void
  applicant: Applicant
}

export default function ApplicantModal({
  variant,
  onClose,
  applicant,
}: ApplicantModalProps) {
  const [approve, setApprove] = useState(true)
  const params = useParams()
  const teamId = Number(params.id)
  const queryClient = useQueryClient()

  // 승인
  const handleApprove = async () => {
    try {
      if (variant === 'project') {
        await acceptProjectApplicant({
          teamId: teamId,
          applicantId: applicant.userId,
        })
        queryClient.invalidateQueries({
          queryKey: ['getProjectDetails', teamId],
        })
      } else {
        await acceptStudyApplicant({
          studyId: teamId,
          applicantId: applicant.userId,
        })
        queryClient.invalidateQueries({ queryKey: ['getStudyDetails', teamId] })
        queryClient.invalidateQueries({
          queryKey: ['getStudyApplicants', teamId],
        })
      }
      onClose()
    } catch {
      alert('오류가 발생했습니다.')
    }
  }

  // 거절
  const handleReject = async () => {
    try {
      if (variant === 'project') {
        await denyProjectApplicant({
          teamId: teamId,
          applicantId: applicant.userId,
        })
        queryClient.invalidateQueries({
          queryKey: ['getProjectDetails', teamId],
        })
      } else {
        await denyStudyApplicant({
          studyId: teamId,
          applicantId: applicant.userId,
        })
        queryClient.invalidateQueries({ queryKey: ['getStudyDetails', teamId] })
      }
      onClose()
    } catch {
      alert('오류가 발생했습니다.')
    }
  }

  // 저장
  const handleSave = () => {
    if (approve) handleApprove()
    else handleReject()
  }

  // 스타일
  const roles = ['FRONTEND', 'BACKEND', 'DEVOPS', 'FULLSTACK', 'DATA_ENGINEER']

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-70">
      <div className="flex flex-col p-8 w-[30.375rem] max-h-[39.375rem] bg-white border rounded-xl text-center">
        <p className="text-[1.375rem] mb-4 font-semibold">지원자 상세 정보</p>
        <div className="flex justify-center mb-1">
          <Image
            src={applicant.profileImage || '/default-profile.png'}
            width={100}
            height={100}
            alt={applicant.name}
            className="border object-cover w-[100px] h-[100px] rounded-md"
          />
        </div>
        <div className="flex items-center justify-center gap-2 mb-3">
          <p className="text-lg font-bold">{applicant.name}</p>
          <span className="text-sm text-gray-500">| {applicant.year}기</span>
        </div>

        {/* 승인/거절 토글 */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            className={`w-[200px] h-[34px] rounded-md text-sm bg-white border ${approve ? 'border-primary text-primary' : 'border-gray text-gray'}`}
            onClick={() => setApprove(true)}
          >
            승인
          </button>
          <button
            className={`w-[200px] h-[34px] rounded-md text-sm bg-white border ${!approve ? 'border-primary text-primary' : 'border-gray text-gray'}`}
            onClick={() => setApprove(false)}
          >
            거절
          </button>
        </div>

        {/* 지원 포지션 */}
        {variant === 'project' && (
          <div className="mb-4 text-left">
            <p className="mb-2 font-medium">지원한 포지션</p>
            <div className="flex justify-between">
              {roles.map((role) => {
                const { bg, textColor } = getPositionStyle(role)
                const selected = applicant.teamRole === role
                const cls = selected
                  ? `bg-${bg} ${textColor}`
                  : 'bg-white text-gray border border-lightprimary justify-center items-center'
                return (
                  <div
                    key={role}
                    className={`${cls} px-1 rounded-md text-center text-[13px]`}
                  >
                    {role}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* 지원 동기 */}
        <div className="mb-6 text-left">
          <p className="mb-2 font-medium">{applicant.name}의 지원동기</p>
          <div className="w-full p-2 h-[9.3125rem] border border-lightgray rounded-sm text-start overflow-auto">
            {applicant.summary}
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className="flex gap-4 justify-between">
          <button
            onClick={onClose}
            className="w-[200px] h-[34px] rounded-md text-sm bg-white text-gray border border-lightgray"
          >
            취소
          </button>
          <button
            onClick={handleSave}
            className="w-[200px] h-[34px] rounded-md text-sm bg-primary text-white"
          >
            전송
          </button>
        </div>
      </div>
    </div>
  )
}
