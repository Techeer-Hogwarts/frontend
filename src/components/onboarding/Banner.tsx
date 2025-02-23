import Image from 'next/image'
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

export default function Banner() {
  return (
    <motion.div
      className="flex justify-between gap-[25rem]"
      initial="hidden"
      whileInView="visible"
      variants={fadeInVariants}
    >
      <div className="flex flex-col mt-[20px]">
        <span className="font-logo text-primary text-[100px]">TECHEER</span>
        <span className="font-normal text-[22px]">
          Technology부터 Career까지 모든 것을 담다.
        </span>
      </div>
      <div className="relative w-[350px] h-[350px] animate-float">
        <Image
          src="/clip_large.png"
          alt="largeclip"
          fill
          style={{ objectFit: 'contain' }}
        />
      </div>
    </motion.div>
)
}
