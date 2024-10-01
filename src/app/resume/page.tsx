'use client'

import ResumeFolder from '@/components/resume/ResumeFolder'
import Star from '../../../public/star.svg'
import Dropdown from '@/components/common/Dropdown'
import { useState } from 'react'

export default function resume() {
  // 드롭다운 선택된 옵션 상태 관리
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])

  // 드롭다운 항목 리스트
  const dropdownOptions = ['Frontend', 'Backend', 'DataEngineer']

  // 이력서 리스트
  const resumes = [
    {
      name: '박명수',
      period: '8기',
      position: 'Frontend',
      career: '3년',
      date: '2024.09.21',
    },
    {
      name: '유재석',
      period: '7기',
      position: 'Backend',
      career: '5년',
      date: '2024.09.19',
    },
    {
      name: '정준하',
      period: '6기',
      position: 'DataEngineer',
      career: '2년',
      date: '2024.09.18',
    },
    {
      name: '박명수',
      period: '8기',
      position: 'Frontend',
      career: '3년',
      date: '2024.09.21',
    },
    {
      name: '유재석',
      period: '7기',
      position: 'Backend',
      career: '5년',
      date: '2024.09.19',
    },
    {
      name: '정준하',
      period: '6기',
      position: 'DataEngineer',
      career: '2년',
      date: '2024.09.18',
    },
    {
      name: '박명수',
      period: '8기',
      position: 'Frontend',
      career: '3년',
      date: '2024.09.21',
    },
    {
      name: '유재석',
      period: '7기',
      position: 'Backend',
      career: '5년',
      date: '2024.09.19',
    },
    {
      name: '정준하',
      period: '6기',
      position: 'DataEngineer',
      career: '2년',
      date: '2024.09.18',
    },
    {
      name: '박명수',
      period: '8기',
      position: 'Frontend',
      career: '3년',
      date: '2024.09.21',
    },
    {
      name: '유재석',
      period: '7기',
      position: 'Backend',
      career: '5년',
      date: '2024.09.19',
    },
    {
      name: '정준하',
      period: '6기',
      position: 'DataEngineer',
      career: '2년',
      date: '2024.09.18',
    },
  ]

  return (
    <div className="flex flex-col w-[100vw] h-[100vh] px-[10rem] gap-6">
      <div className="flex w-full h-[4rem] bg-gray-300 "></div>
      {/** 배너 */}
      <div className="flex justify-between gap-10">
        <div className="flex flex-col">
          <span className="text-[2.5rem] font-bold">이력서</span>
          <span className="text-[1.25rem] font-medium">
            모든 테커인들의 이력서를 확인해보세요.
          </span>
        </div>
        <div className="flex justify-center items-center w-[13rem] h-[3rem] border-2 border-transparent shadow-md rounded-xl">
          <span className="text-[1.1rem] font-medium">
            나의 이력서 수정하기
          </span>
          <Star />
        </div>
      </div>
      {/** 기수 탭 */}
      {/** 드롭다운 */}
      <div className="">
        <Dropdown
          title="포지션"
          options={dropdownOptions}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
        />
      </div>
      {/** 이력서 폴더 */}
      <div className="flex flex-wrap gap-12">
        {resumes.map((resume, index) => (
          <ResumeFolder
            key={index}
            name={resume.name}
            period={resume.period}
            position={resume.position}
            career={resume.career}
            date={resume.date}
          />
        ))}
      </div>
    </div>
  )
}
