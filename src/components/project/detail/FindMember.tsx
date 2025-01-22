export default function FindMember({ projectDetail, projectType }) {
  console.log(projectDetail)

  return (
    <div>
      <div className="text-[1.125rem] font-[600] mb-3">모집 정보</div>
      <div className="flex gap-3 mb-3">
        {projectType === 'study' && (
          <BlueBox role="모집인원" num={projectDetail.recruitNum} />
        )}
        {projectType === 'project' && projectDetail.frontendNum > 0 && (
          <BlueBox role="Frontend" num={projectDetail.frontendNum} />
        )}
        {projectType === 'project' && projectDetail.backendNum > 0 && (
          <BlueBox role="Backend" num={projectDetail.backendNum} />
        )}
        {projectType === 'project' && projectDetail.devopsNum > 0 && (
          <BlueBox role="DevOps" num={projectDetail.devopsNum} />
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
  return (
    <div className="w-[8.57925rem] h-[1.4955rem] rounded-md bg-lightblue text-blue flex items-center justify-center">
      {role}: {num}명
    </div>
  )
}
