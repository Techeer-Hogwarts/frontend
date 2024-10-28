export default function FindMember() {
  return (
    <div>
      <div className="text-[1.125rem] font-[600] mb-3">모집 정보</div>
      <div className="flex gap-3 mb-3">
        <BlueBox role="Frontend" num={1} />
        <BlueBox role="DevOps" num={1} />
      </div>
      <div className="w-[52.5rem] p-[1.25rem] whitespace-pre-line rounded-2xl border border-gray">
        - Of the techeer, By the techeer, For the techeer{`\n`}- 테커에서 사용할
        수 있는 올인원 테커 포탈 서비스입니다(프로젝트, 이력서, 세션, 기술
        블로그){`\n`}- 다양한 기술을 시도해보고 싶은 분들 환영합니다
      </div>
    </div>
  )
}

interface BlueBoxProps {
  role: string
  num: number
}

const BlueBox = ({ role, num }: BlueBoxProps) => {
  return (
    <div className="w-[8.57925rem] h-[1.4955rem] rounded-md bg-lightblue text-blue flex items-center justify-center">
      {role}: {num}명
    </div>
  )
}
