'use client'

import { useCallback } from 'react'
import Lottie from 'react-lottie-player'
import lottie from '@/../public/images/onboarding/downLottie.json'

export default function LottiePlayer() {
  const handleClick = useCallback(() => {
    window.scrollTo({
      top: 1200,
      behavior: 'smooth',
    })
  }, [])
  return (
    <Lottie
      loop
      animationData={lottie}
      play
      className="w-24 mt-40 h-28 cursor-pointer"
      onClick={handleClick}
    />
  )
}
