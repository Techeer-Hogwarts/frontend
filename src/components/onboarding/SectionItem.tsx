'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

interface SectionItemProps {
  title: string[]
  description: string[]
  imageSrc: string
  reverse?: boolean
}

export default function SectionItem({
  title,
  description,
  imageSrc,
  reverse = false,
}: SectionItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        ease: 'easeInOut',
        duration: 1,
      }}
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
          <div className="mb-12 text-3xl font-semibold border-r-">
            {title.map((line, idx) => (
              <p
                key={idx}
                className={`border-primary ${reverse ? 'border-r-[7px] pr-3' : 'border-l-[7px] pl-3'}`}
              >
                {line}
              </p>
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
