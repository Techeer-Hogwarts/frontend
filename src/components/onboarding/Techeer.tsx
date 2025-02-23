import Image from 'next/image'
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // 각 step이 0.3초 간격으로 등장
    },
  },
}

const stepVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
}

export default function Techeer() {
  const steps = [
    {
      id: 1,
      title: 'Discovery',
      subtitle: '대학별 SW 동아리',
      description: '기초 코딩 교육 목표',
    },
    {
      id: 2,
      title: 'Intensive',
      subtitle: '6주간 집중 부트캠프',
      description: 'End-To-End\n실무형 프로젝트',
    },
    {
      id: 3,
      title: 'Discipline',
      subtitle: 'Techeer 선발 가입',
      description:
        '이력서 및 취업 준비\n팀 프로젝트 운영\n실무중심 기술 운영 세션',
    },
    {
      id: 4,
      title: 'Experience',
      subtitle: '인턴쉽 경험',
      description: '실리콘밸리 글로벌\n프리-인턴쉽 경험\n소프트웨어 마에스트로',
    },
    {
      id: 5,
      title: 'Career',
      subtitle: '개발자 취업',
      description: '지속적 자기개발',
    },
  ]

  return (
    <>
      <Image width={300} height={300} src="/bookmark.png" alt="bookmark" />
      <div className="flex flex-col justify-center items-center w-[1280px] h-[50rem] bg-black">
        <motion.div
          className="flex flex-col justify-center items-center w-[1280px] h-[40rem] bg-black"
          initial="hidden"
          whileInView="visible"
          variants={fadeInVariants}
          custom={0.2} // 0.2초 딜레이 추가
          // viewport={{ amount: 0.2, once: true }} // 60% 이상 보일 때 등장
        >
          <span className="font-logo text-[130px] text-white">TECHEER</span>
          <p className="text-white text-[20px]">실리콘밸리에서 직접 운영하는</p>
          <div className="text-[20px] text-white">
            <span
              className="text-primary"
              // style={{
              //   backgroundImage:
              //     'linear-gradient(rgb(254, 145, 66), rgb(255, 94, 0))',
              //   WebkitBackgroundClip: 'text',
              //   backgroundClip: 'text',
              //   WebkitTextFillColor: 'transparent',
              // }}
            >
              {'{'}실리콘밸리식 프로젝트와 멘토 시스템{'}'}
            </span>
            <span> 으로 운영되는 코딩스쿨</span>
          </div>
        </motion.div>
      </div>

      <div className="flex flex-col justify-center items-center w-[1280px] h-[40rem] bg-black relative">
        {/* 반원 이미지 배경 */}
        <Image
          width={1200}
          height={500}
          src="/halfcircle.png"
          alt="halfcircle"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />

        {/* 메인 타이틀과 서브 타이틀 */}
        <motion.div
          className="flex flex-col text-white items-center absolute top-1/3 transform -translate-y-1/3"
          initial="hidden"
          whileInView="visible"
          variants={fadeInVariants}
          custom={0.2} // 0.2초 딜레이 추가
          // viewport={{ amount: 0.6, once: true }} // 60% 이상 보일 때 등장
        >
          <span className="font-bold text-[40px]">단계별 코딩 교육 모델</span>
          <span className="font-medium text-center mt-2">
            테커 부트캠프는 소프트웨어 전문가로 성장할 수 있는
            Intensive(집중적인) 경험을 제공을 목표로 설계
          </span>
        </motion.div>

        {/* 단계별 구성 - 이미지 아래 위치 */}
        <motion.div
          className="flex items-center justify-center mt-[20rem] w-full"
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: false, amount: 0.8 }}
        >
          {/*<div className="flex items-center justify-center mt-[16rem] w-full">*/}
          <div className="flex flex-col items-center space-y-6">
            <div className="flex space-x-12 relative">
              {steps.map((step) => (
                <motion.div
                  key={step.id}
                  className="text-center"
                  variants={stepVariants}
                >
                  {/* Step 번호 */}
                  <div className="flex justify-center relative mb-4">
                    <div className="absolute inset-x-0 bottom-5 text-white">
                      {`step${step.id}`}
                    </div>
                    <div className="flex items-center justify-center w-4 h-4 bg-darkPrimary rounded-full text-white font-bold"></div>
                  </div>

                  {/* Step 제목 */}
                  <div className="flex justify-center items-center w-[160px] h-[30px] bg-primary text-white py-2 px-4 rounded-lg">
                    {step.title}
                  </div>

                  {/* Step 소제목 */}
                  <div className="flex justify-center items-center w-[160px] h-[40px] mt-2 bg-gray font-semibold rounded-t-md">
                    {step.subtitle}
                  </div>

                  {/* Step 설명 */}
                  <div className="flex justify-center items-center w-[160px] h-[100px] bg-lightgray font-semibold text-sm whitespace-pre-line rounded-b-md">
                    {step.description}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
        {/*</div>*/}
      </div>
    </>
  )
}
