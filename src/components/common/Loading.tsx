'use client'

import { motion } from 'framer-motion'

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-[800px]">
      <motion.div
        className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center"
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
    </div>
  )
}
