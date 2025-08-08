import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSignupForm } from './useSignupForm'

export const useSignupHandler = () => {
  const router = useRouter()
  const [signupError, setSignupError] = useState<string>('')
  const [step, setStep] = useState(0)
  const [isTecheer, setIsTecheer] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const {
    formData,
    setFormData,
    setInternships,
    setFullTimes,
    handleChange,
    handlePositionSelect,
  } = useSignupForm()

  const passwordsMatch =
    formData.password === formData.confirmPassword &&
    formData.password.length > 0

  const handleTecheerSelect = (isTecheer: boolean) => {
    setIsTecheer(isTecheer)
  }

  const validateStepOne = () => {
    if (!formData.name.trim()) return '이름을 입력해주세요.'
    if (!formData.email.trim()) return '이메일을 입력해주세요.'
    if (!formData.password) return '비밀번호를 입력해주세요.'
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{8,}$/
    if (!passwordRegex.test(formData.password)) {
      return '비밀번호 양식에 맞지 않습니다. 영어, 숫자, 특수문자를 포함해주세요. 비밀번호는 8자 이상이어야 합니다.'
    }
    if (!formData.confirmPassword) return '비밀번호 확인을 입력해주세요.'
    if (!formData.isVerified) return '이메일 인증을 완료해주세요.'
    if (!passwordsMatch) return '비밀번호가 일치하지 않습니다.'
    return ''
  }

  const validateStepTwo = () => {
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
    if (!formData.isVerified) return '이메일 인증을 완료해주세요.'
    if (!isTecheer && !formData.joinReason) {
      return alert('가입 동기를 선택해주세요.')
    }
    return ''
  }

  const handleNext = () => {
    setSignupError('')

    if (step === 0) {
      if (isTecheer === null) {
        return alert('테커 소속 여부를 선택해주세요.')
      }
    }

    if (step === 1) {
      const error = validateStepOne()
      if (error) return alert(error)
    }

    if (step < 2) setStep(step + 1)
  }

  const handleBack = () => {
    setSignupError('')
    if (step > 0) setStep(step - 1)
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

    if (formData.internshipExperience === 'yes') {
      experiences.push(
        ...formData.internships.map((item) => ({
          companyName: item.companyName || '',
          position: item.position || formData.selectedPositions[0] || '',
          startDate: item.startDate || '',
          endDate: item.isFinished === false ? '' : item.endDate || '',
          category: '인턴',
          description: item.description || '',
          isFinished: item.isFinished ?? false,
        })),
      )
    }

    if (formData.jobExperience === 'yes') {
      experiences.push(
        ...formData.fullTimes.map((item) => ({
          companyName: item.companyName || '',
          position: item.position || formData.selectedPositions[0] || '',
          startDate: item.startDate || '',
          endDate: item.isFinished === false ? '' : item.endDate || '',
          category: '정규직',
          description: item.description || '',
          isFinished: item.isFinished ?? false,
        })),
      )
    }

    return experiences
  }

  const handleSignup = async () => {
    setSignupError('')
    const error = validateStepTwo()
    if (error) return alert(error)
    setIsLoading(true)

    const experiences = createExperiences()
    const finalSchool =
      formData.school === '해당 없음'
        ? formData.customSchool.trim()
        : formData.school

    const createUserRequest: any = {
      mainPosition: formData.selectedPositions[0] || '',
      subPosition: formData.selectedPositions[1] || '',
      name: formData.name,
      githubUrl: formData.githubUrl,
      isLft: formData.recommendation === 'yes',
      school: finalSchool,
      grade: formData.classYear,
      password: formData.password,
      email: formData.email,
      year: parseInt(formData.selectedBatch),
    }

    if (formData.tistoryUrl) createUserRequest.tistoryUrl = formData.tistoryUrl
    if (formData.mediumUrl) createUserRequest.mediumUrl = formData.mediumUrl
    if (formData.velogUrl) createUserRequest.velogUrl = formData.velogUrl

    const requestPayload = {
      createUserRequest,
      createUserExperienceRequest: { experiences },
      createResumeRequest: {
        category: formData.resumeCategory,
        position: formData.resumePosition,
        title: formData.resumeTitle,
        isMain: formData.resumeIsMain,
      },
    }

    try {
      const formDataToSend = new FormData()
      if (formData.resumeFile)
        formDataToSend.append('file', formData.resumeFile)
      formDataToSend.append(
        'createUserWithResumeRequest',
        JSON.stringify(requestPayload),
      )

      const response = await fetch('/api/users/signup', {
        method: 'POST',
        body: formDataToSend,
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        if (response.status === 400)
          return alert('필수 항목을 모두 입력해주세요.')
        if (response.status === 500) return alert('이미 등록된 이메일입니다.')
        if (response.status === 401) return alert(errorData.message)
      }

      router.push('/login?form=signup')
    } catch (err) {
      alert('네트워크 오류가 발생했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignupExternal = async () => {
    setSignupError('')
    const error = validateStepOne()
    if (error) return alert(error)
    setIsLoading(true)

    const requestPayload = {
      name: formData.name,
      password: formData.password,
      email: formData.email,
      joinReason: formData.joinReason,
    }

    try {
      const response = await fetch('/api/users/signup/external', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestPayload),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        if (response.status === 400)
          return alert('필수 항목을 모두 입력해주세요.')
        if (response.status === 500) return alert('이미 등록된 이메일입니다.')
        if (response.status === 401) return alert(errorData.message)
      }

      router.push('/login?form=signup')
    } catch (err) {
      alert('네트워크 오류가 발생했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignupPurpose = (purpose: string) => {
    setFormData((prev) => ({ ...prev, joinReason: purpose }))
  }

  const formRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const formElement = formRef.current
    if (formElement && bottomRef.current) {
      if (
        formData.employmentStatus === 'yes' ||
        formData.internshipExperience === 'yes' ||
        formData.jobExperience === 'yes' ||
        formData.internships.length > 0 ||
        formData.fullTimes.length > 0
      ) {
        formElement.scrollTo({
          top: bottomRef.current.offsetTop,
          behavior: 'smooth',
        })
      }
    }
  }, [
    formData.employmentStatus,
    formData.internshipExperience,
    formData.jobExperience,
    formData.internships.length,
    formData.fullTimes.length,
  ])

  return {
    signupError,
    step,
    isTecheer,
    isLoading,
    formData,
    handleChange,
    handlePositionSelect,
    handleNext,
    handleBack,
    handleSignup,
    handleSignupExternal,
    handleSignupPurpose,
    handleTecheerSelect,
    formRef,
    bottomRef,
    passwordsMatch,
    setFormData,
    setInternships,
    setFullTimes,
    setStep,
    setIsTecheer,
  }
}
