'use client'
import Banner from '@/components/onboarding/Banner'
import BlogInfo from '@/components/onboarding/BlogInfo'
// import Last from '@/components/onboarding/Last'
import ProjectStudyInfo from '@/components/onboarding/ProjectStudyInfo'
import Techeer from '@/components/onboarding/Techeer'
import ProfileInfo from '@/components/onboarding/ProfileInfo'
import Image from 'next/image'
import ResumeInfo from '@/components/onboarding/ResumeInfo'
import SessionInfo from '@/components/onboarding/SessionInfo'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

// 스크롤이 내려갈 때 나타나는 애니메이션 효과 정의
const fadeInVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut', delay },
  }),
}

export default function Onboarding() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="flex flex-col max-w-[1200px] w-[1200px] my-[50px] items-center gap-10">
      {/* 배너 부분 */}
      <Banner />
      {/* 부드럽게 나타나는 이미지 */}
      <motion.div
        className="flex items-start relative w-[250px] h-[250px]"
        initial="hidden"
        whileInView="visible"
        variants={fadeInVariants}
        // custom={0.2} // 0.2초 딜레이 추가
        // viewport={{ amount: 0.2, once: true }} // 60% 이상 보일 때 등장
      >
        <Image
          src="/clip_small.png"
          alt="smallclip"
          fill
          style={{ objectFit: 'contain' }}
          className="animate-float"
        />
      </motion.div>
      {/***********************************************/}
      <div className="flex flex-col">
        {/* 테커 소개 */}
        <Techeer />

        <div className="w-full h-96 bg-gradient-to-b from-black to-white mb-[120px]" />

        {/* 첫 번째 - 프로젝트, 스터디 */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeInVariants}
          custom={0.3} // 0.4초 딜레이 추가
          viewport={{ amount: 0.3, once: false }} // 40% 이상 보일 때 등장
        >
          <ProjectStudyInfo />
        </motion.div>

        {/* 두 번째 - 프로필 */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeInVariants}
          custom={0.3} // 0.4초 딜레이 추가
          viewport={{ amount: 0.3, once: false }} // 40% 이상 보일 때 등장
        >
          <ProfileInfo />
        </motion.div>

        {/* 세 번째 - 블로그 */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeInVariants}
          custom={0.3} // 0.4초 딜레이 추가
          viewport={{ amount: 0.3, once: false }} // 40% 이상 보일 때 등장
        >
          <BlogInfo />
        </motion.div>

        {/* 네 번째 - 이력서 */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeInVariants}
          custom={0.3} // 0.4초 딜레이 추가
          viewport={{ amount: 0.3, once: false }} // 40% 이상 보일 때 등장
        >
          <ResumeInfo />
        </motion.div>

        {/*  다섯번째 - 세션 */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeInVariants}
          custom={0.3} // 0.4초 딜레이 추가
          viewport={{ amount: 0.3, once: false }} // 40% 이상 보일 때 등장
        >
          <SessionInfo />
        </motion.div>
      </div>
      {/***********************************************/}
      {/* <Last /> */}
    </div>
  )
}
