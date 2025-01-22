'use client'

import Profile from '@/components/project/detail/Profile'
import Member from '@/components/project/detail/Member'
import FindMember from '@/components/project/detail/FindMember'
import StudyGoal from '@/components/project/detail/StudyGoal'
import StudyPlan from '@/components/project/detail/StudyPlan'
import Results from '@/components/project/detail/Results'
import BaseModal from '@/components/project/modal/BaseModal'
// import RecommendedMember from '@/components/project/detail/RecommendedMember'
import Applicants from '@/components/project/detail/Applicants'
import ApplicantModal from '@/components/project/modal/ApplicantModal'

import { BiSolidPencil } from 'react-icons/bi'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import {
  getStudyDetail,
  getStudyMember,
  handleCloseStudy,
  deleteStudyTeam,
  getStudyApplicants,
  handleDenyStudy,
} from '@/api/project/study/\bstudy'

export default function ProjectDetailpage() {
  const MODAL_TEXT_MAP = {
    delete: '스터디를 삭제하시겠습니까?',
    close: '스터디를 마감하시겠습니까?',
    cancel: '스터디 지원을 취소하시겠습니까?',
  }

  const MODAL_BTN_TEXT_MAP = {
    delete: '삭제',
    close: '마감',
    cancel: '취소',
  }

  const MODAL_BTN_FUNCTION_MAP = {
    delete: () => deleteStudyTeam(projectId),
    close: () => handleCloseStudy(projectId),
    cancel: () => handleDenyStudy(projectId),
  }

  const router = useRouter()
  const projectId = Number(localStorage.getItem('projectId'))
  const projectType = localStorage.getItem('projectType')

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isApplicantModalOpen, setIsApplicantModalOpen] = useState(false)
  const [modalType, setModalType] = useState<
    'delete' | 'close' | 'cancel' | null
  >(null)

  // React Query로 데이터 가져오기
  const { data } = useQuery({
    queryKey: ['getStudyDetailsAndApplicants', projectId],
    queryFn: async () => {
      const [studyDetails, studyMember, studyApplicants] = await Promise.all([
        getStudyDetail(projectId),
        getStudyMember(projectId),
        // getStudyApplicants(projectId),
      ])
      return { studyDetails, studyMember, studyApplicants }
    },
  })

  // 지원자 상세 조회 모달 여닫기
  const onClose = () => {
    setIsApplicantModalOpen(false)
  }
  const onOpen = () => {
    setIsApplicantModalOpen(true)
  }

  const handleModal = () => {
    router.push(`/project/detail/study/${projectId}/applyStudy`)
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
      {isApplicantModalOpen && (
        <ApplicantModal
          applicant={data?.studyApplicants?.data}
          onClose={onClose}
        />
      )}
      <div className="flex items-center justify-center absolute top-[-1rem] right-0 gap-2">
        <Link
          href={`/project/detail/study/edit/${projectId}`}
          className="flex justify-center items-center gap-2 text-primary font-semibold border border-primary rounded-xl w-[8.375rem] h-[2.125rem] "
        >
          <BiSolidPencil size={14} color="#FE9142" />
          편집하기
        </Link>
        <button
          onClick={() => {
            setIsModalOpen(true)
            setModalType('delete')
          }}
          className="flex justify-center items-center gap-2 text-primary font-semibold border border-primary rounded-xl w-[8.375rem] h-[2.125rem] "
        >
          <BiSolidPencil size={14} color="#FE9142" />
          삭제하기
        </button>
      </div>
      <div>
        <Profile
          type={projectType === 'study' ? 'study' : 'project'}
          projectDetail={data?.studyDetails.data}
        />
        {/* <RecommendedMember studyDetail={} /> */}
        <Applicants
          applicants={data?.studyApplicants?.data || []}
          onOpen={onOpen}
        />
      </div>
      <div className="flex flex-col gap-7">
        <Member members={data?.studyMember?.data.members} />
        <StudyGoal goal={data?.studyDetails?.data.goal} />
        <StudyPlan rule={data?.studyDetails?.data.rule} />
        {data?.studyDetails.data.isRecruited && (
          <FindMember
            projectDetail={data?.studyDetails?.data}
            projectType={projectType}
          />
        )}
        <Results resultImages={data?.studyDetails.data.resultImages} />

        <button
          onClick={handleModal}
          className="w-full h-[2.16044rem] border border-primary text-primary rounded-md hover:shadow-md"
        >
          지원하기
        </button>
        <button
          onClick={() => {
            setIsModalOpen(true)
            setModalType('cancel')
          }}
          className="w-full h-[2.16044rem] border border-primary text-primary rounded-md hover:shadow-md"
        >
          지원 취소하기
        </button>
        <button
          onClick={() => {
            setIsModalOpen(true)
            setModalType('close')
          }}
          className="w-full h-[2.16044rem] border border-primary text-primary rounded-md hover:shadow-md"
        >
          마감하기
        </button>
      </div>
    </div>
  )
}
