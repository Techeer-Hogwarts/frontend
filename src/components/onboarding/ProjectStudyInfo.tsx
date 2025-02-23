import Image from 'next/image'

export default function ProjectStudyInfo() {
  return (
    <div className="relative h-[540px] p-10 flex justify-end items-center">
      {/* 배경 이미지 */}
      <Image
        width={400}
        height={500}
        src="/projectInfo.png"
        alt="projectInfo"
        className="absolute inset-0 left-20 -top-7 h-[500px] object-contain"
      />
      {/* 문구 */}
      <div className="flex flex-col h-full">
        <span className="text-primary font-bold text-[30px] text-end">
          프로젝트 & 스터디
        </span>
        <span className="font-bold text-[50px] text-end">
          완성도 높은 프로젝트를 통해
          <br />
          함께 성장하는 경험
        </span>
        <span className="mt-3 text-[25px] font-semibold text-black/60 text-end">
          단순한 기능 구현이 아닌 심도 있는 공부를 통해 스펙 쌓기
        </span>
      </div>
    </div>
  )
}
