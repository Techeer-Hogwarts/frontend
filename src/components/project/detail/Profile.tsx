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
  // 메인 이미지 URL
  const mainImageUrl = projectDetail?.mainImages?.[0]?.imageUrl
    ? projectDetail.mainImages[0].imageUrl
    : '/images/project/example.png'

  const isFinished = projectDetail?.isFinished

  return (
    <div className="flex flex-col w-[19rem]">
      {/* ====== 상단 탭 부분 ====== */}
      <div className="flex items-end">
        {/* 탭 직사각형 */}
        <div
          className={`
            w-[6rem] h-[1.5rem] flex items-center justify-center rounded-t-md
            shadow-cardtop text-sm font-semibold
            ${isFinished ? 'bg-lightblue text-blue' : 'bg-lightprimary text-pink'}
          `}
        >
          {isFinished ? '완료' : '진행중'}
        </div>

        {/* 탭 삼각형 */}
        <div
          className={`
            w-1 h-[1.2rem]
            shadow-md
            ${isFinished ? 'bg-lightblue' : 'bg-lightprimary'}
          `}
          style={{
            clipPath: 'polygon(0 100%, 0 0, 100% 100%)',
          }}
        />
      </div>

      {/* ====== 메인 본체 ====== */}
      <div
        className="
          w-[19rem] min-h-[28rem]
          rounded-b-lg rounded-tr-lg shadow-card
          flex flex-col items-center p-[1.438rem]
        "
      >
        {/* ==== 메인 콘텐츠 ==== */}
        <div className="flex flex-col items-center">
          {/* 스터디 / 프로젝트 구분 */}
          {mainImageUrl ? (
            <Image
              src={mainImageUrl}
              width={254}
              height={254}
              alt="프로젝트 메인 이미지"
              className="rounded-2xl object-cover w-[254px] h-[254px]"
            />
          ) : (
            <div className="flex w-[15.875rem] h-[15.875rem] bg-gradient-to-b from-[#FF8B20] to-[#FFC14F] rounded-2xl text-white text-center justify-center items-center text-[1.5rem] font-bold">
              {projectDetail.name}
            </div>
          )}

          {/* 프로젝트 이름 + 깃허브/노션 링크 */}
          <div className="flex w-[15.875rem] justify-between items-center mt-[1rem] mb-[1.5rem]">
            <div className="max-w-[12.25rem] text-[1.25rem] font-bold flex items-center truncate">
              {projectDetail?.name}
            </div>

            {/* 깃허브/노션 아이콘 영역 */}
            <div className="flex gap-2">
              {/* 깃허브: study가 아니고, githubLink가 있을 때만 표시 */}
              {projectDetail?.githubLink && (
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

          {/* 3) 설명 부분 */}
          <div className="w-[15.875rem] whitespace-pre-wrap break-words">
            {projectDetail?.projectExplain || '설명이 없습니다.'}
          </div>
        </div>
      </div>
    </div>
  )
}
