import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSignupForm } from './useSignupForm'
import { upgradeTecheer } from '@/api/auth/techeer'
import { useAuthStore } from '@/store/authStore'

export const useTecheerJoin = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuthStore()

  const {
    formData,
    setFormData,
    setInternships,
    setFullTimes,
    handleChange,
    handlePositionSelect,
  } = useSignupForm()

  const validateForm = () => {
    if (!formData.email.trim()) return '이메일을 입력해주세요.'
    if (!formData.school.trim()) return '대학교를 선택해주세요.'
    if (formData.school === '해당 없음' && !formData.customSchool.trim()) {
      return '학교명을 직접 입력해주세요.'
    }
    if (!formData.classYear.trim()) return '학년을 선택해주세요.'
    if (!formData.selectedBatch.trim()) return '기수를 선택해주세요.'
    if (!formData.resumeTitle.trim()) return '이력서 제목을 입력해주세요.'
    if (!formData.resumeFile) return '이력서 파일을 업로드해주세요.'
    if (!formData.resumeCategory.trim())
      return '이력서 카테고리를 선택해주세요.'
    if (!formData.resumePosition) return '이력서 포지션을 선택해주세요.'
    if (formData.selectedPositions.length === 0) return '포지션을 선택해주세요.'
    if (!formData.recommendation) return '추천 여부를 선택해주세요.'
    if (!formData.githubUrl.trim()) return '깃허브 URL을 입력해주세요.'
    if (!formData.employmentStatus) return '경력 여부를 선택해주세요.'
    if (formData.employmentStatus === 'yes') {
      if (!formData.internshipExperience)
        return '인턴 경험 여부를 선택해주세요.'
      if (!formData.jobExperience) return '정규직 경험 여부를 선택해주세요.'
    }
    return ''
  }

  const createExperiences = () => {
    const experiences: {
      companyName: string
      position: string
      startDate: string
      endDate: string
      category: string
      description?: string
      isFinished?: boolean
    }[] = []

    // 인턴 경험 추가
    if (formData.internshipExperience === 'yes') {
      formData.internships.forEach((internship) => {
        experiences.push({
          companyName: internship.companyName,
          position: internship.position,
          startDate: internship.startDate,
          endDate: internship.endDate,
          category: 'INTERN',
          description: internship.description,
          isFinished: internship.isFinished,
        })
      })
    }

    // 정규직 경험 추가
    if (formData.jobExperience === 'yes') {
      formData.fullTimes.forEach((fulltime) => {
        experiences.push({
          companyName: fulltime.companyName,
          position: fulltime.position,
          startDate: fulltime.startDate,
          endDate: fulltime.endDate,
          category: 'FULLTIME',
          description: fulltime.description,
          isFinished: fulltime.isFinished,
        })
      })
    }

    return experiences
  }

  const handleUpgrade = async () => {
    const error = validateForm()
    if (error) return alert(error)

    setIsLoading(true)

    try {
      const experiences = createExperiences()

      const formDataToSend = new FormData()

      // 테커 전환에 필요한 데이터 구성
      const updateUserTecheerInfoRequest = {
        email: formData.email, // 현재 사용자 이메일 사용
        year: parseInt(formData.selectedBatch),
        mainPosition: formData.selectedPositions[0] || '', // 첫 번째 선택한 포지션
        subPosition: formData.selectedPositions.slice(1).join(','), // 나머지 포지션들
        githubUrl: formData.githubUrl,
        isLft: formData.recommendation === 'yes', // 추천 여부를 boolean으로 변환
        school:
          formData.school === '해당 없음'
            ? formData.customSchool
            : formData.school,
        grade: formData.classYear,
        tistoryUrl: formData.tistoryUrl || '',
        mediumUrl: formData.mediumUrl || '',
        velogUrl: formData.velogUrl || '',
      }

      const createUserExperienceRequest = {
        experiences: experiences.map((exp) => ({
          position: exp.position,
          companyName: exp.companyName,
          startDate: exp.startDate,
          endDate: exp.endDate,
          category: exp.category,
          isFinished: exp.isFinished || false,
          description: exp.description || '경험에 대한 간단한 설명입니다.',
        })),
      }

      const createResumeRequest = {
        category: formData.resumeCategory,
        position: formData.resumePosition,
        title: formData.resumeTitle,
        isMain: formData.resumeIsMain,
      }

      // 전체 요청을 하나의 객체로 구성
      const updateUserTecheerInfoWithResumeRequest = {
        updateUserTecheerInfoRequest,
        createUserExperienceRequest,
        createResumeRequest,
      }

      // FormData에 JSON 데이터 추가
      formDataToSend.append(
        'updateUserTecheerInfoWithResumeRequest',
        JSON.stringify(updateUserTecheerInfoWithResumeRequest),
      )

      // 파일 추가
      if (formData.resumeFile) {
        formDataToSend.append('file', formData.resumeFile)
      }

      await upgradeTecheer(formDataToSend)

      alert('테커 전환이 완료되었습니다!')
      router.push('/')
    } catch (err: any) {
      console.error('테커 전환 오류:', err)

      if (err.status === 404) {
        // 404 에러의 경우 서버에서 제공하는 상세 에러 메시지 표시
        alert(err.message || '요청한 리소스를 찾을 수 없습니다.')
      } else if (err.status === 400) {
        // 400 에러의 경우도 서버 메시지 우선 표시
        alert(err.message || '필수 항목을 모두 입력해주세요.')
      } else if (err.status === 500) {
        alert('서버 오류가 발생했습니다.')
      } else if (err.status === 401) {
        alert(err.message || '인증에 실패했습니다.')
      } else {
        alert(err.message || '네트워크 오류가 발생했습니다.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const bottomRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)

  return {
    formData,
    setFormData,
    setInternships,
    setFullTimes,
    handleChange,
    handlePositionSelect,
    isLoading,
    handleUpgrade,
    bottomRef,
    formRef,
  }
}
