'use client'

import React, { useState, useRef, useEffect } from 'react'
import Select from '@/components/signup/Select'
import PositionSelect from '@/components/signup/PositionSelect'
import ExperienceSection from '@/components/signup/ExperienceSection'
import CareerToggle from '@/components/signup/CareerToggle'
import InputField from '@/components/common/InputField'
import EmailVerification from '@/components/common/EmailVerification'
import Link from 'next/link'
import axios from 'axios'

const Signup = () => {
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
    resumeUrl: '',
    githubUrl: '',
    blogUrl: '',
    selectedPositions: [] as string[],
    recommendation: null as string | null,
    employmentStatus: null as string | null,
    internshipExperience: null as string | null,
    jobExperience: null as string | null,

    // 경력 정보
    internships: [] as {
      internCompanyName: string
      internPositions: string[]
      internStartDate: string
      internEndDate: string
      isCurrentJob: boolean
    }[],
    fullTimes: [] as {
      fullTimeCompanyName: string
      fullTimePositions: string[]
      fullTimeStartDate: string
      fullTimeEndDate: string
      isCurrentJob: boolean
    }[],
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
    if (step < 2) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  // 비밀번호/비밀번호 확인 일치 여부
  const passwordsMatch =
    formData.password === formData.confirmPassword &&
    formData.password.length > 0

  // 회원가입 API
  const handleSignup = async () => {
    if (!formData.isVerified) {
      alert('이메일 인증을 완료해주세요.')
      return
    }

    if (!passwordsMatch) {
      alert('비밀번호가 일치하지 않습니다.')
      return
    }

    // internships와 fullTimes에서 첫 번째 항목만 예시로
    const internExperience = formData.internships[0] || {}
    const fullTimeExperience = formData.fullTimes[0] || {}

    const requestBody = {
      createUserRequest: {
        name: formData.name,
        email: formData.email,
        year: parseInt(formData.selectedBatch),
        password: formData.password,
        isLft: formData.recommendation === 'yes',
        githubUrl: formData.githubUrl,
        blogUrl: formData.blogUrl,
        mainPosition: formData.selectedPositions[0] || '',
        subPosition: formData.selectedPositions[1] || '',
        school: formData.school,
        class: formData.classYear,
        isIntern: formData.internshipExperience === 'yes',
        internCompanyName: internExperience.internCompanyName || '',
        internPosition: internExperience.internPositions
          ? internExperience.internPositions.join(', ')
          : '',
        internStartDate: internExperience.internStartDate || '',
        internEndDate: internExperience.internEndDate || '',
        isFullTime: formData.jobExperience === 'yes',
        fullTimeCompanyName: fullTimeExperience.fullTimeCompanyName || '',
        fullTimePosition: fullTimeExperience.fullTimePositions
          ? fullTimeExperience.fullTimePositions.join(', ')
          : '',
        fullTimeStartDate: fullTimeExperience.fullTimeStartDate || '',
        fullTimeEndDate: fullTimeExperience.fullTimeEndDate || '',
      },
      createResumeRequest: {
        url: formData.resumeUrl,
        title: formData.resumeTitle,
        category: 'PORTFOLIO',
      },
    }

    try {
      const response = await axios.post(
        'https://api.techeerzip.cloud/api/v1/users/signup',
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      if (response.status === 200) {
        alert('회원가입이 완료되었습니다.')
      } else {
        const error = response.data
        alert(`회원가입 실패: ${error.message}`)
      }
    } catch (err: any) {
      if (err.response) {
        const error = err.response.data
        alert(`회원가입 실패: ${error.message}`)
      } else {
        alert('네트워크 오류가 발생했습니다.')
      }
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

  // 인턴 경험 데이터 업데이트 함수
  const setInternships = (internships: any[]) => {
    setFormData((prev) => ({
      ...prev,
      internships,
    }))
  }

  // 정규직 경험 데이터 업데이트 함수
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
              setEmail={(email) => setFormData((prev) => ({ ...prev, email }))}
              setIsVerified={(isVerified) =>
                setFormData((prev) => ({ ...prev, isVerified }))
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

            {/* 비밀번호 확인 영역 */}
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
              {/* 불일치 시 경고 메시지 */}
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
            {/* 대학 및 학년 선택 */}
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
                  options={['1학년', '2학년', '3학년', '4학년', '해당 없음']}
                  value={formData.classYear}
                  onChange={(value) =>
                    setFormData((prev) => ({ ...prev, classYear: value }))
                  }
                />
              </div>
            </div>

            {/* 기수 선택 */}
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

            {/* 이력서 (제목 + 구글링크) */}
            <div>
              <div className="space-y-3">
                <InputField
                  label="이력서 제목"
                  name="resumeTitle"
                  placeholder="ex) 홍길동_20241225"
                  required={true}
                  value={formData.resumeTitle}
                  onChange={handleChange}
                />
                <InputField
                  label="이력서 링크"
                  name="resumeUrl"
                  placeholder="구글 드라이브 등 공유 링크"
                  required={true}
                  value={formData.resumeUrl}
                  onChange={handleChange}
                />
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

            {/* 추천 여부 */}
            <div>
              <p className="block text-lg mb-2.5 ">
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

            {/* 링크 입력 */}
            <div>
              <p className="block text-lg mb-2.5 ">
                링크를 입력해주세요 <span className="text-primary">*</span>
              </p>
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
                    블로그
                  </div>
                  <input
                    type="text"
                    name="blogUrl"
                    className="w-full h-10 px-4 border border-gray rounded-[0.25rem] focus:outline-none focus:border-primary"
                    value={formData.blogUrl}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* 취업 여부 */}
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
                  experienceType="intern"
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
                  experienceType="fullTime"
                />
              </>
            )}

            <div ref={bottomRef}></div>
          </div>
        )}

        {/* 다음 버튼 및 회원가입 버튼 */}
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

      {/* 오른쪽 배경 */}
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
