'use client'

import InputField from '@/components/common/InputField'
import Link from 'next/link'
import { useState } from 'react'
import Image from 'next/image'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

export default function Login() {
  const [isChecked, setIsChecked] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  const router = useRouter() // 페이지 이동을 위한 라우터 훅

  const handleCheckboxClick = () => {
    setIsChecked(!isChecked) // 체크 상태를 반전
  }

  const handleLogin = async () => {
    if (!email || !password) {
      alert('이메일과 비밀번호를 모두 입력해주세요.')
      return
    }

    setIsLoggingIn(true)

    try {
      const response = await axios.post(
        'https://api.techeerzip.cloud/api/v1/auth/login',
        {
          email,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true, // 쿠키 전송을 위해 추가
        },
      )

      if (response.status === 201) {
        const { accessToken, refreshToken } = response.data.data

        // 토큰을 쿠키에 저장
        Cookies.set('accessToken', accessToken, { expires: 1 })
        Cookies.set('refreshToken', refreshToken, { expires: 7 })

        alert('로그인에 성공하였습니다.')
        router.push('/project')
      } else {
        alert('로그인에 실패하였습니다.')
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        alert('이메일 또는 비밀번호가 올바르지 않습니다.')
      } else {
        alert('네트워크 오류가 발생했습니다.')
      }
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
            {/* <div
              onClick={handleCheckboxClick}
              className="flex items-center cursor-pointer text-[#666666]"
            >
              <Image
                src={
                  isChecked ? '/images/check-on.svg' : '/images/check-off.svg'
                }
                alt="checkbox"
                width={24}
                height={24}
              />
              <span className="ml-2">아이디 저장</span>
            </div> */}
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
            {isLoggingIn ? '로그인 중...' : '로그인'}
          </button>
        </div>
      </div>
    </div>
  )
}
