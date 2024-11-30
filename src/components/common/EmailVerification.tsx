'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import axios from 'axios'

interface EmailVerificationProps {
  email: string
  setEmail: (email: string) => void
  setIsVerified: (verified: boolean) => void
}

export default function EmailVerification({
  email,
  setEmail,
  setIsVerified,
}: EmailVerificationProps) {
  const [code, setCode] = useState('')
  const [isRequesting, setIsRequesting] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [isVerified, setIsVerifiedState] = useState(false)
  const [timer, setTimer] = useState(300) // 5분(300초) 타이머
  const [timerActive, setTimerActive] = useState(false)
  const [timeExpired, setTimeExpired] = useState(false) // 타이머 만료 상태

  // 이메일 인증 요청 함수
  const handleRequestVerification = async () => {
    if (!email) {
      alert('이메일을 입력해주세요.')
      return
    }

    setIsRequesting(true)
    setTimerActive(true) // 타이머 활성화
    setTimer(300) // 타이머를 5분으로 설정
    setTimeExpired(false) // 타이머 만료 상태 초기화

    try {
      const response = await axios.post(
        'https://api.techeerzip.cloud/api/v1/auth/email',
        { email },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      if (response.status === 201) {
        alert('인증 코드가 이메일로 전송되었습니다.')
      } else {
        alert('인증 코드 전송에 실패했습니다.')
      }
    } catch (error) {
      alert('네트워크 오류가 발생했습니다.')
    } finally {
      setIsRequesting(false)
    }
  }

  // 인증 코드 확인 함수
  const handleVerify = async () => {
    if (!code) {
      alert('인증 코드를 입력해주세요.')
      return
    }

    // 타이머 만료 여부 확인
    if (timeExpired) {
      alert('시간이 초과되었습니다. 인증 코드를 다시 요청해주세요.')
      return
    }

    setIsVerifying(true)
    try {
      const response = await axios.post(
        'https://api.techeerzip.cloud/api/v1/auth/code',
        { email, code },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      if (response.status === 201) {
        setIsVerified(true)
        setIsVerifiedState(true) // 인증 상태를 true로 설정
        setTimerActive(false) // 타이머 비활성화
        alert('이메일 인증이 완료되었습니다.')
      } else {
        alert('인증 코드가 올바르지 않습니다.')
      }
    } catch (error) {
      alert('인증 코드가 올바르지 않습니다.')
    } finally {
      setIsVerifying(false)
    }
  }

  // 타이머 효과
  useEffect(() => {
    if (timerActive && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(interval)
    } else if (timer === 0) {
      setTimerActive(false) // 타이머 종료 후 비활성화
      setTimeExpired(true) // 타이머 만료 설정
    }
  }, [timerActive, timer])

  // 남은 시간을 분:초 형식으로 변환
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  return (
    <div>
      <div className="flex justify-between mb-2.5">
        <label className="block text-lg">
          이메일 <span className="text-primary">*</span>
        </label>
        <Image
          src={isVerified ? '/images/check-on.svg' : '/images/check-off.svg'}
          alt="check"
          width={20}
          height={20}
        />
      </div>
      <div className="flex justify-between mb-4">
        <input
          type="text"
          name="email"
          placeholder="슬랙으로 가입한 이메일을 입력해주세요"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-[21.75rem] h-10 px-4 border border-gray rounded-[0.25rem] focus:outline-none focus:border-primary"
          disabled={isVerified} // 인증 완료 후 비활성화
        />
        <button
          type="button"
          onClick={handleRequestVerification}
          className="w-[7.75rem] h-10 bg-primary text-white rounded-[0.25rem]"
          disabled={isRequesting || timerActive || isVerified} // 타이머가 활성화되거나 인증 완료 후 비활성화
        >
          {isRequesting ? '요청 중...' : '인증요청'}
        </button>
      </div>
      <div className="flex justify-between">
        <input
          type="text"
          name="emailcode"
          placeholder="인증번호 6자리를 입력해주세요"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-[21.75rem] h-10 px-4 border border-gray rounded-[0.25rem] focus:outline-none focus:border-primary"
          disabled={isVerified} // 인증 완료 후 비활성화
        />
        <button
          type="button"
          onClick={handleVerify}
          className="w-[7.75rem] h-10 bg-primary text-white rounded-[0.25rem]"
          disabled={isVerifying || isVerified} // 인증 중 또는 완료 후 비활성화
        >
          {isVerifying ? '인증 중...' : '인증하기'}
        </button>
      </div>
      <div className="flex justify-between text-sm mt-2 ">
        <button
          className="text-primary underline underline-offset-2"
          onClick={handleRequestVerification}
          disabled={isVerified} // 타이머가 활성화되거나 인증 완료 후 비활성화
        >
          이메일 재전송
        </button>
        <p className="text-gray">{formatTime(timer)}</p>
      </div>
    </div>
  )
}
