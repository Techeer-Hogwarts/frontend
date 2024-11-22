'use client'

import EmailVerification from '@/components/common/EmailVerification'
import InputField from '@/components/common/InputField'
import React, { useState } from 'react'

const Changepassword = () => {
  const [isVerified, setIsVerified] = useState(false)

  return (
    <div className="flex-grow flex items-center justify-center">
      <div className="w-[30rem] space-y-7">
        {!isVerified ? (
          <>
            <h2 className="text-2xl font-semibold">비밀번호 변경</h2>
            <InputField
              label="이름"
              name="name"
              placeholder="이름을 입력해주세요"
              required={true}
            />
            <EmailVerification setIsVerified={setIsVerified} />
          </>
        ) : (
          // 인증 후 화면이 바뀌는 부분
          <>
            <h2 className="text-2xl font-semibold">비밀번호 변경</h2>
            <InputField
              label="새로운 비밀번호"
              name="newpassword"
              placeholder="영어, 숫자, 특수문자를 포함한 8자 이상으로 입력해주세요"
            />
            <InputField
              label="비밀번호 확인"
              name="passwordconfirm"
              placeholder="한 번 더 입력해주세요"
            />
            <button className="w-full h-10 bg-primary text-white rounded-[0.25rem]">
              확인
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default Changepassword
