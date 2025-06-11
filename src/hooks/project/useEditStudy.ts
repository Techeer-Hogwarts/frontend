import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { getStudyDetail, handleEditStudy } from '@/api/project/study/study'
import {
  EditStudyData,
  DeletedStudyMember,
  EditStudyMember,
} from '@/types/project/studyEdit'

export const useEditStudy = (studyId: number) => {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // React Query: 스터디 상세 정보
  const { data: studyDetails, isLoading } = useQuery({
    queryKey: ['getStudyDetails', studyId],
    queryFn: () => getStudyDetail(studyId),
    enabled: !!studyId,
  })

  // 편집용 상태
  const [studyData, setStudyData] = useState<EditStudyData | null>(null)
  const [deleteImages, setDeleteImages] = useState<number[]>([])
  const [tempDeleted, setTempDeleted] = useState<DeletedStudyMember[]>([])

  // 스터디 데이터 초기화
  useEffect(() => {
    if (studyDetails) {
      setStudyData({
        name: studyDetails.name || '',
        githubLink: studyDetails.githubLink || '',
        notionLink: studyDetails.notionLink || '',
        studyExplain: studyDetails.studyExplain || '',
        goal: studyDetails.goal || '',
        rule: studyDetails.rule || '',
        isFinished: studyDetails.isFinished || false,
        isRecruited: studyDetails.isRecruited || false,
        recruitNum: studyDetails.recruitNum || 0,
        recruitExplain: studyDetails.recruitExplain || '',
        studyMember: studyDetails.studyMember || [],
        resultImages: [],
        deleteImages: [],
      })
    }
  }, [studyDetails])

  // 상태 업데이트 핸들러
  const handleUpdate = useCallback((key: keyof EditStudyData, value: any) => {
    setStudyData((prev) => (prev ? { ...prev, [key]: value } : null))
  }, [])

  // 결과 이미지 삭제 핸들러
  const handleDeleteOldResultImage = useCallback((oldId: number) => {
    setDeleteImages((prev) => [...prev, oldId])
  }, [])

  // 멤버 삭제 핸들러
  const handleDeleteMember = useCallback(
    (memberId: number, userId: number) => {
      const already = tempDeleted.some((item) => item.id === memberId)
      if (!already) {
        setTempDeleted((prev) => [...prev, { id: memberId, userId }])
      }
    },
    [tempDeleted],
  )

  // 멤버 복구 핸들러
  const handleRestoreMember = useCallback(
    (memberId: number, userId: number) => {
      setTempDeleted((prev) => prev.filter((item) => item.userId !== userId))
    },
    [],
  )

  // 유효성 검사
  const validateStudyData = useCallback(
    (data: EditStudyData): string | null => {
      if (!data.name?.trim()) {
        return '스터디 이름을 입력해주세요.'
      }

      if (!data.studyExplain?.trim()) {
        return '스터디 설명을 입력해주세요.'
      }

      if (data.studyMember.length === 0) {
        return '스터디 멤버를 최소 1명 이상 추가해주세요.'
      }

      if (!data.goal?.trim()) {
        return '스터디 목표를 입력해주세요.'
      }

      if (!data.rule?.trim()) {
        return '스터디 규칙을 입력해주세요.'
      }

      if (data.isRecruited) {
        if (data.recruitNum <= 0) {
          return '모집 인원은 1명 이상이어야 합니다.'
        }

        if (!data.recruitExplain?.trim()) {
          return '모집 설명을 입력해주세요.'
        }
      }

      const hasLeader = data.studyMember.some(
        (member: EditStudyMember) => member.isLeader,
      )
      if (!hasLeader) {
        return '리더를 한 명 이상 지정해주세요!'
      }

      return null
    },
    [],
  )

  // FormData 준비
  const prepareFormData = useCallback(
    (data: EditStudyData): FormData => {
      const formData = new FormData()

      // 삭제되지 않은 멤버만 골라서 최종 전송할 형태로 변환
      const finalMember = data.studyMember
        .filter((m: EditStudyMember) => {
          return !tempDeleted.some((td) => td.id === m.id)
        })
        .map((m: EditStudyMember) => ({
          userId: m.userId,
          isLeader: m.isLeader || false,
        }))

      const deleteMembers = tempDeleted.map((td) => td.id)

      // resultImages를 분리하고 나머지 데이터 준비
      const { resultImages, ...studyWithoutImages } = data

      // JSON 데이터를 FormData에 추가
      formData.append(
        'updateStudyTeamRequest',
        JSON.stringify({
          ...studyWithoutImages,
          studyMember: finalMember,
          deleteImages,
          deleteMembers,
        }),
      )

      // 파일들을 FormData에 추가
      resultImages.forEach((file: File) => {
        formData.append('files', file)
      })

      return formData
    },
    [tempDeleted, deleteImages],
  )

  // 스터디 수정 제출
  const submitEditStudy = useCallback(async () => {
    if (isSubmitting || !studyData) return

    setIsSubmitting(true)

    try {
      const validationError = validateStudyData(studyData)
      if (validationError) {
        alert(validationError)
        return
      }

      const formData = prepareFormData(studyData)
      const response = await handleEditStudy(formData, studyId)

      if (response && response.id) {
        router.push(`/project/detail/study/${response.id}`)
      } else {
        throw new Error('스터디 수정에 실패했습니다.')
      }
    } catch (error) {
      console.error('스터디 수정 중 오류:', error)
      alert('수정에 실패했습니다. 다시 시도해주세요.')
    } finally {
      setIsSubmitting(false)
    }
  }, [
    isSubmitting,
    studyData,
    studyId,
    router,
    validateStudyData,
    prepareFormData,
  ])

  return {
    // 데이터
    studyDetails,
    studyData,
    isLoading,
    isSubmitting,

    // 삭제 관련 상태
    tempDeleted,
    deleteImages,

    // 핸들러들
    handleUpdate,
    handleDeleteOldResultImage,
    handleDeleteMember,
    handleRestoreMember,
    submitEditStudy,
  }
}
