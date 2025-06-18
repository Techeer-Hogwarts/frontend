'use client'

import React from 'react'
import Image from 'next/image'

interface MainImage {
  id: number
  isDeleted: boolean
  imageUrl: string
}

interface ProfileProps {
  /** 'project' 또는 'study' 모드 지정 */
  variant: 'project' | 'study'
  projectDetail?: {
    id: number
    name: string
    notionLink?: string
    githubLink?: string
    recruitExplain?: string
    projectExplain?: string
    studyExplain?: string
    isRecruited?: boolean
    isFinished?: boolean
    resultImages?: any[]
    mainImages?: MainImage[]
  }
}

export default function ProjectProfile({
  variant,
  projectDetail,
}: ProfileProps) {
  const isFinished = projectDetail?.isFinished

  // project에서는 첫 mainImageUrl, study에서는 gradient box
  const mainImageUrl =
    variant === 'project'
      ? projectDetail?.mainImages?.[0]?.imageUrl ||
        '/images/project/example.png'
      : ''

  const title = projectDetail?.name || ''
  const linkGroup =
    variant === 'project'
      ? [
          projectDetail?.githubLink && (
            <button
              key="github"
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
          ),
          projectDetail?.notionLink && (
            <button
              key="notion"
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
          ),
        ]
      : projectDetail?.notionLink
        ? [
            <button
              key="notion"
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
            </button>,
          ]
        : []

  const description =
    variant === 'project'
      ? projectDetail?.projectExplain
      : projectDetail?.studyExplain

  return (
    <div className="flex flex-col w-[19rem]">
      {/* 상단 탭 */}
      <div className="flex items-end">
        <div
          className={
            `w-[6rem] h-[1.5rem] flex items-center justify-center rounded-t-md shadow-cardtop text-sm font-semibold ` +
            (isFinished
              ? 'bg-lightblue text-blue'
              : 'bg-lightprimary text-pink')
          }
        >
          {isFinished ? '완료' : '진행중'}
        </div>
        <div
          className={
            `w-1 h-[1.2rem] shadow-md ` +
            (isFinished ? 'bg-lightblue' : 'bg-lightprimary')
          }
          style={{ clipPath: 'polygon(0 100%, 0 0, 100% 100%)' }}
        />
      </div>

      {/* 본체 */}
      <div className="w-[19rem] min-h-[28rem] rounded-b-lg rounded-tr-lg shadow-card flex flex-col items-center p-[1.438rem]">
        <div className="flex flex-col items-center">
          {/* 이미지 또는 텍스트 박스 */}
          {variant === 'project' ? (
            <Image
              src={mainImageUrl}
              width={254}
              height={254}
              alt="프로젝트 메인 이미지"
              className="rounded-2xl object-cover w-[254px] h-[254px]"
            />
          ) : (
            <div className="flex w-[15.875rem] h-[15.875rem] bg-gradient-to-b from-[#FF8B20] to-[#FFC14F] rounded-2xl text-white text-center justify-center items-center text-[1.5rem] font-bold">
              {title}
            </div>
          )}

          {/* 이름 + 링크 */}
          <div className="flex w-[15.875rem] justify-between items-center mt-[1rem] mb-[1.5rem]">
            <div className="max-w-[12.25rem] text-[1.25rem] font-bold flex items-center truncate">
              {title}
            </div>
            <div className="flex gap-2">{linkGroup}</div>
          </div>

          {/* 설명 */}
          <div className="w-[15.875rem] whitespace-pre-wrap break-words">
            {description || '설명이 없습니다.'}
          </div>
        </div>
      </div>
    </div>
  )
}
