'use client'
import ActivityCard from '@/components/onboarding/ActivityCard'
import BootcampCard from './BootCampCard'
import { motion } from 'framer-motion'

export default function Section3() {
  return (
    <div className="relative min-w-[1200px] left-1/2 -translate-x-1/2 w-screen h-fit pb-32 flex flex-col py-40 bg-black items-center">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{
          ease: 'easeInOut',
          duration: 1,
        }}
        className="flex flex-col items-center"
      >
        <span className="flex items-center py-0.5 font-logo text-3xl justify-center text-white rounded-[2rem]  w-[160px] h-16 mt-40 border-[3px] border-[#F57601]">
          ACTIVITY
        </span>
        <p className="text-2xl text-white mt-5">
          테커의 모든 활동은 실전 중심으로 운영됩니다.
        </p>
        <div className="relative grid grid-cols-2 gap-10 my-20 mb-20">
          <ActivityCard
            title="테커 SW 부트캠프"
            imageSrc="/images/onboarding/section3Talk.png"
            heading="테커 SW 부트캠프"
            descriptions={['매년 2회 진행되는', '6주간의 End to End 부트캠프']}
          />
          <ActivityCard
            title="테커파티"
            imageSrc="/images/onboarding/section3Party.png"
            heading="테커파티"
            descriptions={[
              '모든 테커인과 외부 SW 관계자가 함께 모여',
              '한 해의 성과 및 스토리 공유',
            ]}
          />
          <ActivityCard
            title="아이디어톤 & 해커톤"
            imageSrc="/images/onboarding/section3Ton.png"
            heading="아이디어톤 & 해커톤"
            descriptions={[
              '전국 대학생들이 모여 만드는',
              '무박 2일동안 진행되는 실전형 개발 대회',
            ]}
          />
          <ActivityCard
            title="실리콘밸리 한달살기"
            imageSrc="/images/onboarding/section3Month.png"
            heading="실리콘밸리 한달살기"
            descriptions={[
              'CES 참관부터 빅테크 탐방까지',
              '글로벌 개발 문화 체험',
            ]}
          />
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{
          ease: 'easeInOut',
          duration: 1,
        }}
      >
        <div className="text-white text-2xl mt-96 flex flex-col items-center">
          <p>
            매 기수마다{' '}
            <span className="text-primary">실전 중심의 집중형 부트캠프</span>가
            단계적으로 진행되며
          </p>
          <p>이 과정을 통해 함께 성장할 열정있는 팀원을 모집합니다.</p>
        </div>
        <div className="grid grid-cols-3 gap-10 mt-28 mb-20">
          <BootcampCard
            week="1주차"
            title1="주제 선정과 기획"
            items1={[
              '프로젝트 아이디어 정의 및 구체화',
              '기술 스택 선정',
              'UI/UX 디자인 설계',
              '아키텍처 다이어그램을 활용한 시스템 구조 설계',
            ]}
          />
          <BootcampCard
            week="2주차"
            title1="개발 환경 구축"
            items1={[
              '프론트엔드, 백엔드 각각의 개발 환경 세팅',
              'Git을 통한 협업 구조와 Docker 환경 구성',
            ]}
          />
          <BootcampCard
            week="3주차"
            title1="백엔드 기초 기초 개발"
            items1={[
              'DB 스키마 설계 및 구축',
              'API 명세 작성 및 문서 기반 개발',
              'DB 연결, 초기 테스트 진행',
            ]}
            title2="프론트엔드 기초 개발"
            items2={[
              'API 명세 기반 화면 흐름 설계',
              '초기 화면 UI 구현, 더미 데이터 활용 및 기본 동작 테스트 진행',
            ]}
          />
          <BootcampCard
            week="4주차"
            title1="기능 개발 및 연동"
            items1={[
              '프론트엔드와 백엔드가 협업하며 실제 기능 구현',
              'API 연결, 문서화, 테스트까지 진행',
              '실시간 피드백과 리뷰를 통한 수정 및 고도화',
            ]}
          />
          <BootcampCard
            week="5주차"
            title1="배포 및 마무리 작업"
            items1={[
              '클라우드 혹은 서버 환경을 활용한 서비스 배포',
              '기본적인 모니터링 환경 구축',
              'README 작성 및 Medium 등 외부 공유용 발표 자료 제작',
              '최종 발표를 준비 및 최종 점검',
            ]}
          />
          <BootcampCard
            week="6주차"
            title1="최종 발표"
            items1={[
              '팀 프로젝트 결과물 소개 및 기획부터 구현까지의 전 과정 발표',
              '현업 실무자들로부터 개발과 비즈니스 관점의 피드백 제공',
            ]}
            title2="테커 선발"
            items2={['그동안의 참여도를 바탕으로 테커 활동 참여 인원 선발']}
          />
        </div>
      </motion.div>
      <div className="mt-96 flex flex-col">
        <p className="text-2xl text-white text-center mb-16">
          2024 부트캠프 수상작
        </p>
        <div className="flex gap-24 ">
          <iframe
            width="464"
            height="320"
            src="https://www.youtube.com/embed/S6Wfo1eIWFo?si=1xXZWIQYC88MvTr6"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen; web-share"
          ></iframe>
          <iframe
            width="464"
            height="320"
            src="https://www.youtube.com/embed/USokIeaEH88?si=p2EKt9qdgHxrjEDB"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen; web-share"
          ></iframe>
          <iframe
            width="464"
            height="320"
            src="https://www.youtube.com/embed/XAjsyjMs9qk?si=gSEzH0kQ2zAmFEfd"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen; web-share"
          ></iframe>
        </div>
        <p className="text-2xl text-white text-center mt-40 mb-16">
          관련 인터뷰
        </p>
        <div className="flex justify-center gap-24 mb-60">
          <iframe
            width="464"
            height="320"
            src="https://www.youtube.com/embed/sKMGiMBQ5DA?si=Dn09TpwNaqydWPG5"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen; web-share"
          ></iframe>
          <iframe
            width="464"
            height="320"
            src="https://www.youtube.com/embed/jyJA6SWqz8k?si=bvmQOte2Ezf93ZYP"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen; web-share"
          ></iframe>
        </div>
      </div>
    </div>
  )
}
