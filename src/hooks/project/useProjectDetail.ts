import { useState, useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useAuthStore } from '@/store/authStore'
import {
  getProjectDetail,
  deleteProjectTeam,
  getProjectApplicants,
  handleCloseProject,
  handleDenyProject,
} from '@/api/project/project/project'
import { ModalType, Applicant } from '@/types/project/project'
export const useProjectDetail = (projectId: number) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { user } = useAuthStore()

  // 모달 상태들
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState<ModalType>(null)
  const [isApplicantModalOpen, setIsApplicantModalOpen] = useState(false)
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(
    null,
  )

  // React Query: 프로젝트 상세 데이터
  const { data: projectDetails, isLoading: isProjectLoading } = useQuery({
    queryKey: ['getProjectDetails', projectId],
    queryFn: () => getProjectDetail(projectId),
    enabled: projectId !== null,
  })

  // React Query: 프로젝트 지원자 목록
  const { data: projectApplicants, error: applicantsError } = useQuery({
    queryKey: ['getProjectApplicants', projectId],
    queryFn: () => getProjectApplicants(projectId),
    enabled: projectId !== null,
  })

  // 계산된 값들
  const isTeamMember = useMemo(() => {
    return projectDetails?.projectMember?.some(
      (member) => member.userId === user?.id,
    )
  }, [projectDetails?.projectMember, user?.id])

  const isApplicant = useMemo(() => {
    if (isTeamMember || !user) return false

    // 지원자 목록이 성공적으로 조회된 경우
    if (projectApplicants) {
      return projectApplicants.some((app) => app.userId === user?.id)
    }

    // 에러가 발생한 경우 에러 메시지 확인
    if (applicantsError) {
      const errorMessage = applicantsError.message || ''

      if (errorMessage.includes('404')) {
        return false // 지원 가능 상태
      } else if (errorMessage.includes('409')) {
        return true // 이미 지원한 상태
      }
    }

    return null // 아직 확인 중
  }, [projectApplicants, applicantsError, isTeamMember, user])

  // 모달 텍스트 맵
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

  // 지원자 모달 핸들러
  const handleApplicantModalOpen = useCallback((applicant: Applicant) => {
    setSelectedApplicant(applicant)
    setIsApplicantModalOpen(true)
  }, [])

  const handleApplicantModalClose = useCallback(() => {
    setIsApplicantModalOpen(false)
    setSelectedApplicant(null)
  }, [])

  // 지원하기 핸들러
  const handleApplyProject = useCallback(() => {
    if (!user) {
      setAuthModalOpen(true)
      return
    }
    router.push(`/project/detail/project/${projectId}/applyProject`)
  }, [user, router, projectId])

  // 편집하기 핸들러
  const handleEdit = useCallback(() => {
    router.push(`/project/detail/project/edit/${projectId}`)
  }, [router, projectId])

  // 모달 열기 핸들러
  const openModal = useCallback((type: Exclude<ModalType, null>) => {
    setModalType(type)
    setIsModalOpen(true)
  }, [])

  // 모달 닫기 핸들러
  const closeModal = useCallback(() => {
    setIsModalOpen(false)
    setModalType(null)
  }, [])

  // 모달 확인 핸들러
  const handleModalConfirm = useCallback(async () => {
    if (!projectId || !modalType) return

    try {
      let success = false

      switch (modalType) {
        case 'delete':
          {
            const response = await deleteProjectTeam(projectId)
            success = response.ok
            if (success) {
              router.push('/project')
            }
          }
          break
        case 'close': {
          const response = await handleCloseProject(projectId)
          success = response.ok
          if (success) {
            queryClient.invalidateQueries({
              queryKey: ['getProjectDetails', projectId],
            })
            router.refresh()
          }
          break
        }
        case 'cancel': {
          const response = await handleDenyProject(projectId)
          success = response.ok
          if (success) {
            queryClient.invalidateQueries({
              queryKey: ['getProjectApplicants', projectId],
            })
            router.refresh()
          }
          break
        }
      }

      if (!success) {
        throw new Error('작업 실행에 실패했습니다.')
      }
    } catch (error) {
      console.error('모달 확인 처리 중 오류:', error)
      alert('작업 실행에 실패했습니다. 다시 시도해주세요.')
    } finally {
      closeModal()
    }
  }, [projectId, modalType, router, queryClient, closeModal])

  return {
    // 데이터
    projectDetails,
    projectApplicants,
    isProjectLoading,

    // 계산된 값들
    isTeamMember,
    isApplicant,

    // 모달 상태들
    authModalOpen,
    setAuthModalOpen,
    isModalOpen,
    modalType,
    isApplicantModalOpen,
    selectedApplicant,

    // 모달 텍스트
    MODAL_TEXT_MAP,
    MODAL_BTN_TEXT_MAP,

    // 핸들러들
    handleApplicantModalOpen,
    handleApplicantModalClose,
    handleApplyProject,
    handleEdit,
    openModal,
    closeModal,
    handleModalConfirm,
  }
}
