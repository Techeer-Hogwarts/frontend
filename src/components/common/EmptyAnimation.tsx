'use client'

import { motion } from 'framer-motion'

interface EmptyProps {
  text: string
  text2: string
}

export default function EmptyAnimation({ text, text2 }: Readonly<EmptyProps>) {
  return (
    <div className="flex flex-col justify-center items-center w-[32rem] h-[25rem]">
      <motion.div
        className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-5"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <motion.div
          className="w-16 h-16 bg-gray-300 rounded-full"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </motion.div>
      <motion.span
        className="mb-2 text-[1.1rem] font-medium"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {text}
      </motion.span>
      <motion.span
        className="text-[#FF7816] text-[1rem] font-medium"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        {text2}
      </motion.span>
    </div>
  )
}
