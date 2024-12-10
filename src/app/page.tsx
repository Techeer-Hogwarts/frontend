'use client'
import Banner from '@/components/onboarding/Banner'
import First from '@/components/onboarding/Firtst'
import Fourth from '@/components/onboarding/Fourth'
// import Last from '@/components/onboarding/Last'
import Second from '@/components/onboarding/Second'
import Techeer from '@/components/onboarding/Techeer'
import Third from '@/components/onboarding/Third'
import Image from 'next/image'

export default function Onboarding() {
  return (
    <div className="flex flex-col max-w-[1200px] w-[1200px] my-10 items-center gap-10">
      {/* 배너 부분 */}
      <Banner />
      <div className="flex items-start relative w-[250px] h-[250px]">
        <Image
          src="/clip_small.png"
          alt="smallclip"
          fill
          style={{ objectFit: 'contain' }}
        />
      </div>
      {/***********************************************/}
      <div className="flex flex-col">
        {/* 테커 소개 */}
        <Techeer />
        <div className="w-full h-96 bg-gradient-to-b from-black via-gray-800 to-white"></div>
        {/* 첫번째 */}
        <First />
        {/* 두번째 */}
        <Second />
        {/* 세번째 */}
        <Third />
        {/* 네번째 */}
        <Fourth />
      </div>
      {/***********************************************/}
      {/* <Last /> */}
    </div>
  )
}
