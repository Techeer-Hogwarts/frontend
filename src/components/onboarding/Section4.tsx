import AutoSlider from './AutoSlider'
import { logos1, logos2, logos3, logos4 } from '@/constants/onboardingInfo'

export default function Section4() {
  return (
    <div className="relative min-w-[1200px] left-1/2 py-8 -translate-x-1/2 w-screen mt-72 flex flex-col h-fit items-center">
      <p className="text-3xl font-bold mb-5">
        국내외 대학생들이 함께 만드는, 실전형 개발 생태계
      </p>
      <p className="text-[#737373] text-2xl font-medium mb-10">
        총 <span className="text-[#F57601]">34</span>개 대학의 실력자들이
        활발하게 활동 중입니다.
      </p>
      <AutoSlider logos={logos1} direction="left" />
      <AutoSlider logos={logos2} direction="right" />
      <p className="text-[#737373] font-semibold text-2xl mb-10 mt-40">
        테커에서 함께했던 이들이 지금은
        <span className="text-[#F57601]"> 주요 IT 기업</span>의 핵심 인재로
        일하고 있습니다.
      </p>

      <AutoSlider logos={logos3} direction="left" />
      <AutoSlider logos={logos4} direction="right" />
      {/* <div className="relative min-w-[1200px] left-1/2 -translate-x-1/2 w-screen flex flex-col mt-32 items-center py-32 pb-52 bg-black">
        <p className="text-2xl text-white font-semibold mt-32 mb-10">
          모집 기간이 시작되었어요. 지금 지원하고 부트캠프에서 함께 성장해요!
        </p>
        <BootcampBtn />
      </div> */}
    </div>
  )
}
