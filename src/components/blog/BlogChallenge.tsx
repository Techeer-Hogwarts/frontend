'use client'

import Tooltip from './Tip'
import Image from 'next/image'
import Dropdown from '../common/Dropdown'
import ParticipantProgressList from './ParticipantProgressList'
import { useState } from 'react'

const yearOptions = [
  '2024 상반기',
  '2024 하반기',
  '2025 상반기',
  '2025 하반기',
] as const
const timeOptions = ['1', '2', '3', '4', '5', '6', '7', '8', '9'] as const
const sortOptions = ['조회순', '좋아요순'] as const
type YearOption = (typeof yearOptions)[number]
type TimeOption = (typeof timeOptions)[number]
type SortOption = (typeof sortOptions)[number]

export function BlogChallenge() {
  const [selectedYear, setSelectedYear] = useState<YearOption[]>([])
  const [selectedTime, setSelectedTime] = useState<TimeOption[]>([])
  const [selectedSort, setSelectedSort] = useState<SortOption[]>([])
  return (
    <div>
      <div className="flex justify-between">
        <div className="flex gap-3">
          <Dropdown
            title="기간"
            options={yearOptions}
            selectedOptions={selectedYear}
            setSelectedOptions={setSelectedYear}
          />
          <Dropdown
            title="회차"
            options={timeOptions}
            selectedOptions={selectedSort}
            setSelectedOptions={setSelectedTime}
          />
          <Dropdown
            title="정렬기준"
            options={sortOptions}
            selectedOptions={selectedTime}
            setSelectedOptions={setSelectedSort}
          />
        </div>
        <Tooltip>
          <Image
            src="/images/question.svg"
            alt="question"
            width={20}
            height={20}
            className="cursor-pointer"
          />
        </Tooltip>
      </div>
      <div className="flex flex-col items-center">
        <Image
          src="/images/blog/blogchallengebanner.png"
          alt="blog-challenge"
          width={1200}
          height={200}
          className="mt-5 object-cover"
        />
        <button className="bg-[#FE9142] text-white px-9 py-1 rounded-xl hover:bg-[#FE9142]/80">
          지원하기
        </button>
        <ParticipantProgressList />
      </div>
    </div>
  )
}
