import Lottie from 'react-lottie-player'
import lottie from '../../../public/lottie.json'

interface LottieProps {
  text: string
  link: string
}

export default function EmptyLottie({ text, link }: Readonly<LottieProps>) {
  return (
    <div className="flex flex-col justify-center items-center w-[32rem] h-[25rem]">
      <Lottie loop animationData={lottie} play style={{ margin: '20px' }} />
      <span className="mb-2 text-[1.1rem] font-medium">
        {/* 현재 모집 중인 활동이 없습니다. */}
        {text}
      </span>
      <span className="text-[#FF7816] text-[1rem] font-medium">
        {/* 전체 활동 보러가기 */}
        {link}
      </span>
    </div>
  )
}
