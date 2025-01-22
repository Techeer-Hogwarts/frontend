'use client'

import { useEffect, useState } from 'react'
import TapBar from '@/components/common/TapBar'
import Dropdown from '@/components/common/Dropdown'
import FilterBtn from '@/components/session/FilterBtn'
import AddBtn from '@/components/common/AddBtn'
import ProfileCard from '@/components/profile/ProfileCard'
import { getProfileList } from './api/getProfileList'
import { useGetProfileQuery } from './query/useGetProfileQuery'
import ProfileList from './@projectList'

export default function Page() {
  const [selectedPeriods, setSelectedPeriods] = useState<string[]>([])

  const position = ''
  const year = ''
  const university = ''
  const grade = ''
  const offset = 0
  const limit = 10

  return (
    <div className="flex justify-center">
      <div className="flex flex-col">
        <div className="max-w-[1200px] w-[1200px] text-left mt-[3.56rem] mb-[2rem]">
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
            options={['한국공대', '성결대', '인천대']}
            selectedOptions={selectedPeriods}
            setSelectedOptions={setSelectedPeriods}
            // selectedOptions={selectedUniversity}
            // setSelectedOptions={setSelectedUniversity}
          />
        </div>
        <div className="bg-filterbg flex items-center w-[1200px] h-[100px] px-4 gap-4 my-6">
          <FilterBtn title="Frontend" />
          <FilterBtn title="1기" />
        </div>
        <ProfileList
          position={position}
          year={year}
          university={university}
          grade={grade}
          offset={offset}
          limit={limit}
        />
      </div>
    </div>
  )
}
