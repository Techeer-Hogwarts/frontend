import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { handleAddStudy } from '@/api/project/study/study' // 기존 함수 사용
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

    const { resultImages, ...studyWithoutImages } = data

    formData.append(
      'createStudyTeamRequest',
      JSON.stringify(studyWithoutImages),
    )

    resultImages.forEach((file) => {
      formData.append('files', file)
    })

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
      const response = await handleAddStudy(formData)

      if (response && response.id) {
        router.push(`/project/detail/study/${response.id}`)
      } else {
        throw new Error('스터디 등록에 실패했습니다.')
      }
    } catch (error) {
      console.error('스터디 등록 중 오류:', error)
      alert('등록에 실패하였습니다. 다시 시도해주세요.')
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
