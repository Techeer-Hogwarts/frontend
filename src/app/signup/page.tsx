'use client'

import React, { useState, useRef, useEffect } from 'react'
import Select from '@/components/signup/Select'
import PositionSelect from '@/components/signup/PositionSelect'
import ExperienceSection from '@/components/signup/ExperienceSection'
import CareerToggle from '@/components/signup/CareerToggle'
import InputField from '@/components/common/InputField'
import EmailVerification from '@/components/common/EmailVerification'
import Link from 'next/link'

const Signup = () => {
  const [step, setStep] = useState(1)

  const [selectedPositions, setSelectedPositions] = useState<string[]>([]) // 포지션 선택
  const [recommendation, setRecommendation] = useState<string | null>(null) // 추천 여부
  const [employmentStatus, setEmploymentStatus] = useState<string | null>(null) // 인턴, 취업 경험 yes or no
  const [internshipExperience, setInternshipExperience] = useState<
    string | null
  >(null) // 인턴 경험 yes or no
  const [jobExperience, setJobExperience] = useState<string | null>(null) // 취업 경험 yes or no
  const [internshipItems, setInternshipItems] = useState<number[]>([]) // 인턴 경력 아이템 배열
  const [jobItems, setJobItems] = useState<number[]>([]) // 정규직 경력 아이템 배열

  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1)
    }
  }

  const handlePositionSelect = (position: string) => {
    if (selectedPositions.includes(position)) {
      // 이미 선택된 포지션이면 해제
      setSelectedPositions(
        selectedPositions.filter((item) => item !== position),
      )
    } else if (selectedPositions.length < 2) {
      // 2개 미만 선택된 경우 추가
      setSelectedPositions([...selectedPositions, position])
    }
  }

  // 인턴 경력 추가
  const addInternshipExperience = () => {
    setInternshipItems([...internshipItems, internshipItems.length + 1])
  }

  // 정규직 경력 추가
  const addJobExperience = () => {
    setJobItems([...jobItems, jobItems.length + 1])
  }

  // 인턴 경력 삭제
  const removeInternshipExperience = (index: number) => {
    setInternshipItems(internshipItems.filter((_, i) => i !== index))
  }

  // 정규직 경력 삭제
  const removeJobExperience = (index: number) => {
    setJobItems(jobItems.filter((_, i) => i !== index))
  }

  const formRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const formElement = formRef.current
    if (formElement && bottomRef.current) {
      if (
        employmentStatus === 'yes' ||
        internshipExperience === 'yes' ||
        jobExperience === 'yes' ||
        internshipItems.length > 0 ||
        jobItems.length > 0
      ) {
        // 내부 스크롤을 적용할 때, 스크롤 컨테이너의 scrollTop을 조정
        formElement.scrollTo({
          top: bottomRef.current.offsetTop,
          behavior: 'smooth',
        })
      }
    }
  }, [
    employmentStatus,
    internshipExperience,
    jobExperience,
    internshipItems.length,
    jobItems.length,
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
            />

            <EmailVerification />

            <InputField
              label="비밀번호"
              name="password"
              placeholder="영어, 숫자, 특수문자를 포함한 8자 이상으로 입력해주세요"
              type="password"
              showIcon={true}
              required={true}
            />

            <InputField
              label="비밀번호 확인"
              name="confirmPassword"
              placeholder="비밀번호를 한 번 더 입력해주세요"
              type="password"
              showIcon={true}
              required={true}
            />
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
              <label className="block text-lg mb-2.5 text-gray">
                대학교 및 학년을 선택해주세요{' '}
                <span className="text-primary">*</span>
              </label>

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
                />
                <Select
                  title="학년"
                  options={['1학년', '2학년', '3학년', '4학년', '해당 없음']}
                />
              </div>
            </div>

            {/* 기수 선택 */}
            <div className="flex justify-between items-center">
              <label className="text-lg text-gray">
                기수를 선택해주세요 <span className="text-primary">*</span>
              </label>
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
                />
              </div>
            </div>

            {/* 이력서 업로드 */}
            <div className="flex justify-between items-center">
              <label className="text-lg mb-2.5 text-gray">
                이력서를 업로드해주세요 <span className="text-primary">*</span>
              </label>
              <button
                type="button"
                className="w-[9.5rem] h-10 border border-gray rounded-[0.25rem] text-gray"
              >
                파일 등록
              </button>
            </div>

            {/* 포지션 선택 */}
            <div>
              <label className="block text-lg mb-2.5 text-gray">
                포지션을 선택해주세요 <span className="text-primary">*</span>
              </label>
              <PositionSelect
                selectedPositions={selectedPositions}
                handlePositionSelect={handlePositionSelect}
              />
            </div>

            {/* 추천 여부 */}
            <div>
              <label className="block text-lg mb-2.5 text-gray">
                본인의 프로필을 다른 사람들에게 추천하여 프로젝트에 참여할
                기회를 늘릴까요? <span className="text-primary">*</span>
              </label>
              <div className="flex justify-between space-x-5">
                <button
                  type="button"
                  onClick={() => setRecommendation('yes')}
                  className={`w-full h-10 border rounded-[0.25rem] ${
                    recommendation === 'yes'
                      ? 'bg-primary text-white border-primary'
                      : 'text-gray border-gray'
                  }`}
                >
                  예, 추천해주세요
                </button>
                <button
                  type="button"
                  onClick={() => setRecommendation('no')}
                  className={`w-full h-10 border rounded-[0.25rem] ${
                    recommendation === 'no'
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
              <label className="block text-lg mb-2.5 text-gray">
                링크를 입력해주세요 <span className="text-primary">*</span>
              </label>
              <div className="flex flex-col space-y-2">
                <div className="flex justify-between space-x-5">
                  <div className="flex items-center justify-center w-[10rem] h-10 rounded-[0.25rem] text-primary border border-primary">
                    깃허브
                  </div>
                  <input
                    type="text"
                    name="github"
                    className="w-full h-10 px-4 border border-gray rounded-[0.25rem] focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="flex justify-between space-x-5">
                  <div className="flex items-center justify-center w-[10rem] h-10 rounded-[0.25rem] text-primary border border-primary">
                    블로그
                  </div>
                  <input
                    type="text"
                    name="blog"
                    className="w-full h-10 px-4 border border-gray rounded-[0.25rem] focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>

            {/* 취업 여부 */}
            <CareerToggle
              title="인턴, 취업 등 일 경험이 있나요?"
              value={employmentStatus}
              setValue={setEmploymentStatus}
            />

            {employmentStatus === 'yes' && (
              <>
                <ExperienceSection
                  title="인턴 경험이 있나요?"
                  experienceStatus={internshipExperience}
                  setExperienceStatus={setInternshipExperience}
                  items={internshipItems}
                  addExperience={addInternshipExperience}
                  removeExperience={removeInternshipExperience}
                />
                <ExperienceSection
                  title="정규직 경험이 있나요?"
                  experienceStatus={jobExperience}
                  setExperienceStatus={setJobExperience}
                  items={jobItems}
                  addExperience={addJobExperience}
                  removeExperience={removeJobExperience}
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
            <button
              type="button"
              className="w-[30.25rem] h-10 text-xl border border-gray text-gray rounded-full focus:border-primary focus:text-primary"
            >
              회원가입
            </button>
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
