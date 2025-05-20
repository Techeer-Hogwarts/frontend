'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface SectionItemProps {
  title: string[]
  description: string[]
  imageSrc: string
  reverse?: boolean
}

const fadeInVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: () => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  }),
}

export default function SectionItem({
  title,
  description,
  imageSrc,
  reverse = false,
}: SectionItemProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      variants={fadeInVariants}
      viewport={{ amount: 0.01, once: false }}
    >
      <div
        className={`relative z-40 flex items-center px-32 gap-14 ${
          reverse ? 'justify-end text-right' : 'justify-start text-left'
        }`}
      >
        {!reverse && (
          <Image src={imageSrc} alt="section" width={360} height={420} />
        )}
        <div>
          <div className="mb-12 text-3xl font-semibold">
            {title.map((line, idx) => (
              <p key={idx}>{line}</p>
            ))}
          </div>
          <div className="font-normal text-md">
            {description.map((line, idx) => (
              <p key={idx}>{line}</p>
            ))}
          </div>
        </div>
        {reverse && (
          <Image src={imageSrc} alt="section" width={360} height={420} />
        )}
      </div>
    </motion.div>
  )
}
