import Image from 'next/image'
import dynamic from 'next/dynamic'
import BootcampBtn from './BootcampBtn'

const LottiePlayer = dynamic(
  () => import('@/components/onboarding/LottiePlayer'),
  {
    ssr: false,
    loading: () => <div style={{ height: '7rem' }} />,
  },
)

export default function Section1() {
  return (
    <div className="relative  w-screen h-[100vh+10rem] min-w-[1200px] min-h-fit -top-20 left-1/2 -translate-x-1/2 mb-80">
      <div className="absolute inset-0 z-0 overflow-x-hidden min-h-[1300px] h-[100vh+10rem]">
        <Image
          src="/images/onboarding/section1main2.png"
          alt="section1"
          fill
          className="object-cover"
          priority
          unoptimized
        />
      </div>

      <div className="relative z-10 flex flex-col bottom-20 items-center justify-center overflow-x-hidden text-6xl font-bold text-white pt-80">
        <p className="bg-gradient-to-r from-white to-[#cecece] text-transparent bg-clip-text">
          일회용 취업이 아닌
        </p>
        <p className="mt-4 mb-16 bg-gradient-to-r from-white to-[#cecece] text-transparent bg-clip-text">
          <span className="text-[#F57601]">장기적인 커리어</span>를 만드는
          사람들
        </p>

        <BootcampBtn />
        <LottiePlayer />
      </div>
    </div>
  )
}
