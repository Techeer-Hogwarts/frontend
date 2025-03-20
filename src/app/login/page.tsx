'use client'
import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import InputField from '@/components/common/InputField'
import { useLogin } from '@/hooks/auth/useLogin'
export default function Login() {
  const { handleSubmit, register, handleLogin, errors, isFormValid } =
    useLogin()

  return (
    <div className="flex min-h-[calc(100vh-61px)] items-center justify-between">
      {/* 왼쪽 배너 */}
      <div className="w-[30.25rem] min-h-[calc(100vh-61px)] bg-gradient-to-b from-[#FF8B20] to-[#FFC14F] text-center text-white flex flex-col justify-center">
        <h3 className="text-4xl font-extrabold mt-[12.5rem]">
          Hello, Techeer!
        </h3>
        <p className="text-xl mt-9">
          테커의 모든 것이 담겨있는 여기는
          <br />
          TECHEER.ZIP 입니다.
        </p>
        <p className="text-base mt-auto mb-6">아직 회원이 아니신가요?</p>
        <Link href="/signup" className="underline text-xl mb-[7.5rem]">
          회원가입 하러가기
        </Link>
      </div>
      {/* 로그인 폼 */}
      <div className="flex flex-col w-[44.75rem] h-full px-[7.25rem]">
        <h2 className="text-4xl font-extrabold text-center my-8 text-primary">
          Sign in
        </h2>
        <form
          className="flex flex-col w-[30.25rem] justify-center my-auto"
          onSubmit={handleSubmit(handleLogin)}
        >
          <div className="space-y-4">
            <InputField
              label="이메일"
              name="email"
              placeholder="이메일을 입력해주세요"
              {...register('email', {
                required: true,
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                  message: '올바른 이메일 형식이 아닙니다.',
                },
              })}
            />
            <InputField
              label="비밀번호"
              name="password"
              placeholder="비밀번호를 입력해주세요"
              type="password"
              {...register('password', {
                required: true,
              })}
            />
          </div>
          <div className="flex items-center justify-end mt-12 mb-3">
            <Link href="/changepassword" className="text-[#666666]">
              비밀번호 찾기
            </Link>
          </div>

          <button
            type="submit"
            className={`w-full h-10 text-xl border ${isFormValid ? 'border-primary text-primary hover:border-2' : 'border-gray text-gray'} rounded-full `}
            disabled={!isFormValid}
          >
            로그인
          </button>
          {/* 에러 메시지 표시 영역 */}
        </form>
        <div
          className={`mt-3 text-sm  text-red-500 flex flex-col min-h-10 justify-center`}
        >
          <p>{errors.email && String(errors.email.message)}</p>
          <p>{errors.root && String(errors.root.message)}</p>
        </div>
      </div>
    </div>
  )
}
