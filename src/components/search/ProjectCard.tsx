import { getAllTeams } from '@/api/project/common'
import { useQueries } from '@tanstack/react-query'
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
  index: 'project'
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

  // 팀 스택이 없으면 아무것도 출력하지 않도록 처리
  const displayStacks =
    team.teamStacks.length > 0
      ? team.teamStacks.slice(0, 4).map((stack) => (
          <div
            key={stack.stackName}
            className="bg-lightprimary text-pink max-h-[1.4181rem] px-[0.3rem] rounded-md text-[13px]"
          >
            {stack.stackName}
          </div>
        ))
      : null
  return (
    <Link
      href={`/project/detail/project/${team.id}`}
      // onClick={handleClick}
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
            alt="프로젝트 이미지"
            width={125}
            height={125}
            className="object-cover w-[125px] h-[125px] rounded-lg border bg-pink-300"
          />
        </div>

        <div className="h-[7rem] max-h-[7rem] min-h-[7rem] min-w-28 flex flex-col justify-start ">
          <div className="mb-4 ">
            {/* 프로젝트 제목 */}
            <div className="max-w-28 truncate font-bold text-[1.01688rem] gap-[2.44rem]">
              {team.name}
            </div>

            {team.frontendNum > 0 &&
            team.backendNum > 0 &&
            team.devopsNum > 0 ? (
              <div className="h-5"></div>
            ) : (
              <p className="text-[0.75rem] max-w-28 max-h-8 truncate">
                {team.projectExplain}
              </p>
            )}
          </div>

          <div className="flex max-h-14 min-h-14 h-14">
            {/* 모집 여부에 따른 조건부 렌더링 */}
            {team.isRecruited ? (
              <>
                {/* 인원모집 */}
                <div className=" flex flex-col justify-end gap-2">
                  {team.frontendNum > 0 && (
                    <div className="bg-lightblue text-blue py-[0.1rem] px-[0.8rem] rounded-lg text-[13px]">
                      Frontend : {team.frontendNum}명
                    </div>
                  )}
                  {team.backendNum > 0 && (
                    <div className="bg-lightblue text-blue py-[0.1rem] px-[0.8rem] rounded-lg text-[13px]">
                      Backend : {team.backendNum}명
                    </div>
                  )}
                  {team.devopsNum > 0 && (
                    <div className="bg-lightblue text-blue py-[0.1rem] px-[0.8rem] rounded-lg text-[13px]">
                      Devops : {team.devopsNum}명
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex gap-1">{displayStacks}</div>
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
