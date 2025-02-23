'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import InputField from '@/components/common/InputField'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  // 메시지 상태
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)

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

  const handleLogin = async () => {
    if (!email || !password) {
      setIsError(true)
      setMessage('이메일과 비밀번호를 모두 입력해주세요.')
      return
    }

    setIsLoggingIn(true)

    try {
      // fetch로 로그인 요청
      const response = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          email,
          password,
        }),
      })

      // 응답 상태 확인
      if (!response.ok) {
        // 실패
        if (response.status === 401) {
          setIsError(true)
          setMessage('이메일 또는 비밀번호가 올바르지 않습니다.')
        } else {
          setIsError(true)
          setMessage('로그인에 실패하였습니다.')
        }
      } else {
        // 201 Created 가정
        if (response.status === 201) {
          setIsLoggedIn(true)
          setMessage('로그인이 완료되었습니다.')
          setIsError(false)
          if (redirectPath) {
            router.replace(redirectPath)
          } else if (form === 'signup') {
            router.replace('/')
          } else {
            router.back()
          }
        } else {
          setIsError(true)
          setMessage('로그인 응답이 예상과 다릅니다.')
        }
      }
    } catch (error) {
      // 네트워크 에러, CORS 문제 등
      console.error('Login error:', error)
      setIsError(true)
      setMessage('네트워크 오류가 발생했습니다.')
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
        <div className="flex flex-col w-[30.25rem] justify-center my-auto">
          <div className="space-y-4">
            <InputField
              label="이메일"
              name="email"
              placeholder="이메일을 입력해주세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputField
              label="비밀번호"
              name="password"
              placeholder="비밀번호를 입력해주세요"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-end mt-12 mb-3">
            <Link href="/changepassword" className="text-[#666666]">
              비밀번호 찾기
            </Link>
          </div>

          <button
            type="button"
            className="w-full h-10 text-xl border border-gray text-gray rounded-full focus:border-primary focus:text-primary"
            onClick={handleLogin}
            disabled={isLoggingIn}
          >
            로그인
          </button>

          {/* 에러/성공 메시지 표시 영역 */}
          {message && (
            <p
              className={`mt-3 text-sm ${
                isError ? 'text-red-500' : 'text-green'
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
