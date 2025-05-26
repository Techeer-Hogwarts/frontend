// components/ApplyModal.tsx

'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { getPositionStyle } from '@/styles/positionStyles'

// 프로젝트 지원 API
import { handleApplyProject } from '@/api/project/project/project'
// 스터디 지원 API
import { handleApplyStudy } from '@/api/project/study/study'

interface ApplyModalProps {
  /** 'project' 또는 'study' 모드 지정 */
  variant: 'project' | 'study'
}

export default function ApplyModal({ variant }: ApplyModalProps) {
  const [summary, setSummary] = useState('')
  const [position, setPosition] = useState('')
  const router = useRouter()
  const params = useParams()
  const teamId = Number(params.id)

  const queryClient = useQueryClient()

  // 지원 동기 입력 핸들러
  const handleChangeSummary = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSummary(e.target.value)
  }

  // 저장(지원) 버튼 클릭
  const handleSave = async () => {
    if (!summary) {
      alert('지원 동기를 입력해주세요.')
      return
    }
    if (variant === 'project' && !position) {
      alert('지원하고자 하는 포지션을 선택해주세요.')
      return
    }

    try {
      if (variant === 'project') {
        await handleApplyProject({
          projectTeamId: teamId,
          teamRole: position,
          summary,
        })
        queryClient.invalidateQueries({
          queryKey: ['getProjectDetails', teamId],
        })
        queryClient.invalidateQueries({
          queryKey: ['getProjectApplicants', teamId],
        })
      } else {
        await handleApplyStudy({ studyTeamId: teamId, summary })
        queryClient.invalidateQueries({ queryKey: ['getStudyDetails', teamId] })
        queryClient.invalidateQueries({
          queryKey: ['getStudyApplicants', teamId],
        })
      }
      router.back()
    } catch (error) {
      alert('지원에 실패했습니다.')
    }
  }

  // 프로젝트 모드에서만 포지션 선택
  const roles = ['Frontend', 'Backend', 'DevOps', 'FullStack', 'DataEngineer']

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 text-center">
      <div className="flex flex-col p-8 w-[36rem] max-h-[39.375rem] bg-white border rounded-xl">
        <p className="w-full text-[1.375rem] text-center mb-4">지원하기</p>
        <div className="flex justify-center mb-[1.56rem]">
          <Image
            src="/images/project/modal/applyIcon.png"
            width={100}
            height={100}
            alt="apply icon"
          />
        </div>

        {/* (A) 포지션 선택 (프로젝트만) */}
        {variant === 'project' && (
          <div className="mb-4">
            <p className="text-left mb-2">
              지원하고자 하는 포지션을 선택해주세요
            </p>
            <div className="w-full flex justify-between mb-[2.5rem] gap-2">
              {roles.map((role) => {
                const { bg, textColor } = getPositionStyle(role)
                const selected = position === role
                const cls = selected
                  ? `${bg} ${textColor}`
                  : 'bg-white border border-lightprimary'
                return (
                  <button
                    key={role}
                    className={`${cls} px-2 h-[1.75rem] rounded-md`}
                    onClick={() => setPosition(role)}
                  >
                    {role}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* (B) 지원 동기 입력 */}
        <div className="mb-4">
          <p className="text-left mb-2">
            지원동기를 입력해주세요{variant === 'project' ? '(30자 이내)' : ''}
          </p>
          <textarea
            className="w-full h-[9.3125rem] border border-gray rounded-sm p-2 focus:outline-none"
            value={summary}
            onChange={handleChangeSummary}
            maxLength={variant === 'project' ? 30 : undefined}
          />
        </div>

        {/* (C) 버튼 영역 */}
        <div className="flex gap-4 mt-6 justify-between">
          <button
            type="button"
            onClick={() => router.back()}
            className="w-full rounded-md text-sm h-[34px] bg-white text-gray border border-lightgray"
          >
            취소
          </button>
          <button
            type="button"
            className={`w-full rounded-md text-sm h-[34px] ${summary ? 'bg-primary text-white' : 'bg-lightgray'}`}
            onClick={handleSave}
          >
            저장
          </button>
        </div>
      </div>
    </div>
  )
}
