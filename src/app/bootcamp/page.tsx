import React from 'react'
import TapBar from '@/components/common/TapBar'
import Image from 'next/image'

const page = () => {
  const options = [
    '전체보기',
    '역대 수상작',
    '10기',
    '9기',
    '8기',
    '7기',
    '6기',
    '5기',
    '4기',
    '3기',
    '2기',
    '1기',
  ]

  return (
    <div className="flex justify-center">
      <div className="flex flex-col">
        <div className="flex justify-between w-[1200px] mt-14 mb-[2.84rem]">
          <div className="text-left">
            <p className="text-[2rem] font-bold">부트캠프 프로젝트</p>
            <p className="text-[1.25rem]">
              부트캠프 참여자들의 프로젝트를 확인해보세요.
            </p>
          </div>
          <button className="flex items-center gap-2 w-[13rem] h-[3rem] rounded-xl shadow-md text-[1.1rem] font-medium justify-center hover:shadow-custom">
            <span>부트캠프 등록하기</span>
            <Image src="/star.svg" alt="star" width={20} height={20} />
          </button>
        </div>
        <TapBar options={options} />
        <div className="border-t my-5" />
      </div>
    </div>
  )
}

export default page
