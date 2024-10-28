import React from 'react'
import Image from 'next/image'

interface EmailVerificationProps {
  setIsVerified: (verified: boolean) => void
}

export default function EmailVerification({
  setIsVerified,
}: EmailVerificationProps) {
  const handleVerify = () => {
    setIsVerified(true) // 인증 후 비밀번호 변경 화면으로 전환
  }
  return (
    <div>
      <div className="flex justify-between mb-2.5">
        <label className="block text-lg">
          이메일 <span className="text-primary">*</span>
        </label>
        <Image src="/images/check-off.svg" alt="check" width={20} height={20} />
      </div>
      <div className="flex justify-between mb-4">
        <input
          type="text"
          name="email"
          placeholder="슬랙으로 가입한 이메일을 입력해주세요"
          className="w-[21.75rem] h-10 px-4 border border-gray rounded-[0.25rem] focus:outline-none focus:border-primary"
        />
        <button
          type="button"
          className="w-[7.75rem] h-10 bg-primary text-white rounded-[0.25rem]"
        >
          인증요청
        </button>
      </div>
      <div className="flex justify-between">
        <input
          type="text"
          name="emailcode"
          placeholder="인증번호 6자리를 입력해주세요"
          className="w-[21.75rem] h-10 px-4 border border-gray rounded-[0.25rem] focus:outline-none focus:border-primary"
        />
        <button
          type="button"
          onClick={handleVerify}
          className="w-[7.75rem] h-10 bg-primary text-white rounded-[0.25rem]"
        >
          인증하기
        </button>
      </div>
      <div className="flex justify-between text-sm mt-2 ">
        <button className="text-primary underline underline-offset-2">
          이메일 재전송
        </button>
        <p className="text-gray">04:30</p>
      </div>
    </div>
  )
}
