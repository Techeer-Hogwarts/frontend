import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface TeamBase {
  id: number
  isDeleted: boolean
  isRecruited: boolean
  isFinished: boolean
  name: string
  createdAt: string
}

interface ProjectTeam extends TeamBase {
  type: 'project'
  frontendNum: number
  backendNum: number
  devopsNum: number
  fullStackNum: number
  dataEngineerNum: number
  projectExplain: string
  mainImages?: string[]
  teamStacks: { stackName: string; isMain: boolean }[]
}
export default function ProjectCard({ team }: { team: ProjectTeam }) {
  const mainImageUrl =
    team.mainImages && team.mainImages.length > 0
      ? team.mainImages[0] // 첫 번째 요소가 곧 URL
      : '/images/project/example.png'

  const handleClick = () => {
    localStorage.setItem('projectType', 'project')
    localStorage.setItem('projectId', team.id.toString())
  }

  let count = 0

  return (
    <Link
      href={`/project/detail/project/${team.id}`}
      onClick={handleClick}
      className="relative group bg-[url('/images/project/projectCard.png')] bg-cover w-[18rem] h-[11.375rem]"
    >
      <div className="text-pink w-[4.375rem] pt-2 text-[0.71181rem] text-center">
        프로젝트
      </div>

      <div className="flex items-center pt-[1rem] px-[0.9rem] gap-3 justify-center">
        {/* 이미지 */}
        <div className="w-[7.8125rem] h-[7.8125rem] min-w-[7.8125rem] rounded-2xl">
          <Image
            src={mainImageUrl}
            alt="프로젝트 메인 이미지"
            width={125}
            height={125}
            className="rounded-lg object-cover w-[125px] h-[125px]"
          />
        </div>

        <div className="min-w-28 flex flex-col justify-between h-[125px]">
          {/* 프로젝트 제목 */}
          <div className="max-w-28 truncate font-bold text-[1.01688rem]">
            {team.name}
          </div>

          <div className="flex">
            {/* 모집 여부에 따른 조건부 렌더링 */}
            {team.isRecruited ? (
              <>
                {/* 인원모집 */}
                <div className="flex flex-col justify-end gap-2">
                  {team.frontendNum > 0 &&
                    count < 3 &&
                    (count++,
                    (
                      <div className="bg-lightblue text-blue py-[0.1rem] w-[7rem] rounded-lg text-[13px] text-center">
                        Frontend : {team.frontendNum}명
                      </div>
                    ))}
                  {team.backendNum > 0 &&
                    count < 3 &&
                    (count++,
                    (
                      <div className="bg-lightgreen text-green py-[0.1rem] w-[7rem] rounded-lg text-[13px] text-center">
                        Backend : {team.backendNum}명
                      </div>
                    ))}
                  {team.devopsNum > 0 &&
                    count < 3 &&
                    (count++,
                    (
                      <div className="bg-lightpink text-pink py-[0.1rem] w-[7rem] rounded-lg text-[13px] text-center">
                        DevOps : {team.devopsNum}명
                      </div>
                    ))}
                  {team.fullStackNum > 0 &&
                    count < 3 &&
                    (count++,
                    (
                      <div className="bg-lightyellow text-yellow py-[0.1rem] w-[7rem] rounded-lg text-[13px] text-center">
                        FullStack : {team.fullStackNum}명
                      </div>
                    ))}
                  {team.dataEngineerNum > 0 &&
                    count < 3 &&
                    (count++,
                    (
                      <div className="bg-lightpurple text-purple py-[0.1rem] w-[7rem] rounded-lg text-[13px] text-center">
                        Data : {team.dataEngineerNum}명
                      </div>
                    ))}
                </div>
              </>
            ) : (
              <div className="flex flex-col gap-1 h-[6.25rem] items-start justify-end">
                {team.teamStacks.map(
                  (stack) =>
                    stack.isMain && (
                      <div
                        key={stack.stackName}
                        className="bg-lightprimary text-pink py-[0.1rem] px-[0.3rem] rounded-md text-[13px] truncate max-w-[7rem]"
                      >
                        {stack.stackName}
                      </div>
                    ),
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 호버 시 표시되는 부분 */}
      <div className="w-[17.3rem] h-[9.6rem] py-[3.25rem] px-[3rem] rounded-[0.63rem] absolute left-1 bottom-1 bg-black bg-opacity-75 flex items-center justify-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="text-white">
          <p className="mt-2 text-sm">{team.projectExplain}</p>
        </div>
      </div>
    </Link>
  )
}
