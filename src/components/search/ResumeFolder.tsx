'use client'
import { useState } from 'react'
import CareerTag from '../common/CareerTag'
import PositionTag from '../common/PositionTag'
import Link from 'next/link'
import Image from 'next/image'

interface ResumeProps {
  resume: {
    id: number
    title: string
    url: string
    createdAt: number
    userName: string
    year: string
    position: string
  }
}
export default function ResumeFolder({ resume }: ResumeProps) {
  const formattedDate = new Date(resume.createdAt).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })

  //이력서 타이틀 설정
  const resumeTitle = resume.title.split('-').slice(-1).join(' ')
  const truncatedTitle =
    resumeTitle.length > 16 ? resumeTitle.slice(0, 16) + '...' : resumeTitle

  return (
    <div className="flex flex-wrap gap-12">
      <Link
        key={resume.id}
        href={`/resume/${resume.id}`}
        className="flex flex-col w-[16.5rem] h-[10.25rem] gap-2 px-5 border-t-[0.4rem] border-darkgray shadow-lg"
      >
        {/** 이름/기수 */}
        <div className="flex flex-row justify-between mt-3 mx-1">
          <span className="font-bold text-[1.25rem]">{truncatedTitle}</span>
        </div>
        <span className="flex w-[14rem] border-t border-darkgray"></span>
        {/** 포지션/경력 */}
        <div className="flex flex-row justify-between gap-1 mt-1 mb-6">
          <PositionTag position={resume.position} />
          {/* <CareerTag career={userPosition} /> */}
          <div className="flex gap-2">
            <span className="ml-2 text-[1rem]">{resume.userName}</span>
            <span className="text-darkgray">{resume.year}기</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          {/** 날짜 */}
          <span className="ml-1 font-light text-[1rem]">{formattedDate}</span>
        </div>
      </Link>
    </div>
  )
}
