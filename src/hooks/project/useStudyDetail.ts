import { useState, useEffect, useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useAuthStore } from '@/store/authStore'
import {
  getStudyDetail,
  handleCloseStudy,
  deleteStudyTeam,
  getStudyApplicants,
  handleDenyStudy,
} from '@/api/project/study/study'
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
  const { data: studyDetails, isLoading: isStudyLoading } = useQuery({
    queryKey: ['getStudyDetails', studyId],
    queryFn: () => getStudyDetail(studyId),
    enabled: !!studyId,
  })

  // React Query: 스터디 지원자 목록
  const { data: studyApplicants } = useQuery({
    queryKey: ['getStudyApplicants', studyId],
    queryFn: () => getStudyApplicants(studyId),
    enabled: !!studyId,
  })

  // 스터디 멤버 여부 확인
  useEffect(() => {
    if (studyDetails && user) {
      const isMember = studyDetails.studyMember?.some(
        (member) => member.userId === user.id,
      )
      setIsStudyMember(isMember)
    }
  }, [studyDetails, user])

  // 지원 여부 확인
  const hasApplied = useMemo(() => {
    return studyApplicants?.some((applicant) => applicant.userId === user?.id)
  }, [studyApplicants, user?.id])

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
      let response

      switch (modalType) {
        case 'delete':
          response = await deleteStudyTeam(studyId)
          if (response && (response.ok || response.status === 200)) {
            router.push('/project')
          } else {
            throw new Error('삭제에 실패했습니다.')
          }
          break
        case 'close':
          response = await handleCloseStudy(studyId)
          if (response && (response.ok || response.status === 200)) {
            queryClient.invalidateQueries({
              queryKey: ['getStudyDetails', studyId],
            })
          } else {
            throw new Error('스터디 종료에 실패했습니다.')
          }
          break
        case 'cancel':
          response = await handleDenyStudy(studyId)
          if (response && (response.ok || response.status === 200)) {
            queryClient.invalidateQueries({
              queryKey: ['getStudyApplicants', studyId],
            })
          } else {
            throw new Error('취소 처리에 실패했습니다.')
          }
          break
      }
    } catch (error) {
      alert(error.message || '작업 실행에 실패했습니다.')
    } finally {
      closeModal()
    }
  }, [studyId, modalType, router, queryClient, closeModal])

  return {
    // 데이터
    studyDetails,
    studyApplicants,
    isStudyLoading,

    // 계산된 값들
    isStudyMember,
    hasApplied,

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
