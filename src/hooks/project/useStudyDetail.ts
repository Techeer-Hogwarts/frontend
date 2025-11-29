import { useState, useEffect, useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { useAuthStore } from '@/store/authStore'
import {
  useStudyDetailQuery,
  useStudyApplicantsQuery,
  useDeleteStudyMutation,
  useCloseStudyMutation,
  useCancelStudyApplicationMutation,
} from '@/api/project/study'
import { ModalType } from '@/types/project/project'
import { Applicant } from '@/types/project/project'

export const useStudyDetail = (studyId: number) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { user } = useAuthStore()

  // 상태들
  const [isStudyMember, setIsStudyMember] = useState<boolean | null>(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isApplicantModalOpen, setIsApplicantModalOpen] = useState(false)
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(
    null,
  )
  const [modalType, setModalType] = useState<ModalType>(null)

  // React Query: 스터디 상세 정보
  const { data: studyDetails, isLoading: isStudyLoading } =
    useStudyDetailQuery(studyId)

  // React Query: 스터디 지원자 목록
  const { data: studyApplicants, error: applicantsError } =
    useStudyApplicantsQuery(studyId)

  // Mutations
  const deleteStudyMutation = useDeleteStudyMutation()
  const closeStudyMutation = useCloseStudyMutation()
  const cancelApplicationMutation = useCancelStudyApplicationMutation()

  // 삭제된 스터디 체크 및 리다이렉트
  useEffect(() => {
    if (studyDetails && studyDetails.deleted) {
      alert('삭제된 스터디입니다.')
      router.push('/project')
    }
  }, [studyDetails, router])

  // 스터디 멤버 여부 확인
  useEffect(() => {
    if (studyDetails && user) {
      const isMember = studyDetails.studyMember?.some(
        (member) => member.userId === user.id,
      )
      setIsStudyMember(isMember)
    }
  }, [studyDetails, user])

  const isApplicant = useMemo(() => {
    if (isStudyMember || !user) return false

    // 지원자 목록이 성공적으로 조회된 경우
    if (studyApplicants) {
      return studyApplicants.some((app) => app.userId === user?.id)
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
  }, [studyApplicants, applicantsError, isStudyMember, user])

  // 모달 텍스트 맵
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
  const handleApplyStudy = useCallback(() => {
    if (!user) {
      setAuthModalOpen(true)
      return
    }
    router.push(`/project/detail/study/${studyId}/applyStudy`)
  }, [user, router, studyId])

  // 편집하기 핸들러
  const handleEdit = useCallback(() => {
    router.push(`/project/detail/study/edit/${studyId}`)
  }, [router, studyId])

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
    if (!studyId || !modalType) return

    try {
      switch (modalType) {
        case 'delete':
          await deleteStudyMutation.mutateAsync(studyId)
          router.push('/project')
          break
        case 'close':
          await closeStudyMutation.mutateAsync(studyId)
          break
        case 'cancel':
          await cancelApplicationMutation.mutateAsync(studyId)
          break
      }
    } catch (error) {
      alert(error.message || '작업 실행에 실패했습니다.')
    } finally {
      closeModal()
    }
  }, [
    studyId,
    modalType,
    router,
    deleteStudyMutation,
    closeStudyMutation,
    cancelApplicationMutation,
    closeModal,
  ])

  return {
    // 데이터
    studyDetails,
    studyApplicants,
    isStudyLoading,

    // 계산된 값들
    isStudyMember,
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
    handleApplyStudy,
    handleEdit,
    openModal,
    closeModal,
    handleModalConfirm,
  }
}
