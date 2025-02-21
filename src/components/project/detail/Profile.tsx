'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'

interface MainImage {
  id: number
  isDeleted: boolean
  imageUrl: string
}

interface ProfileProps {
  projectDetail?: {
    id: number
    name: string
    notionLink?: string
    githubLink?: string
    recruitExplain?: string
    projectExplain?: string
    recruitNum?: number
    rule?: string
    goal?: string
    studyExplain?: string
    isRecruited?: boolean
    isFinished?: boolean
    resultImages?: any[]
    mainImages?: MainImage[]
  }
}

export default function Profile({ projectDetail }: ProfileProps) {
  const [projectType, setProjectType] = useState<string | null>(null)

  useEffect(() => {
    const storedProjectType = localStorage.getItem('projectType')
    if (storedProjectType) {
      setProjectType(storedProjectType)
    }
  }, [])

  // 메인 이미지 URL
  const mainImageUrl = projectDetail?.mainImages?.[0]?.imageUrl
    ? projectDetail.mainImages[0].imageUrl
    : '/images/project/example.png'

  return (
    <div
      className={`flex flex-col items-center ${
        projectDetail?.isFinished
          ? "bg-[url('/images/project/finishProfile.png')]"
          : "bg-[url('/images/project/profile.png')]"
      } w-[19.1875rem] h-[30.29606rem] bg-cover`}
    >
      {/* 상단 상태 표시 */}
      <div className="flex pt-[0.35rem] pl-7 mb-[1.56rem] w-full h-[1.56813rem] text-[0.9375rem] font-semibold">
        {projectDetail?.isFinished ? (
          <div className="text-blue">완료</div>
        ) : (
          <div className="text-pink">진행중</div>
        )}
      </div>

      {/* 스터디 / 프로젝트 구분 */}
      {projectType === 'study' ? (
        <div className="flex w-[15.875rem] h-[15.875rem] bg-gradient-to-b from-[#FF8B20] to-[#FFC14F] rounded-2xl text-white justify-center text-center items-center text-[1.5rem] font-bold">
          {projectDetail?.name}
        </div>
      ) : (
        <Image
          src={mainImageUrl}
          width={254}
          height={254}
          alt="프로젝트 메인 이미지"
          className="rounded-2xl object-cover w-[254px] h-[254px]"
        />
      )}

      {/* 프로젝트 이름 + 깃허브/노션 링크 */}
      <div className="flex w-[15.875rem] justify-between items-center mt-[0.94rem] mb-[1.44rem]">
        <div className="text-[1.25rem] font-bold flex items-center justify-center">
          {projectDetail?.name}
        </div>

        {/* 깃허브/노션 아이콘 영역 */}
        <div className="flex gap-2">
          {/* 깃허브: study가 아니고, githubLink가 있을 때만 표시 */}
          {projectType !== 'study' && projectDetail?.githubLink && (
            <button
              type="button"
              onClick={() => {
                window.location.href = projectDetail.githubLink!
              }}
            >
              <Image
                src="/images/project/github.svg"
                width={20}
                height={20}
                alt="github"
              />
            </button>
          )}

          {/* 노션: notionLink가 있을 때만 표시 */}
          {projectDetail?.notionLink && (
            <button
              type="button"
              onClick={() => {
                window.location.href = projectDetail.notionLink!
              }}
            >
              <Image
                src="/images/project/notion.svg"
                width={20}
                height={20}
                alt="notion"
              />
            </button>
          )}
        </div>
      </div>

      {/* 설명 */}
      <div className="w-[15.875rem]">
        {projectType === 'study'
          ? projectDetail?.studyExplain
          : projectDetail?.projectExplain}
      </div>
    </div>
  )
}
