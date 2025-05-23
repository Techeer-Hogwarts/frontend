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
    <div className="relative min-w-[1200px] w-screen h-[calc(130vh+5rem)] -top-20 left-1/2 -translate-x-1/2 ">
      <div className="absolute inset-0 z-0 overflow-x-hidden">
        <Image
          src="/images/onboarding/section1main.png"
          alt="section1"
          fill
          className="object-top"
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
{
  /* <p className="mt-6 text-2xl font-normal">
          테커는 그 지속 가능성을 함께 만듭니다.
        </p> */
}
