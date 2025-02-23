import Image from 'next/image'

interface MainImage {
  id: number
  isDeleted: boolean
  imageUrl: string
}
interface ResultImages {
  id: number
  imageUrl: string
}
interface StudyMember {
  id: number
  name: string
  isDeleted: boolean
  isLeader: boolean
  studyTeamId: number
  userId: number
  email: string
}
interface ProfileProps {
  projectDetail?: {
    id: number
    name: string
    notionLink: string
    githubLink: string
    recruitExplain: string
    projectExplain: string
    recruitNum: number
    rule: string
    goal: string
    studyExplain: string
    isRecruited: boolean
    isFinished: boolean
    resultImages: ResultImages[]
    studyMember: StudyMember[]
    mainImages?: MainImage
    // studyMember: { name: string; leader: boolean }[] // 추후 수정 필요
  }
}

export default function Profile({ projectDetail }: ProfileProps) {
  const projectType = localStorage.getItem('projectType')

  return (
    <div
      className={`flex flex-col items-center ${
        projectDetail?.isFinished
          ? "bg-[url('/images/project/finishProfile.png')]"
          : "bg-[url('/images/project/profile.png')]"
      } w-[19.1875rem] h-[30.29606rem] bg-cover`}
    >
      <div
        className={`flex pt-[0.35rem] pl-7 mb-[1.56rem] w-full h-[1.56813rem] text-[0.9375rem] font-semibold`}
      >
        {projectDetail?.isFinished ? (
          <div className=" text-blue ">완료</div>
        ) : (
          <div className=" text-pink ">진행중</div>
        )}
      </div>
      {
        projectDetail && (
          <div className="flex w-[15.875rem] h-[15.875rem] bg-gradient-to-b from-[#FF8B20] to-[#FFC14F] rounded-2xl text-white justify-center text-center items-center text-[1.5rem] font-bold">
            {projectDetail?.name}
          </div>
        )
        // <Image
        //   src={projectDetail?.resultImages[0].imageUrl}
        //   width={254}
        //   height={254}
        //   alt="Picture"
        //   className=" rounded-2xl"
        // />
      }

      <div className="flex w-[15.875rem] justify-between items-center mt-[0.94rem] mb-[1.44rem] ">
        <div className="text-[1.25rem] font-bold  flex items-center justify-center">
          {projectDetail?.name}
        </div>

        <div className="flex gap-2">
          {projectDetail?.notionLink && (
            <button
              type="button"
              onClick={() => (window.location.href = projectDetail?.notionLink)}
            >
              <Image
                src="/images/project/notion.png"
                width={20}
                height={20}
                alt="notion"
              />
            </button>
          )}
        </div>
      </div>
      <div className="w-[15.875rem]">
        {projectType === 'study'
          ? projectDetail?.studyExplain
          : projectDetail?.projectExplain}
      </div>
    </div>
  )
}
