'use client'

import Profile from '@/components/project/detail/study/Profile'
import Member from '@/components/project/detail/study/Member'
import FindMember from '@/components/project/detail/study/FindMember'
import StudyGoal from '@/components/project/detail/study/StudyGoal'
import StudyPlan from '@/components/project/detail/study/StudyPlan'
import Results from '@/components/project/detail/study/Results'
import BaseModal from '@/components/project/modal/BaseModal'
import Applicants from '@/components/project/detail/study/Applicants'
import ApplicantModal from '@/components/project/modal/study/ApplicantModal'

import { BiSolidPencil } from 'react-icons/bi'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import {
  getStudyDetail,
  handleCloseStudy,
  deleteStudyTeam,
  getStudyApplicants,
  handleDenyStudy,
} from '@/api/project/study/study'
import { useAuthStore } from '@/store/authStore'

const MODAL_TEXT_MAP = {
  delete: '스터디를 삭제하시겠습니까?',
  close: '스터디를 마감하시겠습니까?',
  cancel: '스터디 지원을 취소하시겠습니까?',
}

const MODAL_BTN_TEXT_MAP = {
  delete: '삭제',
  close: '마감',
  cancel: '확인',
}

export default function ProjectDetailpage() {
  const router = useRouter()
  const projectId = Number(localStorage.getItem('projectId'))
  const projectType = localStorage.getItem('projectType')

  const [isStudyMember, setIsStudyMember] = useState<null | boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isApplicantModalOpen, setIsApplicantModalOpen] = useState(false)
  const [selectedApplicant, setSelectedApplicant] = useState(null)

  const [modalType, setModalType] = useState<
    'delete' | 'close' | 'cancel' | null
    >(null)
  
  const {user} = useAuthStore()

  const queryClient = useQueryClient()

  // 스터디 상세 정보 가져오기
  const { data: studyDetails } = useQuery({
    queryKey: ['getStudyDetails', projectId],
    queryFn: () => getStudyDetail(projectId),
  })

  useEffect(() => {
    if (studyDetails) {
      const isMember = studyDetails.studyMember?.some(
        (member) => member.userId === user?.id,
      )
      setIsStudyMember(isMember)
    }
  }, [studyDetails, user])

  // 지원자 정보 불러오기
  const { data: studyApplicants } = useQuery({
    queryKey: ['getStudyApplicants', projectId],
    queryFn: () => getStudyApplicants(projectId),
  })

  // 현재 사용자가 이미 지원했는지 확인
  const hasApplied = studyApplicants?.some(
    (applicant) => applicant.userId === user?.id,
  )

  // 지원자 상세 조회 모달 여닫기
  const onClose = () => {
    setIsApplicantModalOpen(false)
    setSelectedApplicant(null)
  }
  const onOpen = (applicant) => {
    setSelectedApplicant(applicant)
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
          onClose={() => {
            setIsModalOpen(false)
          }}
          onClick={async () => {
            if (modalType === 'delete') {
              const success = await deleteStudyTeam(projectId)
              if (success) {
                setIsModalOpen(false)
                router.push(`/project`)
              }
            }
            if (modalType === 'close') {
              const success = await handleCloseStudy(projectId)
              if (success) {
                setIsModalOpen(false)
                queryClient.invalidateQueries({
                  queryKey: ['getStudyDetails', projectId],
                })
              }
            }
            if (modalType === 'cancel') {
              const success = await handleDenyStudy(projectId)
              if (success) {
                setIsModalOpen(false)
                queryClient.invalidateQueries({
                  queryKey: ['getStudyApplicants', projectId],
                })
              }
            }
          }}
        />
      )}
      {isApplicantModalOpen && (
        <ApplicantModal applicant={selectedApplicant} onClose={onClose} />
      )}

      {/* 편집하기 버튼 & 삭제 버튼: 사용자가 studyMember일 경우만 렌더링 */}
      {isStudyMember && (
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
      )}

      <div>
        <Profile
          type={projectType === 'study' ? 'study' : 'project'}
          projectDetail={studyDetails}
        />

        {/* Applicants 컴포넌트: 스터디 멤버일 경우만 렌더링 */}
        {isStudyMember && (
          <Applicants applicants={studyApplicants || []} onOpen={onOpen} />
        )}
      </div>

      <div className="flex flex-col gap-7">
        <Member members={studyDetails?.studyMember || []} />
        <StudyGoal goal={studyDetails?.goal} />
        <StudyPlan rule={studyDetails?.rule} />
        {studyDetails?.isRecruited && (
          <FindMember projectDetail={studyDetails} projectType={projectType} />
        )}
        <Results resultImages={studyDetails?.resultImages} />

        {studyDetails?.isRecruited && (
          <>
            {hasApplied ? (
              <button
                onClick={() => {
                  setIsModalOpen(true)
                  setModalType('cancel')
                }}
                className="w-full h-[2.16044rem] border border-primary text-primary rounded-md hover:shadow-md"
              >
                지원 취소하기
              </button>
            ) : (
              !isStudyMember && (
                <button
                  onClick={handleModal}
                  className="w-full h-[2.16044rem] border border-primary text-primary rounded-md hover:shadow-md"
                >
                  지원하기
                </button>
              )
            )}
          </>
        )}

        {studyDetails?.isRecruited && isStudyMember && (
          <button
            onClick={() => {
              setIsModalOpen(true)
              setModalType('close')
            }}
            className="w-full h-[2.16044rem] border border-primary text-primary rounded-md hover:shadow-md"
          >
            마감하기
          </button>
        )}
      </div>
    </div>
  )
}
