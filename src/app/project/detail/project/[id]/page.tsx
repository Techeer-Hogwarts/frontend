'use client'

import Profile from '@/components/project/detail/Profile'
import Member from '@/components/project/detail/Member'
import Stack from '@/components/project/detail/Stack'
import FindMember from '@/components/project/detail/FindMember'
import Results from '@/components/project/detail/Results'
import Applicants from '@/components/project/detail/Applicants'
import { BiSolidPencil } from 'react-icons/bi'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import ApplyModal from '@/components/project/modal/ApplyModal'

import {
  getProjectDetail,
  deleteProjectTeam,
  handleCloseProject,
  denyProjectApplicant,
} from '@/api/project/project/project'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import BaseModal from '@/components/project/modal/BaseModal'
import ApplicantModal from '@/components/project/modal/ApplicantModal'

export default function ProjectDetailpage() {
  const MODAL_TEXT_MAP = {
    delete: '프로젝트를 삭제하시겠습니까?',
    close: '프로젝트를 마감하시겠습니까?',
    cancel: '프로젝트 지원을 취소하시겠습니까?',
  }

  const MODAL_BTN_TEXT_MAP = {
    delete: '삭제',
    close: '마감',
    cancel: '확인',
  }

  const router = useRouter()
  const projectId = Number(localStorage.getItem('projectId'))
  const projectType = localStorage.getItem('projectType')

  // React Query로 프로젝트 상세 데이터 가져오기
  const { data: projectDetails } = useQuery({
    queryKey: ['getProjectDetails', projectId],
    queryFn: () => getProjectDetail(projectId),
  })

  // 지원자 상세 조회 모달 상태
  const [isApplicantModalOpen, setIsApplicantModalOpen] = useState(false)
  const [selectedApplicant, setSelectedApplicant] = useState(null)

  const handleModalOpen = (applicant) => {
    setSelectedApplicant(applicant)
    setIsApplicantModalOpen(true)
  }

  const handleModalClose = () => {
    setIsApplicantModalOpen(false)
    setSelectedApplicant(null)
  }

  const handleApply = () => {
    router.push('/project/detail/project/1/applyProject')
  }

  return (
    <div className="relative flex justify-between mt-[2.75rem]">
      {isApplicantModalOpen && selectedApplicant && (
        <ApplicantModal
          applicant={selectedApplicant}
          onClose={handleModalClose}
        />
      )}

      <div className="flex rounded-xl items-center justify-center border border-primary absolute top-[-1rem] right-0 w-[8.375rem] h-[2.125rem]">
        <Link
          href={`/project/detail/project/edit/${projectId}`}
          className="flex justify-center items-center gap-2 text-primary font-semibold"
        >
          <BiSolidPencil size={14} color="#FE9142" />
          편집하기
        </Link>
      </div>

      <div>
        <Profile projectDetail={projectDetails} />
        <Applicants
          projectType={projectType}
          applicants={projectDetails?.projectApplicants || []}
          onOpen={handleModalOpen}
        />
      </div>

      <div className="flex flex-col gap-7">
        <Member members={projectDetails?.projectMember} />
        <Stack stacks={projectDetails?.teamStacks} />
        {projectDetails?.isRecruited && (
          <FindMember
            projectDetail={projectDetails}
            projectType={projectType}
          />
        )}
        <Results
          resultImages={
            projectDetails?.resultImages.map((img) => img.imageUrl) || []
          }
        />

        <button
          onClick={handleApply}
          className="w-full h-[2.16044rem] border border-primary text-primary rounded-md hover:shadow-md"
        >
          지원하기
        </button>
      </div>
    </div>
  )
}
