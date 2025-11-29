import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import {
  useStudyDetailQuery,
  useUpdateStudyMutation,
} from '@/api/project/study'
import {
  EditStudyData,
  DeletedStudyMember,
  EditStudyMember,
} from '@/types/project/studyEdit'

export const useEditStudy = (studyId: number) => {
  const router = useRouter()
  const updateStudyMutation = useUpdateStudyMutation()

  // React Query: 스터디 상세 정보
  const { data: studyDetails, isLoading } = useStudyDetailQuery(studyId)

  // 편집용 상태
  const [studyData, setStudyData] = useState<EditStudyData | null>(null)
  const [deleteImages, setDeleteImages] = useState<number[]>([])
  const [tempDeleted, setTempDeleted] = useState<DeletedStudyMember[]>([])

  // 삭제된 스터디 체크 및 리다이렉트
  useEffect(() => {
    if (studyDetails && studyDetails.deleted) {
      alert('삭제된 스터디입니다.')
      router.push('/project')
    }
  }, [studyDetails, router])

  // 스터디 데이터 초기화
  useEffect(() => {
    if (!studyDetails) return

    // 삭제된 스터디는 초기화하지 않음
    if (studyDetails.deleted) return

    setStudyData({
        name: studyDetails.name || '',
        githubLink: studyDetails.githubLink || '',
        notionLink: studyDetails.notionLink || '',
        studyExplain: studyDetails.studyExplain || '',
        goal: studyDetails.goal || '',
        rule: studyDetails.rule || '',
        isFinished: studyDetails.finished || false,
        isRecruited: studyDetails.recruited || false,
        recruitNum: studyDetails.recruitNum || 0,
        recruitExplain: studyDetails.recruitExplain || '',
        // leader -> isLeader로 변환
        studyMember: studyDetails.studyMember
          ? studyDetails.studyMember.map((member) => ({
              ...member,
              isLeader: member.leader,
            }))
          : [],
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

  // FormData 준비 (JSON Blob 방식)
  const prepareFormData = useCallback(
    (data: EditStudyData): FormData => {
      const formData = new FormData()

      // 1) 결과 이미지들 추가 (새로 업로드하는 파일들)
      if (data.resultImages && Array.isArray(data.resultImages)) {
        data.resultImages.forEach((file: File) => {
          formData.append('resultImages', file)
        })
      }

      // 2) JSON 데이터 준비
      const { resultImages, ...studyWithoutImages } = data

      // 삭제되지 않은 멤버만 골라서 최종 전송할 형태로 변환
      const finalMember = studyWithoutImages.studyMember
        .filter((m: EditStudyMember) => {
          return !tempDeleted.some((td) => td.id === m.id)
        })
        .map((m: EditStudyMember) => ({
          userId: m.userId,
          isLeader: m.isLeader || false,
        }))

      const deleteMembers = tempDeleted.map((td) => td.id)

      const cleanedStudyData = {
        ...studyWithoutImages,
        studyMember: finalMember,
        deleteImages,
        deleteMembers,
      }

      // 3) JSON을 Blob으로 변환하여 FormData에 추가
      const json = new Blob([JSON.stringify(cleanedStudyData)], {
        type: 'application/json',
      })
      formData.append('updateStudyTeamRequest', json)

      return formData
    },
    [tempDeleted, deleteImages],
  )

  // 스터디 수정 제출
  const submitEditStudy = useCallback(async () => {
    if (updateStudyMutation.isPending || !studyData) return

    try {
      const validationError = validateStudyData(studyData)
      if (validationError) {
        alert(validationError)
        return
      }

      const formData = prepareFormData(studyData)
      const response = await updateStudyMutation.mutateAsync({
        studyId,
        data: formData,
      })

      // ID 찾기 및 페이지 이동
      const actualId = response?.id || response?.data?.id || studyId

      if (actualId) {
        router.push(`/project/detail/study/${actualId}`)
      } else {
        alert('스터디가 성공적으로 수정되었습니다!')
        router.push('/project')
      }
    } catch (error) {
      alert(error.message || '수정에 실패했습니다. 다시 시도해주세요.')
    }
  }, [
    updateStudyMutation,
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
    isSubmitting: updateStudyMutation.isPending,

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
