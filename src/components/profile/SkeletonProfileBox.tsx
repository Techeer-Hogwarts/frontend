'use client'

import React from 'react'
import Image from 'next/image'

export default function SkeletonProfileBox() {
  return (
    <div className="flex w-[19rem] h-[23rem] animate-pulse">
      {/* Folder 이미지는 항상 표시 */}
      <div className="relative z-0">
        <Image src="/folder.svg" alt="Folder" width={242} height={374} />
        {/* 폴더 내부 스켈레톤 UI */}
        <div className="absolute z-10 flex flex-col top-[13%] left-[13%] w-[11rem] gap-1">
          {/* 프로필 사진 자리 */}
          <div className="flex w-[11rem] h-[11rem] bg-lightgray rounded-xl" />
          {/* 이름 및 아이콘 자리 */}
          <div className="flex flex-row justify-between mt-1">
            <div className="h-6 w-20 bg-lightgray rounded" />
            <div className="flex flex-row gap-2 items-center">
              <div className="h-4 w-4 bg-lightgray rounded-full" />
              <div className="h-4 w-4 bg-lightgray rounded-full" />
            </div>
          </div>
          {/* 이메일 자리 */}
          <div className="bg-lightgray h-4 w-full rounded" />
          {/* 소속 정보 자리 */}
          <div className="flex flex-row justify-between gap-2 mt-1">
            <div className="bg-lightgray h-4 w-12 rounded" />
            <div className="bg-lightgray h-4 w-12 rounded" />
            <div className="bg-lightgray h-4 w-12 rounded" />
          </div>
          {/* 포지션/경력 자리 */}
          <div className="flex flex-row gap-2 mt-1">
            <div className="bg-lightgray h-6 w-16 rounded" />
            <div className="bg-lightgray h-6 w-16 rounded" />
          </div>
        </div>
      </div>
    </div>
  )
}
