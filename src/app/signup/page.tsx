'use client'
import React, { useState, useRef, useEffect } from 'react'
import Select from '@/components/signup/Select'
import PositionSelect from '@/components/signup/PositionSelect'
import ExperienceSection from '@/components/signup/ExperienceSection'
import CareerToggle from '@/components/signup/CareerToggle'
import InputField from '@/components/common/InputField'
import EmailVerification from '@/components/common/EmailVerification'
import Link from 'next/link'
import Lottie from 'lottie-react'
import loading from '../../../public/loading.json'
import { useSignupHandler } from '@/hooks/auth/useSignupHandler'
import {
  UNIVERSITIES,
  GRADE,
  GENERATION,
  POSITION,
} from '@/constants/signupInfo'
import BlogComponent from '@/components/signup/BlogComponent'

const Signup = () => {
  const {
    formData,
    setFormData,
    setInternships,
    setFullTimes,
    handleChange,
    handlePositionSelect,
    step,
    isLoading,
    handleSignup,
    passwordsMatch,
    formRef,
    bottomRef,
    handleNext,
    handleBack,
  } = useSignupHandler()

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
              placeholder="이름을 입력해주세요"
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
                <div className="w-1/2">
                  <Select
                    title="대학교"
                    options={UNIVERSITIES}
                    value={formData.school}
                    onChange={(value) =>
                      setFormData((prev) => ({ ...prev, school: value }))
                    }
                  />

                  {/* “해당 없음”을 선택했다면 직접 입력할 수 있는 필드 노출 */}
                  {formData.school === '해당 없음' && (
                    <input
                      type="text"
                      placeholder="직접 입력"
                      className="mt-2 w-full h-10 px-4 border border-gray rounded-[0.25rem] focus:outline-none focus:border-primary"
                      value={formData.customSchool}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          customSchool: e.target.value,
                        }))
                      }
                    />
                  )}
                </div>

                <div className="w-1/2">
                  <Select
                    title="학년"
                    options={GRADE}
                    value={formData.classYear}
                    onChange={(value) =>
                      setFormData((prev) => ({ ...prev, classYear: value }))
                    }
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-lg ">
                기수를 선택해주세요 <span className="text-primary">*</span>
              </p>
              <div className="w-[9.5rem]">
                <Select
                  title="기수"
                  options={GENERATION}
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
                      options={POSITION}
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
                <BlogComponent
                  label="깃허브"
                  name="githubUrl"
                  value={formData.githubUrl}
                  handleChange={handleChange}
                  placeholder={'https://github.com/user'}
                />
                <BlogComponent
                  label="미디엄"
                  name="mediumUrl"
                  value={formData.mediumUrl}
                  handleChange={handleChange}
                  placeholder={'https://medium.com/@user'}
                />
                <BlogComponent
                  label="벨로그"
                  name="velogUrl"
                  value={formData.velogUrl}
                  handleChange={handleChange}
                  placeholder={'https://velog.io/@user'}
                />
                <BlogComponent
                  label="티스토리"
                  name="tistoryUrl"
                  value={formData.tistoryUrl}
                  handleChange={handleChange}
                  placeholder={'https://user.tistory.com/'}
                />
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
            <div ref={bottomRef}></div>
          </div>
        )}

        <div className="flex flex-col my-10">
          {step === 1 ? (
            <button
              type="button"
              onClick={handleNext}
              className="w-[30.25rem] h-10 text-xl border border-gray text-gray rounded-full hover:border-primary hover:text-primary"
            >
              다음
            </button>
          ) : (
            <div className="flex flex-col space-y-2">
              <button
                type="button"
                onClick={handleBack}
                className="w-[30.25rem] h-10 text-xl border border-gray text-gray rounded-full hover:border-primary hover:text-primary"
              >
                이전
              </button>
              <button
                type="button"
                onClick={handleSignup}
                disabled={isLoading}
                className="w-[30.25rem] h-10 text-xl border border-primary text-primary rounded-full hover:bg-primary hover:text-white flex items-center justify-center"
              >
                {isLoading ? (
                  <Lottie
                    animationData={loading}
                    style={{ width: 40, height: 40 }}
                  />
                ) : (
                  '회원가입'
                )}
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
        <Link
          href="/login?form=signup"
          className="underline text-xl mb-[7.5rem]"
        >
          로그인 하러가기
        </Link>
      </div>
    </div>
  )
}

export default Signup
