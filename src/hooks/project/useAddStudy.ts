import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { handleAddStudy } from '@/api/project/study'
import { StudyData } from '@/types/project/project'

export const useAddStudy = () => {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [studyData, setStudyData] = useState<StudyData>({
    name: '',
    githubLink: '',
    notionLink: '',
    studyExplain: '',
    goal: '',
    rule: '',
    isFinished: false,
    isRecruited: true,
    recruitNum: 0,
    recruitExplain: '',
    studyMember: [],
    resultImages: [],
  })

  const handleUpdate = useCallback((key: keyof StudyData, value: any) => {
    setStudyData((prev) => ({ ...prev, [key]: value }))
  }, [])

  const validateStudyData = useCallback((data: StudyData): string | null => {
    if (!data.name.trim()) {
      return '이름을 입력해주세요.'
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

    return null
  }, [])

  const prepareFormData = useCallback((data: StudyData): FormData => {
    const formData = new FormData()

    // 결과 이미지들 추가
    if (data.resultImages && Array.isArray(data.resultImages)) {
      data.resultImages.forEach((file: File) => {
        formData.append('resultImages', file)
      })
    }

    // JSON 데이터 준비 (이미지 파일들 제외)
    const { resultImages, ...studyWithoutImages } = data

    // studyMember에서 불필요한 필드 제거
    const cleanedStudyData = {
      ...studyWithoutImages,
      studyMember: studyWithoutImages.studyMember.map((member) => ({
        userId: member.userId,
        isLeader: member.isLeader,
      })),
    }

    // JSON을 Blob으로 변환
    const json = new Blob([JSON.stringify(cleanedStudyData)], {
      type: 'application/json',
    })
    formData.append('createStudyTeamRequest', json)

    return formData
  }, [])

  const submitStudy = useCallback(async () => {
    if (isSubmitting) return

    setIsSubmitting(true)

    try {
      const validationError = validateStudyData(studyData)
      if (validationError) {
        alert(validationError)
        return
      }

      const formData = prepareFormData(studyData)
      const response = await fetch('/api/studyTeams', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(
          errorData.message || `HTTP ${response.status}: 서버 오류`,
        )
      }

      const responseData = await response.json()
      router.push(`/project/detail/study/${responseData}`)
    } catch (error) {
      alert(error.message || '등록에 실패하였습니다.')
    } finally {
      setIsSubmitting(false)
    }
  }, [studyData, isSubmitting, validateStudyData, prepareFormData, router])

  return {
    studyData,
    isSubmitting,
    handleUpdate,
    submitStudy,
  }
}
