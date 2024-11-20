'use client'

import { useState } from 'react'
import TapBar from '@/components/common/TapBar'
import Dropdown from '@/components/common/Dropdown'
import FilterBtn from '@/components/session/FilterBtn'
import AddBtn from '@/components/common/AddBtn'
import ProfileCard from '@/components/profile/ProfileCard'

export default function Page() {
  const dummyDataArray = [
    {
      name: '홍길동',
      university: '공학대',
      year: '4학년',
      profileImage: '/profile.png', // 실제 이미지 경로
      role: 'Backend',
      skills: ['Python', 'Java', 'Nest.js', 'SpringBoot', 'Nest.js'],
      projects: ['/project1.png', '/project2.png'], // 실제 이미지 경로
      generation: '8',
    },
    {
      name: '김철수',
      university: '공학대',
      year: '3학년',
      profileImage: '/profile.png', // 실제 이미지 경로
      role: 'Frontend',
      skills: ['React', 'TypeScript', 'GraphQL'],
      projects: ['/project3.png', '/project4.png'], // 실제 이미지 경로
      generation: '7',
    },
    {
      name: '김철수',
      university: '공학대',
      year: '3학년',
      profileImage: '/profile.png', // 실제 이미지 경로
      role: 'Frontend',
      skills: ['React', 'TypeScript', 'GraphQL'],
      projects: ['/project3.png', '/project4.png'], // 실제 이미지 경로
      generation: '7',
    },
    {
      name: '김철수',
      university: '공학대',
      year: '3학년',
      profileImage: '/profile.png', // 실제 이미지 경로
      role: 'Frontend',
      skills: ['React', 'TypeScript', 'GraphQL'],
      projects: ['/project3.png', '/project4.png'], // 실제 이미지 경로
      generation: '7',
    },
    {
      name: '김철수',
      university: '공학대',
      year: '3학년',
      profileImage: '/profile.png', // 실제 이미지 경로
      role: 'Frontend',
      skills: ['React', 'TypeScript', 'GraphQL'],
      projects: ['/project3.png', '/project4.png'], // 실제 이미지 경로
      generation: '7',
    },
    {
      name: '김철수',
      university: '공학대',
      year: '3학년',
      profileImage: '/profile.png', // 실제 이미지 경로
      role: 'Frontend',
      skills: ['React', 'TypeScript', 'GraphQL'],
      projects: ['/project3.png', '/project4.png'], // 실제 이미지 경로
      generation: '7',
    },
    {
      name: '김철수',
      university: '공학대',
      year: '3학년',
      profileImage: '/profile.png', // 실제 이미지 경로
      role: 'Frontend',
      skills: ['React', 'TypeScript', 'GraphQL'],
      projects: ['/project3.png', '/project4.png'], // 실제 이미지 경로
      generation: '7',
    },
    {
      name: '김철수',
      university: '공학대',
      year: '3학년',
      profileImage: '/profile.png', // 실제 이미지 경로
      role: 'Frontend',
      skills: ['React', 'TypeScript', 'GraphQL'],
      projects: ['/project3.png', '/project4.png'], // 실제 이미지 경로
      generation: '7',
    },
    // 원하는 만큼 더 추가하세요
  ]

  const [selectedPeriods, setSelectedPeriods] = useState<string[]>([])
  return (
    <div className="flex justify-center">
      <div className="flex flex-col">
        <div className="w-[1200px] text-left mt-14 mb-7">
          <p className="text-4xl mb-5 font-bold">프로필</p>
          <p className="text-xl">모든 테커인들의 프로필 정보를 확인해보세요.</p>
        </div>

        <div className="flex justify-start mt-5 gap-3">
          <Dropdown
            title="포지션"
            options={['Frontend', 'Backend', 'DevOps', 'Others']}
            selectedOptions={selectedPeriods}
            setSelectedOptions={setSelectedPeriods}
          />
          <Dropdown
            title="기수"
            options={['1기', '2기', '3기', '4기', '5기', '6기', '7기', '8기']}
            selectedOptions={selectedPeriods}
            setSelectedOptions={setSelectedPeriods}
          />
          <Dropdown
            title="현재 상태"
            options={['진행 중', '완료']}
            selectedOptions={selectedPeriods}
            setSelectedOptions={setSelectedPeriods}
          />
          <Dropdown
            title="대학"
            options={['한국공대', '성결대']}
            selectedOptions={selectedPeriods}
            setSelectedOptions={setSelectedPeriods}
          />
        </div>

        <div className="bg-filterbg flex items-center w-[1200px] h-[100px] px-4 gap-4 my-6">
          <FilterBtn title="Frontend" />
          <FilterBtn title="1기" />
        </div>
        <div className="grid grid-cols-4 gap-x-7 gap-y-[0.94rem]">
          {dummyDataArray.map((data, index) => (
            <ProfileCard key={index} {...data} />
          ))}
        </div>
      </div>
    </div>
  )
}
