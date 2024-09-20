import Lottie from 'react-lottie-player'
import lottie from '../../assets/image/lottie.json'

const EmptyLottie = () => {
  return (
    <div className="flex flex-col justify-center items-center w-[32rem] h-[25rem]">
      <Lottie loop animationData={lottie} play style={{ margin: '20px' }} />
      <span className="mb-2 text-[1.1rem] font-medium">
        현재 모집 중인 활동이 없습니다.
      </span>
      <span className="text-[#FF7816] text-[1rem] font-medium">
        전체 활동 보러가기
      </span>
    </div>
  )
}

export default EmptyLottie
