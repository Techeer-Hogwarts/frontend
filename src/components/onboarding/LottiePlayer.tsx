'use client'

import { useCallback } from 'react'
import { motion } from 'framer-motion'

export default function ScrollIndicator() {
  const handleClick = useCallback(() => {
    window.scrollTo({
      top: 1200,
      behavior: 'smooth',
    })
  }, [])

  return (
    <motion.div
      className="w-24 mt-40 h-28 cursor-pointer flex items-center justify-center"
      onClick={handleClick}
      animate={{
        y: [0, 10, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <motion.div
        className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </motion.div>
  )
}
