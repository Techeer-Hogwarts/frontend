'use client'

import { motion, useReducedMotion } from 'framer-motion'

export default function Loading() {
  const reduceMotion = useReducedMotion()
  return (
    <div
      className="flex flex-col items-center justify-center h-[800px]"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <motion.div
        className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center"
        aria-hidden
        animate={
          reduceMotion
            ? undefined
            : {
                scale: [1, 1.1, 1],
                opacity: [0.7, 1, 0.7],
              }
        }
        transition={
          reduceMotion
            ? undefined
            : {
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }
        }
      >
        <motion.div
          className="w-16 h-16 bg-gray-300 rounded-full"
          aria-hidden
          animate={reduceMotion ? undefined : { rotate: 360 }}
          transition={
            reduceMotion
              ? undefined
              : {
                  duration: 2,
                  repeat: Infinity,
                  ease: 'linear',
                }
          }
        />
      </motion.div>
      <span className="sr-only">로딩 중...</span>
    </div>
  )
}
