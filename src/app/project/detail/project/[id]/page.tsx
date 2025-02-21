'use client'

import Profile from '@/components/project/detail/Profile'
import Member from '@/components/project/detail/Member'
import Stack from '@/components/project/detail/Stack'
import FindMember from '@/components/project/detail/FindMember'
import Results from '@/components/project/detail/Results'
import Applicants from '@/components/project/detail/Applicants'
import { BiSolidPencil } from 'react-icons/bi'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import Lottie from 'react-lottie-player'
import loading from '../../../../../../public/loading.json'

import {
  getProjectDetail,
  deleteProjectTeam,
  getStudyApplicants,
  handleCloseProject,
  handleDenyProject,
} from '@/api/project/project/project'
import { useQuery } from '@tanstack/react-query'
import BaseModal from '@/components/project/modal/BaseModal'
import ApplicantModal from '@/components/project/modal/ApplicantModal'
import { useAuthStore } from '@/store/authStore'

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
  const queryClient = useQueryClient()

  const [projectId, setProjectId] = useState<number | null>(null)
  const [projectType, setProjectType] = useState<string | null>(null)

  useEffect(() => {
    const storedId = localStorage.getItem('projectId')
    const storedProjectType = localStorage.getItem('projectType')

    if (storedId) {
      setProjectId(Number(storedId))
    }

    if (storedProjectType) {
      setProjectType(storedProjectType)
    }
  }, [])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState<
    'delete' | 'close' | 'cancel' | null
  >(null)

  // (1) 프로젝트 상세 데이터
  const { data: projectDetails } = useQuery({
    queryKey: ['getProjectDetails', projectId],
    queryFn: () => getProjectDetail(projectId),
    enabled: projectId !== null,
  })

  // (2) 프로젝트 지원자 (팀원만 조회 가능하게 프론트에서 처리해야함)
  const { data: studyApplicants } = useQuery({
    queryKey: ['getStudyApplicants', projectId],
    queryFn: () => getStudyApplicants(projectId),
    enabled: projectId !== null,
  })

  // 지원자 모달
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

  // 지원하기 페이지 이동
  const handleModal = () => {
    router.push(`/project/detail/project/${projectId}/applyProject`)
  }

  // 로그인 유저 정보
  const { user } = useAuthStore()
  // 팀원 여부 판단
  const isTeamMember = projectDetails?.projectMember?.some(
    (member) => member.email === user?.email,
  )

  // 로딩 중
  if (!projectDetails) {
    return (
      <div className="flex flex-col items-center justify-center h-[800px]">
        <Lottie
          animationData={loading}
          loop={true}
          play
          style={{ width: 200, height: 200 }}
        />
      </div>
    )
  }

  const { isRecruited } = projectDetails

  // 현재 사용자가 이미 지원자인지 팒별
  const isApplicant = studyApplicants?.some((app) => app.userId === user?.id)

  // 모달 확인 클릭
  const handleModalConfirm = async () => {
    if (!projectId) return

    try {
      if (modalType === 'delete') {
        // 삭제하기
        await deleteProjectTeam(projectId)
        // 삭제 후 /project 페이지로 이동
        router.push('/project')
      } else if (modalType === 'close') {
        // 마감하기
        await handleCloseProject(projectId)
        // 새로고침
        router.refresh()
      } else if (modalType === 'cancel') {
        // 지원 취소
        await handleDenyProject(projectId)
        queryClient.invalidateQueries({
          queryKey: ['getStudyApplicants', projectId],
        })
        // 새로고침
        router.refresh()
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsModalOpen(false)
    }
  }

  return (
    <div className="relative flex justify-between mt-[2.75rem]">
      {isModalOpen && (
        <BaseModal
          text={MODAL_TEXT_MAP[modalType]}
          btn={MODAL_BTN_TEXT_MAP[modalType]}
          onClose={() => setIsModalOpen(false)}
          onClick={handleModalConfirm}
        />
      )}
      {isApplicantModalOpen && selectedApplicant && (
        <ApplicantModal
          applicant={studyApplicants}
          onClose={handleModalClose}
        />
      )}

      {/* (A) 팀원이라면 편집/삭제 */}
      {isTeamMember && (
        <div className="flex items-center justify-center absolute top-[-1rem] right-0 gap-2">
          <Link
            href={`/project/detail/project/edit/${projectId}`}
            className="flex justify-center items-center gap-2 text-primary font-semibold border border-primary rounded-xl w-[8.375rem] h-[2.125rem]"
          >
            <BiSolidPencil size={14} color="#FE9142" />
            편집하기
          </Link>
          <button
            onClick={() => {
              setIsModalOpen(true)
              setModalType('delete')
            }}
            className="flex justify-center items-center gap-2 text-primary font-semibold border border-primary rounded-xl w-[8.375rem] h-[2.125rem]"
          >
            <BiSolidPencil size={14} color="#FE9142" />
            삭제하기
          </button>
        </div>
      )}

      {/* 왼쪽 영역 */}
      <div>
        <Profile projectDetail={projectDetails} />

        {/* 팀원 + isRecruited → 지원자 목록 */}
        {isTeamMember && isRecruited && (
          <Applicants
            applicants={studyApplicants || []}
            onOpen={handleModalOpen}
            projectType="project"
          />
        )}
      </div>

      {/* 오른쪽 영역 */}
      <div className="flex flex-col gap-7">
        <Member members={projectDetails?.projectMember} />
        <Stack stacks={projectDetails?.teamStacks} />
        {isRecruited && (
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

        {/* 
          (A) 팀원이 아니고 isRecruited === true → 
          - 이미 지원자(isApplicant === true)면 '지원 취소하기'만 
          - 아니면 '지원하기'만
        */}
        {!isTeamMember && isRecruited && (
          <>
            {isApplicant ? (
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
              <button
                onClick={handleModal}
                className="w-full h-[2.16044rem] border border-primary text-primary rounded-md hover:shadow-md"
              >
                지원하기
              </button>
            )}
          </>
        )}

        {/* 팀원이면서 isRecruited → 마감하기 */}
        {isTeamMember && isRecruited && (
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
