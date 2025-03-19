'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import InputField from '@/components/common/InputField'
import { useForm } from 'react-hook-form'

export default function Login() {
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm()

  const [isLoggingIn, setIsLoggingIn] = useState(false)

  // 메시지 상태
  // const [isError, setIsError] = useState(false)

  const { setIsLoggedIn } = useAuthStore()
  const router = useRouter()

  const [redirectPath, setRedirectPath] = useState<string | null>(null)
  const [form, setForm] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      setRedirectPath(params.get('redirect'))
      setForm(params.get('form'))
    }
  }, [])
  const handleLogins = (data) => {
    console.log(data) // 제대로 된 값이 출력되어야 합니다.
  }

  const handleLogin = async (data) => {
    setIsLoggingIn(true)
    try {
      // fetch로 로그인 요청
      const response = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data),
      })

      // 응답 상태 확인
      if (!response.ok) {
        // 실패
        if (response.status === 401) {
          setError('password', {
            message: '비밀번호가 올바르지 않습니다.',
          })
        } else if (response.status === 404) {
          setError('email', {
            message: '가입되지 않은 사용자입니다.',
          })
        } else {
          setError('root', { message: '로그인에 실패하였습니다.' })
        }
      } else {
        // 201 Created 가정
        if (response.status === 201) {
          setIsLoggedIn(true)
          if (redirectPath) {
            router.replace(redirectPath)
          } else if (form === 'signup') {
            router.replace('/')
          } else {
            router.back()
          }
        } else {
          setError('root', { message: '로그인 응답이 예상과 다릅니다.' })
        }
      }
    } catch (error) {
      // 네트워크 에러, CORS 문제 등
      setError('root', { message: '네트워크 오류가 발생했습니다.' })
    } finally {
      setIsLoggingIn(false)
    }
  }

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
                required: '이메일을 입력해주세요.',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
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
                required: '비밀번호를 입력해주세요.',
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
            className="w-full h-10 text-xl border border-gray text-gray rounded-full focus:border-primary focus:text-primary"
          >
            로그인
          </button>

          {/* 에러/성공 메시지 표시 영역 */}

          <div className={`mt-3 text-sm  text-red-500 flex flex-col`}>
            <p>{errors.email && String(errors.email.message)}</p>
            <p>{errors.password && String(errors.password.message)}</p>
            <p>{errors.root && String(errors.root.message)}</p>
          </div>
        </form>
      </div>
    </div>
  )
}
