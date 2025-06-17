'use client'

import TapBar from '@/components/common/TapBar'
import AddBtn from '@/components/common/AddBtn'
import BlogList from '@/components/blog/BlogList'
import SearchBar from '@/components/common/SearchBar'
import Dropdown from '@/components/common/Dropdown'
import { useTapBarStore } from '@/store/tapBarStore'
import { useState } from 'react'
import Image from 'next/image'
import Tooltip from '@/components/blog/Tip'

const category = [
  '전체보기',
  'TECHEER',
  'SHARED',
  '금주의 블로그',
  '블로깅 챌린지',
]
export default function Page() {
  const { activeOption } = useTapBarStore()

  // 드롭다운 선택된 옵션 상태 관리
  const [selectedYear, setSelectedYear] = useState<string[]>([])
  const [selectedTime, setSelectedTime] = useState<string[]>([])
  const [selectedSort, setSelectedSort] = useState('전체')
  // 드롭다운 항목 리스트
  const yearOptions = [
    '2024 상반기',
    '2024 하반기',
    '2025 상반기',
    '2025 하반기',
  ]
  const timeOptions = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
  const sortOptions = ['조회순', '좋아요순']

  return (
    <div className="flex justify-center h-auto min-h-screen">
      <div className="flex flex-col">
        <div className="w-[1200px] text-left mt-14 mb-[2.84rem]">
          <p className="text-[2rem] font-bold">블로그</p>
          <p className="text-[1.25rem]">테커인들의 블로그를 확인해보세요.</p>
        </div>
        <div className="flex justify-between">
          <TapBar options={category} />
          <SearchBar
            placeholder="이름 또는 키워드로 검색해보세요"
            index="blog"
            onSearchResult={null}
          />
        </div>
        <div className="flex w-full h-[1px] mt-5 bg-gray mb-[2rem]" />
        {activeOption === '블로깅 챌린지' && (
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
                  options={timeOptions} // Dropdown 컴포넌트에서 문자열로 처리
                  selectedOptions={selectedSort} // 숫자를 문자열로 변환
                  setSelectedOptions={setSelectedTime}
                />
                <Dropdown
                  title="정렬기준"
                  options={sortOptions} // Dropdown 컴포넌트에서 문자열로 처리
                  selectedOptions={selectedTime} // 숫자를 문자열로 변환
                  setSelectedOptions={setSelectedSort}
                />
              </div>
              <Tooltip
                content={
                  // 위 Tooltip.tsx에서 이미 정의한 내용이 들어가므로 content 생략 가능
                  undefined
                }
              >
                <Image
                  src="/images/question.svg"
                  alt="question"
                  width={20}
                  height={20}
                  className="cursor-pointer"
                />
              </Tooltip>
            </div>
            <div className="w-full h-[13rem] mt-5 rounded-lg border-2 border-gray">
              차트 들어갈 자리
            </div>
          </div>
        )}
        <BlogList />
      </div>
      <AddBtn />
    </div>
  )
}
