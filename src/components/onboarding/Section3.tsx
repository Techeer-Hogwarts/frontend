'use client'
import { motion } from 'framer-motion'
import BootcampCard from './BootCampCard'
import ActivityCard from '@/components/onboarding/ActivityCard'

export default function Section3() {
  return (
    <div className="relative min-w-[1200px] left-1/2 -translate-x-1/2 w-screen h-fit pb-32 flex flex-col py-40 bg-black items-center">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          ease: 'easeInOut',
          duration: 1,
        }}
        className="flex flex-col items-center"
      >
        <div className="flex flex-col items-center">
          <span className="flex items-center py-0.5 font-logo text-3xl justify-center text-white rounded-[2rem] w-[160px] h-[60px] mt-40 border-[3px] border-[#F57601]">
            ACTIVITY
          </span>
          <p className="text-2xl text-white mt-5">
            테커의 모든 활동은 <span className="font-bold">실전</span> 중심으로
            운영됩니다.
          </p>
        </div>
      </motion.div>
      <div className="relative grid grid-cols-2 gap-10 my-20 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
            delay: 1 * 0.3,
            ease: 'easeInOut',
          }}
        >
          <ActivityCard
            title="테커 SW 부트캠프"
            imageSrc="/images/onboarding/section3Talk.png"
            heading="테커 SW 부트캠프"
            descriptions={['매년 2회 진행되는', '5주간의 End to End 부트캠프']}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
            delay: 1 * 0.4,
            ease: 'easeInOut',
          }}
        >
          <ActivityCard
            title="테커파티"
            imageSrc="/images/onboarding/section3Party.png"
            heading="테커파티"
            descriptions={[
              '모든 테커인과 외부 SW 관계자가 함께 모여',
              '한 해의 성과 및 스토리 공유',
            ]}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
            delay: 1 * 0.5,
            ease: 'easeInOut',
          }}
        >
          <ActivityCard
            title="아이디어톤 & 해커톤"
            imageSrc="/images/onboarding/section3Ton.png"
            heading="아이디어톤 & 해커톤"
            descriptions={[
              '전국 대학생들이 모여 만드는',
              '무박 2일동안 진행되는 실전형 개발 대회',
            ]}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
            delay: 1 * 0.6,
            ease: 'easeInOut',
          }}
        >
          <ActivityCard
            title="실리콘밸리 한달살기"
            imageSrc="/images/onboarding/section3Month.png"
            heading="실리콘밸리 한달살기"
            descriptions={[
              'CES 참관부터 빅테크 탐방까지',
              '글로벌 개발 문화 체험',
            ]}
          />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          ease: 'easeInOut',
          duration: 1,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            ease: 'easeInOut',
            delay: 1 * 0.3,
            duration: 1,
          }}
        >
          <div className="text-white text-2xl font-normal mt-96 flex flex-col items-center">
            <span className="flex items-center  mb-6 font-logo text-3xl justify-center text-white rounded-[2rem] w-[160px] h-[60px] mt-40 border-[3px] border-[#F57601]">
              BOOTCAMP
            </span>
            <p>
              매 기수마다{' '}
              <span className="text-primary font-bold">
                실전 중심의 집중형 부트캠프
              </span>
              가 단계적으로 진행되며
            </p>
            <p>
              이 과정을 통해{' '}
              <span className="font-bold">
                함께 성장할 열정있는 팀원을 선발
              </span>
              합니다.
            </p>
          </div>
        </motion.div>
      </motion.div>
      <div className="grid grid-cols-3 gap-10 mt-28 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            ease: 'easeInOut',
            delay: 1 * 0.3,
            duration: 1,
          }}
        >
          <BootcampCard
            week="1주차"
            title1="주제 선정과 기획"
            items1={[
              '프로젝트 아이디어 정의 및 구체화',
              '기술 스택 선정',
              'Figma로 UI/UX 디자인 설계',
              '아키텍처 다이어그램을 활용한 시스템 구조 설계',
            ]}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            ease: 'easeInOut',
            delay: 1 * 0.4,
            duration: 1,
          }}
        >
          <BootcampCard
            week="2주차"
            title1="개발 환경 구축"
            items1={[
              '프론트엔드, 백엔드 각각의 개발 환경 세팅',
              'Git을 통한 협업 구조와 Docker 환경 구성',
            ]}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            ease: 'easeInOut',
            delay: 1 * 0.5,
            duration: 1,
          }}
        >
          <BootcampCard
            week="3주차"
            title1="백엔드 기초 개발"
            items1={[
              'DB 스키마 설계 및 구축',
              'API 명세 작성 및 문서 기반 개발',
            ]}
            title2="프론트엔드 기초 개발"
            items2={[
              'API 명세 기반 화면 흐름 설계',
              '초기 화면 UI 구현, 더미 데이터 활용 및 기본 동작 테스트 진행',
            ]}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            ease: 'easeInOut',
            delay: 1 * 0.4,
            duration: 1,
          }}
        >
          <BootcampCard
            week="4주차"
            title1="기능 개발 및 연동"
            items1={[
              '프론트엔드와 백엔드가 협업하며 실제 기능 구현',
              'API 연결, 문서화, 테스트까지 진행',
              '실시간 피드백과 리뷰를 통한 수정 및 고도화',
            ]}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            ease: 'easeInOut',
            delay: 1 * 0.5,
            duration: 1,
          }}
        >
          <BootcampCard
            week="5주차"
            title1="배포 및 마무리 작업"
            items1={[
              '클라우드 혹은 서버 환경을 활용한 서비스 배포',
              '클라우드 서버 모니터링 환경 구축',
              'README 작성 및 Medium 등 발표 자료 제작',
              '최종 발표 준비 및 최종 점검',
            ]}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            ease: 'easeInOut',
            delay: 1 * 0.6,
            duration: 1,
          }}
        >
          <BootcampCard
            week="최종 발표 및 선발"
            title1="최종 발표"
            items1={[
              '팀 프로젝트 결과물 소개 및 기획부터 구현까지의 전 과정 발표',
              '현업 실무자들로부터 개발과 비즈니스 관점의 피드백 제공',
            ]}
            title2="테커 선발"
            items2={['그 동안의 참여도를 바탕으로 테커 활동 참여 인원 선발']}
          />
        </motion.div>
      </div>
      <div className="mt-96 flex flex-col items-center">
        <span className="flex items-center mb-10 font-logo text-3xl justify-center text-white rounded-[2rem] w-[350px] h-[60px] mt-40 border-[3px] border-[#F57601]">
          AWARDS - SUMMER 2025
        </span>
        <div className="flex gap-24 ">
          <iframe
            width="464"
            height="320"
            src="https://www.youtube.com/embed/1QpcfX3ojxg"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen; web-share"
          ></iframe>
          <iframe
            width="464"
            height="320"
            src="https://www.youtube.com/embed/R5s1C-IRLTE"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen; web-share"
          ></iframe>
          <iframe
            width="464"
            height="320"
            src="https://www.youtube.com/embed/uyt9KrMvWGU"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen; web-share"
          ></iframe>
        </div>

        <span className="flex items-center py-0.5 mb-10 font-logo text-3xl justify-center text-white rounded-[2rem] w-[160px] h-[60px] mt-40 border-[3px] border-[#F57601]">
          INTERVIEW
        </span>
        <div className="flex justify-center gap-24 mb-60">
          <iframe
            width="464"
            height="320"
            src="https://www.youtube.com/embed/4KjA2y8rkAI"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen; web-share"
          ></iframe>
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
