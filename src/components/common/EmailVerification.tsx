'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'

interface EmailVerificationProps {
  email: string
  isVerified: boolean
  setEmail: (email: string) => void
  setIsVerified: (verified: boolean) => void
  isTecheerSignup: boolean
}

export default function EmailVerification({
  email,
  isVerified,
  setEmail,
  setIsVerified,
  isTecheerSignup,
}: EmailVerificationProps) {
  const [code, setCode] = useState('')
  const [isRequesting, setIsRequesting] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [timer, setTimer] = useState(300) // 5분(300초) 타이머
  const [timerActive, setTimerActive] = useState(false)
  const [timeExpired, setTimeExpired] = useState(false)

  // 메시지 상태(인증요청 / 인증확인)
  const [requestMessage, setRequestMessage] = useState('')
  const [requestIsError, setRequestIsError] = useState(false)
  const [verifyMessage, setVerifyMessage] = useState('')
  const [verifyIsError, setVerifyIsError] = useState(false)

  // 이메일 인증 요청 함수
  const handleRequestVerification = async () => {
    // 매번 새 요청 전, 이전 메시지 초기화
    setRequestMessage('')
    setRequestIsError(false)

    if (!email) {
      setRequestIsError(true)
      setRequestMessage('슬랙에 등록된 이메일을 입력해주세요.')
      return
    }

    setIsRequesting(true)
    setTimerActive(true)
    setTimer(300)
    setTimeExpired(false)

    try {
      const response = await fetch('/api/v1/auth/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          techeer: isTecheerSignup
        }),
      })

      if (!response.ok) {
        setRequestIsError(true)
        setRequestMessage('인증 코드 전송에 실패했습니다.')
        return
      }

      if (response.status === 200) {
        setRequestIsError(false)
        setRequestMessage('인증 코드가 이메일로 전송되었습니다.')
      } else {
        setRequestIsError(true)
        setRequestMessage('인증 코드 전송에 실패했습니다.')
      }
    } catch (error) {
      setRequestIsError(true)
      setRequestMessage('네트워크 오류가 발생했습니다.')
    } finally {
      setIsRequesting(false)
    }
  }

  // 인증 코드 확인 함수
  const handleVerify = async () => {
    setVerifyMessage('')
    setVerifyIsError(false)

    if (!code) {
      setVerifyIsError(true)
      setVerifyMessage('인증 코드를 입력해주세요.')
      return
    }

    if (timeExpired) {
      setVerifyIsError(true)
      setVerifyMessage('시간이 초과되었습니다. 인증 코드를 다시 요청해주세요.')
      return
    }

    setIsVerifying(true)
    try {
      const response = await fetch('/api/v1/auth/code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      })

      if (!response.ok) {
        setVerifyIsError(true)
        setVerifyMessage('인증 코드가 올바르지 않습니다.')
        return
      }

      if (response.status === 200) {
        // 부모에서 전달받은 setIsVerified 호출 → 인증 상태 유지됨
        setIsVerified(true)
        setTimerActive(false)
        setVerifyIsError(false)
        setVerifyMessage('이메일 인증이 완료되었습니다.')
      } else {
        setVerifyIsError(true)
        setVerifyMessage('인증 코드가 올바르지 않습니다.')
      }
    } catch (error) {
      setVerifyIsError(true)
      setVerifyMessage('인증 코드가 올바르지 않습니다.')
    } finally {
      setIsVerifying(false)
    }
  }

  useEffect(() => {
    if (timerActive && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(interval)
    } else if (timer === 0) {
      setTimerActive(false)
      setTimeExpired(true)
    }
  }, [timerActive, timer])

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

      <div className="flex justify-between mb-2">
        <input
          type="text"
          name="email"
          placeholder="슬랙으로 가입한 이메일을 입력해주세요"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-[21.75rem] h-10 px-4 border border-gray rounded-[0.25rem] focus:outline-none focus:border-primary"
          disabled={isVerified}
        />
        <button
          type="button"
          onClick={handleRequestVerification}
          className="w-[7.75rem] h-10 bg-primary text-white rounded-[0.25rem]"
          disabled={isRequesting || timerActive || isVerified}
        >
          {isRequesting ? '요청 중...' : '인증요청'}
        </button>
      </div>

      {requestMessage && (
        <p
          className={`mb-4 text-sm ${
            requestIsError ? 'text-red-500' : 'text-green'
          }`}
        >
          {requestMessage}
        </p>
      )}

      <div className="flex justify-between mb-2">
        <input
          type="text"
          name="emailcode"
          placeholder="인증번호 6자리를 입력해주세요"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-[21.75rem] h-10 px-4 border border-gray rounded-[0.25rem] focus:outline-none focus:border-primary"
          disabled={isVerified}
        />
        <button
          type="button"
          onClick={handleVerify}
          className="w-[7.75rem] h-10 bg-primary text-white rounded-[0.25rem]"
          disabled={isVerifying || isVerified}
        >
          {isVerifying ? '인증 중...' : '인증하기'}
        </button>
      </div>

      {verifyMessage && (
        <p
          className={`mb-2 text-sm ${
            verifyIsError ? 'text-red-500' : 'text-green'
          }`}
        >
          {verifyMessage}
        </p>
      )}

      <div className="flex justify-between text-sm mt-2">
        <button
          className="text-primary underline underline-offset-2"
          onClick={handleRequestVerification}
          disabled={isVerified}
        >
          이메일 재전송
        </button>
        <p className="text-gray">{formatTime(timer)}</p>
      </div>
    </div>
  )
}
