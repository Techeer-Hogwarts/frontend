'use client'

import InputField from '@/components/common/InputField'
import Link from 'next/link'
import { useState } from 'react'
import Image from 'next/image'

export default function login() {
  const [isChecked, setIsChecked] = useState(false)

  const handleCheckboxClick = () => {
    setIsChecked(!isChecked) // 체크 상태를 반전
  }
  return (
    <div className="flex min-h-[calc(100vh-61px)] items-center justify-between">
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
            />
            <InputField
              label="비밀번호"
              name="password"
              placeholder="비밀번호를 입력해주세요"
            />
          </div>
          <div className="flex items-center justify-between mt-12 mb-3">
            <div
              onClick={handleCheckboxClick}
              className="flex cursor-pointer text-[#666666]"
            >
              <Image
                src={
                  isChecked ? '/images/check-on.svg' : '/images/check-off.svg'
                }
                alt="checkbox"
                width={24}
                height={24}
              />
              아이디 저장
            </div>
            <Link href="/findpassword" className="text-[#666666]">
              비밀번호 찾기
            </Link>
          </div>
          <button
            type="button"
            className="w-full h-10 text-xl border border-gray text-gray rounded-full focus:border-primary focus:text-primary"
          >
            로그인
          </button>
        </div>
      </div>
    </div>
  )
}
