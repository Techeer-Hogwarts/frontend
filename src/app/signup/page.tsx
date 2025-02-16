'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Select from '@/components/signup/Select'
import PositionSelect from '@/components/signup/PositionSelect'
import ExperienceSection from '@/components/signup/ExperienceSection'
import CareerToggle from '@/components/signup/CareerToggle'
import InputField from '@/components/common/InputField'
import EmailVerification from '@/components/common/EmailVerification'
import Link from 'next/link'

const Signup = () => {
  const [signupError, setSignupError] = useState<string>('')
  const router = useRouter()

  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    isVerified: false,

    school: '',
    classYear: '',
    selectedBatch: '',
    resumeTitle: '',
    githubUrl: '',
    tistoryUrl: '',
    mediumUrl: '',
    velogUrl: '',
    selectedPositions: [] as string[],
    recommendation: null as string | null,
    employmentStatus: null as string | null,
    // CareerToggle에서 "있어요" 버튼을 누르면 'yes'로 저장됩니다.
    internshipExperience: null as string | null,
    jobExperience: null as string | null,

    // 경험 정보: 기존의 키 대신 unified한 키로 관리
    internships: [] as {
      companyName: string
      position: string
      startDate: string
      endDate: string
      isCurrentJob: boolean
    }[],
    fullTimes: [] as {
      companyName: string
      position: string
      startDate: string
      endDate: string
      isCurrentJob: boolean
    }[],

    // 이력서 추가 정보
    resumeFile: null as File | null,
    resumeCategory: 'RESUME',
    resumeIsMain: true,
    resumePosition: '',
  })

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleNext = () => {
    setSignupError('')
    if (step < 2) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    setSignupError('')
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const passwordsMatch =
    formData.password === formData.confirmPassword &&
    formData.password.length > 0

  const handleSignup = async () => {
    setSignupError('')

    if (!formData.isVerified) {
      setSignupError('이메일 인증을 완료해주세요.')
      return
    }

    if (!passwordsMatch) {
      setSignupError('비밀번호가 일치하지 않습니다.')
      return
    }

    // 경험 데이터를 백엔드 형식으로 통합
    const experiences: {
      companyName: string
      position: string
      startDate: string
      endDate: string
      category: string
    }[] = []

    if (formData.internshipExperience === 'yes') {
      experiences.push(
        ...formData.internships.map((item) => ({
          companyName: item.companyName || '',
          position: item.position || formData.selectedPositions[0] || '',
          startDate: item.startDate || '',
          endDate: item.isCurrentJob ? '' : item.endDate || '',
          category: '인턴',
        })),
      )
    }

    if (formData.jobExperience === 'yes') {
      experiences.push(
        ...formData.fullTimes.map((item) => ({
          companyName: item.companyName || '',
          position: item.position || formData.selectedPositions[0] || '',
          startDate: item.startDate || '',
          endDate: item.isCurrentJob ? '' : item.endDate || '',
          category: '정규직',
        })),
      )
    }

    const createUserRequest: any = {
      mainPosition: formData.selectedPositions[0] || '',
      subPosition: formData.selectedPositions[1] || '',
      name: formData.name,
      githubUrl: formData.githubUrl,
      isLft: formData.recommendation === 'yes',
      school: formData.school,
      grade: formData.classYear,
      password: formData.password,
      email: formData.email,
      year: parseInt(formData.selectedBatch),
    }

    if (formData.tistoryUrl) {
      createUserRequest.tistoryUrl = formData.tistoryUrl
    }
    if (formData.mediumUrl) {
      createUserRequest.mediumUrl = formData.mediumUrl
    }
    if (formData.velogUrl) {
      createUserRequest.velogUrl = formData.velogUrl
    }

    const requestPayload = {
      createUserRequest,
      createUserExperienceRequest: {
        experiences,
      },
      createResumeRequest: {
        category: formData.resumeCategory,
        position: formData.resumePosition,
        title: formData.resumeTitle,
        isMain: formData.resumeIsMain,
      },
    }

    console.log('Signup payload:', requestPayload)

    try {
      const formDataToSend = new FormData()
      if (formData.resumeFile) {
        formDataToSend.append('file', formData.resumeFile)
      }
      formDataToSend.append(
        'createUserWithResumeRequest',
        JSON.stringify(requestPayload),
      )

      const response = await fetch('/api/v1/users/signup', {
        method: 'POST',
        body: formDataToSend,
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        if (errorData?.message) {
          if (errorData.message.includes('Unique constraint failed')) {
            setSignupError(
              '이미 등록된 이메일입니다. 다른 이메일을 사용해주세요.',
            )
          } else {
            setSignupError(`회원가입 실패: ${errorData.message}`)
          }
        } else {
          setSignupError('회원가입 실패: 알 수 없는 오류가 발생했습니다.')
        }
        return
      }

      router.push('/login')
    } catch (err: any) {
      setSignupError('네트워크 오류가 발생했습니다.')
    }
  }

  const handlePositionSelect = (position: string) => {
    if (formData.selectedPositions.includes(position)) {
      setFormData((prev) => ({
        ...prev,
        selectedPositions: prev.selectedPositions.filter(
          (item) => item !== position,
        ),
      }))
    } else if (formData.selectedPositions.length < 2) {
      setFormData((prev) => ({
        ...prev,
        selectedPositions: [...prev.selectedPositions, position],
      }))
    }
  }

  const setInternships = (internships: any[]) => {
    setFormData((prev) => ({
      ...prev,
      internships,
    }))
  }

  const setFullTimes = (fullTimes: any[]) => {
    setFormData((prev) => ({
      ...prev,
      fullTimes,
    }))
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

  return (
    <div className="flex min-h-[calc(100vh-61px)] items-center justify-between">
      <div className="flex flex-col w-[44.75rem] h-full px-[7.25rem]">
        <h2 className="text-4xl font-extrabold text-center my-8 text-primary">
          Sign up
        </h2>
        {step === 1 ? (
          <div className="flex flex-col w-[30.25rem] space-y-9 justify-center my-auto">
            <InputField
              label="이름"
              name="name"
              placeholder="이름을 입력해주세요(시니어멘토는 영어 이름 입력 가능)"
              required={true}
              value={formData.name}
              onChange={handleChange}
            />
            <EmailVerification
              email={formData.email}
              isVerified={formData.isVerified}
              setEmail={(email) => setFormData((prev) => ({ ...prev, email }))}
              setIsVerified={(verified) =>
                setFormData((prev) => ({ ...prev, isVerified: verified }))
              }
            />
            <InputField
              label="비밀번호"
              name="password"
              placeholder="영어, 숫자, 특수문자를 포함한 8자 이상으로 입력해주세요"
              type="password"
              required={true}
              value={formData.password}
              onChange={handleChange}
            />
            <div className="relative">
              <InputField
                label="비밀번호 확인"
                name="confirmPassword"
                placeholder="비밀번호를 한 번 더 입력해주세요"
                type="password"
                showIcon={true}
                required={true}
                isChecked={
                  passwordsMatch && formData.confirmPassword.length > 0
                }
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {!passwordsMatch && formData.confirmPassword.length > 0 && (
                <p className="text-red-500 text-sm mt-1">
                  비밀번호가 일치하지 않습니다.
                </p>
              )}
            </div>
          </div>
        ) : (
          <div
            ref={formRef}
            className="flex flex-col w-[32.5rem] space-y-9 my-auto overflow-y-auto pr-6 h-[31.5rem]"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(0, 0, 0, 0.2) transparent',
            }}
          >
            <div>
              <p className="block text-lg mb-2.5">
                대학교 및 학년을 선택해주세요{' '}
                <span className="text-primary">*</span>
              </p>
              <div className="flex justify-between space-x-5">
                <Select
                  title="대학교"
                  options={[
                    '강원대학교',
                    '가톨릭대학교',
                    '가천대학교',
                    '광운대학교',
                    '단국대학교',
                    '대구가톨릭대학교',
                    '덕성여자대학교',
                    '동덕여자대학교',
                    '서강대학교',
                    '성결대학교',
                    '세종대학교',
                    '안양대학교',
                    '연세대학교',
                    '이화여자대학교',
                    '인천대학교',
                    '인하대학교',
                    '중앙대학교',
                    '창원대학교',
                    '충남대학교',
                    '충북대학교',
                    '평택대학교',
                    '부산대학교',
                    '한국공학대학교',
                    '한서대학교',
                    '한성대학교',
                    '호서대학교',
                    '해당 없음',
                  ]}
                  value={formData.school}
                  onChange={(value) =>
                    setFormData((prev) => ({ ...prev, school: value }))
                  }
                />
                <Select
                  title="학년"
                  options={[
                    '1학년',
                    '2학년',
                    '3학년',
                    '4학년',
                    '졸업',
                    '해당 없음',
                  ]}
                  value={formData.classYear}
                  onChange={(value) =>
                    setFormData((prev) => ({ ...prev, classYear: value }))
                  }
                />
              </div>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-lg ">
                기수를 선택해주세요 <span className="text-primary">*</span>
              </p>
              <div className="w-[9.5rem]">
                <Select
                  title="기수"
                  options={[
                    '1기',
                    '2기',
                    '3기',
                    '4기',
                    '5기',
                    '6기',
                    '7기',
                    '8기',
                    '9기',
                  ]}
                  value={formData.selectedBatch}
                  onChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      selectedBatch: value.replace('기', ''),
                    }))
                  }
                />
              </div>
            </div>

            {/* 이력서 섹션 */}
            <div>
              <div className="space-y-9">
                <InputField
                  label="이력서 제목"
                  name="resumeTitle"
                  placeholder="ex) 홍길동_이력서"
                  required={true}
                  value={formData.resumeTitle}
                  onChange={handleChange}
                />
                <div>
                  <label className="block text-lg mb-2.5">
                    이력서 파일 <span className="text-primary">*</span>
                  </label>
                  <input
                    type="file"
                    name="resumeFile"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const file = e.target.files?.[0] ?? null
                      setFormData((prev) => ({
                        ...prev,
                        resumeFile: file,
                      }))
                    }}
                    className="w-full"
                  />
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="resumeIsMain"
                      checked={formData.resumeIsMain}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          resumeIsMain: e.target.checked,
                        }))
                      }
                      className="w-4 h-4 mr-2 border border-gray rounded"
                    />
                    <label className="text-sm text-gray mt-1">
                      메인 이력서로 사용
                    </label>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <div className="w-1/2">
                    <label className="block text-lg mb-2.5">
                      이력서 카테고리 <span className="text-primary">*</span>
                    </label>
                    <Select
                      title="카테고리"
                      options={['RESUME', 'PORTFOLIO', 'ICT', 'OTHER']}
                      value={formData.resumeCategory}
                      onChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          resumeCategory: value,
                        }))
                      }
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block text-lg mb-2.5">
                      이력서 포지션 <span className="text-primary">*</span>
                    </label>
                    <Select
                      title="포지션"
                      options={[
                        'FRONTEND',
                        'BACKEND',
                        'DEVOPS',
                        'FULL_STACK',
                        'DATA_ENGINEER',
                      ]}
                      value={formData.resumePosition}
                      onChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          resumePosition: value,
                        }))
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 포지션 선택 */}
            <div>
              <p className="block text-lg mb-2.5 ">
                포지션을 선택해주세요 <span className="text-primary">*</span>
              </p>
              <PositionSelect
                selectedPositions={formData.selectedPositions}
                handlePositionSelect={handlePositionSelect}
              />
            </div>

            <div>
              <p className="block text-lg mb-2.5">
                본인의 프로필을 다른 사람들에게 추천하여 프로젝트에 참여할
                기회를 늘릴까요? <span className="text-primary">*</span>
              </p>
              <div className="flex justify-between space-x-5">
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, recommendation: 'yes' }))
                  }
                  className={`w-full h-10 border rounded-[0.25rem] ${
                    formData.recommendation === 'yes'
                      ? 'bg-primary text-white border-primary'
                      : 'text-gray border-gray'
                  }`}
                >
                  예, 추천해주세요
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, recommendation: 'no' }))
                  }
                  className={`w-full h-10 border rounded-[0.25rem] ${
                    formData.recommendation === 'no'
                      ? 'bg-primary text-white border-primary'
                      : 'text-gray border-gray'
                  }`}
                >
                  아니요, 추천하지 마세요
                </button>
              </div>
            </div>

            <div>
              <p className="block text-lg mb-2.5">링크를 입력해주세요</p>
              <div className="flex flex-col space-y-2">
                <div className="flex justify-between space-x-5">
                  <div className="flex items-center justify-center w-[10rem] h-10 rounded-[0.25rem] text-primary border border-primary">
                    깃허브
                  </div>
                  <input
                    type="text"
                    name="githubUrl"
                    className="w-full h-10 px-4 border border-gray rounded-[0.25rem] focus:outline-none focus:border-primary"
                    value={formData.githubUrl}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex justify-between space-x-5">
                  <div className="flex items-center justify-center w-[10rem] h-10 rounded-[0.25rem] text-primary border border-primary">
                    미디엄
                  </div>
                  <input
                    type="text"
                    name="mediumUrl"
                    className="w-full h-10 px-4 border border-gray rounded-[0.25rem] focus:outline-none focus:border-primary"
                    value={formData.mediumUrl}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex justify-between space-x-5">
                  <div className="flex items-center justify-center w-[10rem] h-10 rounded-[0.25rem] text-primary border border-primary">
                    벨로그
                  </div>
                  <input
                    type="text"
                    name="velogUrl"
                    className="w-full h-10 px-4 border border-gray rounded-[0.25rem] focus:outline-none focus:border-primary"
                    value={formData.velogUrl}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex justify-between space-x-5">
                  <div className="flex items-center justify-center w-[10rem] h-10 rounded-[0.25rem] text-primary border border-primary">
                    티스토리
                  </div>
                  <input
                    type="text"
                    name="tistoryUrl"
                    className="w-full h-10 px-4 border border-gray rounded-[0.25rem] focus:outline-none focus:border-primary"
                    value={formData.tistoryUrl}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <CareerToggle
              title="인턴, 취업 등 일 경험이 있나요?"
              value={formData.employmentStatus}
              setValue={(value) =>
                setFormData((prev) => ({ ...prev, employmentStatus: value }))
              }
            />

            {formData.employmentStatus === 'yes' && (
              <>
                <ExperienceSection
                  title="인턴 경험이 있나요?"
                  experienceStatus={formData.internshipExperience}
                  setExperienceStatus={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      internshipExperience: value,
                    }))
                  }
                  experienceData={formData.internships}
                  setExperienceData={setInternships}
                  experienceType="인턴"
                />
                <ExperienceSection
                  title="정규직 경험이 있나요?"
                  experienceStatus={formData.jobExperience}
                  setExperienceStatus={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      jobExperience: value,
                    }))
                  }
                  experienceData={formData.fullTimes}
                  setExperienceData={setFullTimes}
                  experienceType="정규직"
                />
              </>
            )}

            {signupError && (
              <p className="text-sm mt-2 text-red-500">{signupError}</p>
            )}

            <div ref={bottomRef}></div>
          </div>
        )}

        <div className="flex my-10">
          {step === 1 ? (
            <button
              type="button"
              onClick={handleNext}
              className="w-[30.25rem] h-10 text-xl border border-gray text-gray rounded-full focus:border-primary focus:text-primary"
            >
              다음
            </button>
          ) : (
            <div className="flex flex-col space-y-2">
              <button
                type="button"
                onClick={handleBack}
                className="w-[30.25rem] h-10 text-xl border border-gray text-gray rounded-full focus:border-primary focus:text-primary"
              >
                이전
              </button>
              <button
                type="button"
                className="w-[30.25rem] h-10 text-xl border border-primary text-primary rounded-full hover:bg-primary hover:text-white"
                onClick={handleSignup}
              >
                회원가입
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="w-[30.25rem] min-h-[calc(100vh-61px)] bg-gradient-to-b from-[#FF8B20] to-[#FFC14F] text-center text-white flex flex-col justify-center">
        <h3 className="text-4xl font-extrabold mt-[12.5rem]">
          Growing with
          <br />
          Techeer!
        </h3>
        <p className="text-xl mt-9">
          함께 경험하고 성장하는
          <br />
          개발자그룹에 조인해보세요
        </p>
        <p className="text-base mt-auto mb-6">이미 회원이신가요?</p>
        <Link href="/login" className="underline text-xl mb-[7.5rem]">
          로그인 하러가기
        </Link>
      </div>
    </div>
  )
}

export default Signup
