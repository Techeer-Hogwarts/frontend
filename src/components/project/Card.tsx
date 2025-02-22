import Image from 'next/image'
import Link from 'next/link'

//더미값
const projectId = 23

interface ProjectProps {
  project: {
    type: string
    id: string
    isDeleted: boolean
    isRecruited: boolean
    isFinished: boolean
    name: string
    frontendNum: number
    backendNum: number
    devopsNum: number
    fullStackNum: number
    dataEngineerNum: number
    title: string
    projectExplain: string
    mainImage: string[]
    teamStacks: string[]
  }
}

export default function Card({ project }: ProjectProps) {
  const truncatedName =
    project?.name?.length > 12
      ? project.name.slice(0, 12) + '...'
      : project?.name || 'Unnamed Project'

  return (
    <Link
      href={`/project/detail/study/${projectId}`}
      // href={`/project/detail/project/${projectId}`}
      className="relative group bg-[url('/images/project/project.png')]  bg-cover w-[18rem] h-[11.375rem]"
    >
      <div className="text-pink w-[4.375rem] pt-2 text-[0.71181rem] text-center">
        프로젝트
      </div>
      <div className="flex items-center pt-[1rem] px-[0.75rem] gap-1 justify-center">
        {/* 이미지 */}
        <div className="min-w-[7.8125rem]">
          <Image
            src="/images/project/example.png"
            alt="프로젝트 이미지"
            width={125}
            height={125}
            className="rounded-md border bg-pink-300"
          />
        </div>
        <div className="">
          {/* 프로젝트 제목 */}
          <h2 className="font-bold text-[1.01688rem] gap-[2.44rem]">
            {truncatedName}
          </h2>

          {/* 프로젝트 설명 */}
          <p className="text-[0.75rem] mb-[2.44rem]">
            {project?.projectExplain || 'No description available'}
          </p>

          {/* 스택 카드 */}
          <div className="mt-4 grid grid-cols-2 grid-rows-2 gap-2">
            {project?.teamStacks?.slice(0, 4).map((stack, index) => (
              <div
                key={index}
                className="bg-lightprimary text-pink py-[0.19rem] px-[0.5rem] rounded-lg text-sm text-center"
              >
                {stack}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 호버 시 표시되는 부분 */}
      <div className="w-[17.3rem] h-[9.6rem] py-[3.25rem] px-[3rem] rounded-[0.63rem] absolute left-1 bottom-1  bg-black bg-opacity-75 flex items-center justify-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="text-white">
          <p className="mt-2 text-sm">
            {project?.projectExplain || 'No description available'}
          </p>
        </div>
      </div>
    </Link>
  )
}
