'use client'

import { useState } from 'react'
import Dropdown from '@/components/profile/Dropdown'
import FilterBtn from '@/components/session/FilterBtn'
import ProfileList from './@projectList'

export default function Page() {
  const [selectedPeriods, setSelectedPeriods] = useState<string[]>([])
  const [selectedPosition, setSelectedPosition] = useState<string[]>([])
  const [selectedYear, setSelectedYear] = useState<string[]>([])
  const [selectedActive, setSelectedActive] = useState<string[]>([])
  const [selectedUniversity, setSelectedUniversity] = useState<string[]>([])

  const positionOptions = ['Frontend', 'Backend', 'DataEngineer', 'DevOps']
  const yearOptions = ['1기', '2기', '3기', '4기', '5기', '6기', '7기', '8기']
  const activeOptions = ['활동 중', '활동 안함']
  const universityOptions = [
    '강원대',
    '성결대',
    '안양대',
    '인천대',
    '충남대',
    '한국공학대',
  ]

  const handleRemoveFilter = (filter: string, type: string) => {
    if (type === 'position') {
      setSelectedPosition(selectedPosition.filter((item) => item !== filter))
    } else if (type === 'year') {
      setSelectedYear(selectedYear.filter((item) => item !== filter))
    } else if (type === 'active') {
      setSelectedActive(selectedActive.filter((item) => item !== filter))
    } else if (type === 'university') {
      setSelectedUniversity(
        selectedUniversity.filter((item) => item !== filter),
      )
    }
  }

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
            options={positionOptions}
            selectedOptions={selectedPosition}
            setSelectedOptions={setSelectedPosition}
          />
          <Dropdown
            title="기수"
            options={yearOptions}
            selectedOptions={selectedYear}
            setSelectedOptions={setSelectedYear}
          />
          <Dropdown
            title="현재 상태"
            options={activeOptions}
            selectedOptions={selectedActive}
            setSelectedOptions={setSelectedActive}
          />
          <Dropdown
            title="대학"
            options={universityOptions}
            selectedOptions={selectedUniversity}
            setSelectedOptions={setSelectedUniversity}
            // selectedOptions={selectedUniversity}
            // setSelectedOptions={setSelectedUniversity}
          />
        </div>
        <div className="bg-filterbg flex items-center w-[1200px] h-[100px] px-4 gap-4 my-6">
          {selectedPosition.map((item) => (
            <FilterBtn
              key={item}
              title={item}
              onClick={() => handleRemoveFilter(item, 'position')}
            />
          ))}
          {selectedYear.map((item) => (
            <FilterBtn
              key={item}
              title={item}
              onClick={() => handleRemoveFilter(item, 'year')}
            />
          ))}
          {selectedActive.map((item) => (
            <FilterBtn
              key={item}
              title={item}
              onClick={() => handleRemoveFilter(item, 'active')}
            />
          ))}
          {selectedUniversity.map((item) => (
            <FilterBtn
              key={item}
              title={item}
              onClick={() => handleRemoveFilter(item, 'university')}
            />
          ))}
        </div>
        <ProfileList
          position={selectedPosition.join(',')}
          year={selectedYear.join(',')}
          university={selectedUniversity.join(',')}
          grade={selectedActive.join(',')}
        />
      </div>
    </div>
  )
}
