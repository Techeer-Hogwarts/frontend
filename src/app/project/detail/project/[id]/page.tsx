'use client'


import Profile from '@/components/project/detail/Profile'
// import RecommendedMember from '@/components/project/detail/RecommendedMember'
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
  getProjectMember,
  getProjectApplicants,
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

  const MODAL_BTN_FUNCTION_MAP = {
    delete: () => deleteProjectTeam(projectId),
    close: () => handleCloseProject(projectId),
    cancel: () => denyProjectApplicant(projectId),
  }

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isApplicantModalOpen, setIsApplicantModalOpen] = useState(false)
  const [selectedApplicant, setSelectedApplicant] = useState(null)
  const [modalType, setModalType] = useState<
    'delete' | 'close' | 'cancel' | null
    >(null)
  
  const router = useRouter()
  const projectId = Number(localStorage.getItem('projectId'))
  const projectType = localStorage.getItem('projectType')

  // React Query로 데이터 가져오기
  const { data } = useQuery({
    queryKey: ['getProjectDetailsAndApplicants', projectId],
    queryFn: async () => {
      // const [projectDetails, projectMember, getProjectApplicants] =
      const [projectDetails] = await Promise.all([
        getProjectDetail(projectId),
        // getProjectApplicants(projectId),
      ])
      return { projectDetails }
      // return { projectDetails, projectMember, projectApplicants }
    },
  })

  // 지원자 상세 조회 모달 여닫기
  const onClose = (applicant) => {
    setIsApplicantModalOpen(false)
    setSelectedApplicant(null)
  }

  const onOpen = (applicant) => {
    setSelectedApplicant(applicant)
    setIsApplicantModalOpen(true)
  }

  const handleModal = () => {
    router.push('/project/detail/project/1/applyProject')
  }
  return (
    <div className="relative flex justify-between mt-[2.75rem]">
      {isModalOpen && (
        <BaseModal
          text={MODAL_TEXT_MAP[modalType]}
          btn={MODAL_BTN_TEXT_MAP[modalType]}
          onClose={() => setIsModalOpen(false)}
          onClick={MODAL_BTN_FUNCTION_MAP[modalType]}
        />
      )}
      {isApplicantModalOpen && selectedApplicant && (
        <ApplicantModal
          // applicant={data?.projectApplicants?.data}
          applicant={selectedApplicant}
          onClose={onClose}
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
        <div>
          <Profile projectDetail={data?.projectDetails?.data} />
          <Applicants
            projectType={projectType}
            applicants={data?.projectApplicants?.data || []}
            onOpen={onOpen}
          />
        </div>
        {/* <RecommendedMember /> */}
      </div>
      <div className="flex flex-col gap-7">
        <Member members={data?.projectDetails?.data.projectMember} />
        <Stack stacks={data?.projectDetails?.data?.teamStacks} />
        {data?.projectDetails?.data?.isRecruited && (
          <FindMember
            projectDetail={data?.projectDetails?.data}
            projectType={projectType}
          />
        )}
        <Results resultImages={data?.projectDetails.data.resultImages} />

        <button
          onClick={handleModal}
          className="w-full h-[2.16044rem] border border-primary text-primary rounded-md hover:shadow-md"
        >
          지원하기
        </button>
      </div>
    </div>
  )
}
