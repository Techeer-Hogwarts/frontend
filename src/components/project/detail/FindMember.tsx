import { getPositionStyle } from '@/styles/positionStyles'

export default function FindMember({ variant, projectDetail }) {
  return (
    <div>
      <div className="text-[1.125rem] font-[600] mb-3">모집 정보</div>
      <div className="flex gap-3 mb-3">
        {variant === 'study' && (
          <div className="px-3 h-[1.4955rem] rounded-md bg-lightblue text-blue flex items-center justify-center">
            모집인원: {projectDetail.recruitNum}명
          </div>
        )}
        {variant === 'project' && projectDetail.frontendNum > 0 && (
          <BlueBox role="Frontend" num={projectDetail.frontendNum} />
        )}
        {variant === 'project' && projectDetail.backendNum > 0 && (
          <BlueBox role="Backend" num={projectDetail.backendNum} />
        )}
        {variant === 'project' && projectDetail.devopsNum > 0 && (
          <BlueBox role="DevOps" num={projectDetail.devopsNum} />
        )}
        {variant === 'project' && projectDetail.fullStackNum > 0 && (
          <BlueBox role="FullStack" num={projectDetail.fullStackNum} />
        )}
        {variant === 'project' && projectDetail.dataEngineerNum > 0 && (
          <BlueBox role="DataEngineer" num={projectDetail.dataEngineerNum} />
        )}
      </div>
      <div className="w-[52.5rem] p-[1.25rem] whitespace-pre-line rounded-2xl border border-gray">
        {projectDetail.recruitExplain}
      </div>
    </div>
  )
}

interface BlueBoxProps {
  role: string
  num: number
}

const BlueBox = ({ role, num }: BlueBoxProps) => {
  const { bg, textColor } = getPositionStyle(role)

  return (
    <div
      className={`px-3 h-[1.4955rem] rounded-md bg-${bg} ${textColor} flex items-center justify-center`}
    >
      {role}: {num}명
    </div>
  )
}
