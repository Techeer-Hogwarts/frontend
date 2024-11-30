'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import InputField from '@/components/common/InputField'

const ChangePassword = () => {
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [isRequesting, setIsRequesting] = useState(false)
  const [timer, setTimer] = useState(300) // 5분 타이머
  const [timerActive, setTimerActive] = useState(false)
  const [timeExpired, setTimeExpired] = useState(false)

  const router = useRouter()

  // 이메일 인증 코드 요청 함수
  const handleRequestVerification = async () => {
    if (!email) {
      alert('이메일을 입력해주세요.')
      return
    }

    setIsRequesting(true)
    setTimerActive(true) // 타이머 시작
    setTimer(300) // 타이머를 5분으로 초기화
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

  // 비밀번호 재설정 함수
  const handleResetPassword = async () => {
    if (!email || !code || !newPassword || !confirmPassword) {
      alert('모든 필드를 입력해주세요.')
      return
    }

    if (newPassword !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.')
      return
    }

    if (timeExpired) {
      alert('인증 코드가 만료되었습니다. 다시 요청해주세요.')
      return
    }

    try {
      const response = await axios.patch(
        'https://api.techeerzip.cloud/api/v1/auth/findPwd',
        {
          email,
          code,
          newPassword,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      if (response.status === 200) {
        alert('비밀번호가 성공적으로 변경되었습니다.')
        router.push('/login') // 비밀번호 변경 후 로그인 페이지로 이동
      } else {
        alert('비밀번호 변경에 실패하였습니다.')
      }
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        alert(`오류: ${error.response.data.message}`)
      } else {
        alert('비밀번호 변경에 실패하였습니다.')
      }
      console.error('Password reset error:', error)
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
    <div className="flex-grow flex items-center justify-center mt-[6.62rem]">
      <div className="w-[30rem]  space-y-7">
        <h2 className="text-2xl font-semibold">비밀번호 변경</h2>

        {/* 이메일 입력 및 인증 코드 요청 */}
        <div>
          <div className="flex justify-between mb-2.5">
            <label className="block text-lg">
              이메일 <span className="text-primary">*</span>
            </label>
          </div>
          <div className="flex justify-between mb-2">
            <input
              type="text"
              name="email"
              placeholder="이메일을 입력해주세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-[21.75rem] h-10 px-4 border border-gray rounded-[0.25rem] focus:outline-none focus:border-primary"
            />
            <button
              type="button"
              onClick={handleRequestVerification}
              className="w-[7.75rem] h-10 bg-primary text-white rounded-[0.25rem]"
              disabled={isRequesting || timerActive} // 요청 중이거나 타이머 작동 중이면 비활성화
            >
              {isRequesting ? '요청 중...' : '인증요청'}
            </button>
          </div>
          {/* 이메일 재전송 및 타이머 */}
          {timerActive && (
            <div className="flex justify-between text-sm mb-4">
              <button
                className="text-primary underline underline-offset-2"
                onClick={handleRequestVerification}
                disabled={isRequesting} // 요청 중이면 비활성화
              >
                이메일 재전송
              </button>
              <p className="text-gray">{formatTime(timer)}</p>
            </div>
          )}
        </div>

        {/* 인증 코드 입력 */}
        <InputField
          label="인증 코드"
          name="code"
          placeholder="인증 코드를 입력해주세요"
          required={true}
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        {/* 새로운 비밀번호 입력 */}
        <InputField
          label="새로운 비밀번호"
          name="newPassword"
          placeholder="영어, 숫자, 특수문자를 포함한 8자 이상으로 입력해주세요"
          type="password"
          required={true}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <InputField
          label="비밀번호 확인"
          name="confirmPassword"
          placeholder="한 번 더 입력해주세요"
          type="password"
          required={true}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {/* 확인 버튼 */}
        <button
          onClick={handleResetPassword}
          className="w-full h-10 bg-primary text-white rounded-[0.25rem]"
        >
          확인
        </button>
      </div>
    </div>
  )
}

export default ChangePassword
