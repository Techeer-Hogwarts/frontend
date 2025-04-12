'use client'

import { useState } from 'react'
import Dropdown from '@/components/common/Dropdown'
import FilterBtn from '@/components/session/FilterBtn'
import ProfileList from './@profiletList'
import {
  POSITION_OPTIONS,
  YEAR_OPTIONS,
  GRADE_OPTIONS,
  UNIVERSITY_OPTIONS,
} from '@/constants/profilefilter'
import TapBar from '@/components/common/TapBar'
import Search from '@/components/common/SearchBar'
import SearchBar from '@/components/common/SearchBar'

export default function Page() {
  // 검색어 상태 추가
  const [searchResults, setSearchResults] = useState<any>(null)

  const [selectedPosition, setSelectedPosition] = useState<string[]>([])
  const [selectedYear, setSelectedYear] = useState<string[]>([])
  const [selectedUniversity, setSelectedUniversity] = useState<string[]>([])
  const [selectedGrade, setSelectedGrade] = useState<string[]>([])

  //기수 탭
  // const category = ['전체', '이력서', '포트폴리오', 'ICT', 'OTHER']

  const handleRemoveFilter = (filter: string | number, type: string) => {
    if (type === 'position') {
      setSelectedPosition(selectedPosition.filter((item) => item !== filter))
    } else if (type === 'year') {
      setSelectedYear(selectedYear.filter((item) => item !== filter))
    } else if (type === 'university') {
      setSelectedUniversity(
        selectedUniversity.filter((item) => item !== filter),
      )
    } else if (type === 'grade') {
      setSelectedGrade(selectedGrade.filter((item) => item !== filter))
    }
  }

  return (
    <div className="flex justify-center">
      <div className="flex flex-col">
        <div className="flex justify-between w-[1200px] mt-14 mb-[2.84rem]">
          <div className="text-left">
            <p className="text-[2rem] font-bold">프로필</p>
            <p className="text-[1.25rem]">
              모든 테커인들의 프로필 정보를 확인해보세요.
            </p>
          </div>
          {/** 검색창 */}
          {/* <SearchBar
              placeholder="이름 또는 키워드로 검색해보세요"
              index="profile"
              onSearchResult={setSearchResults}
            /> */}
        </div>
        <div className="flex w-full h-[1px] mb-5 bg-gray"></div>
        <div className="flex justify-start gap-3">
          <Dropdown
            title="포지션"
            options={POSITION_OPTIONS}
            selectedOptions={selectedPosition}
            setSelectedOptions={setSelectedPosition}
          />
          <Dropdown
            title="기수"
            options={YEAR_OPTIONS} // Dropdown 컴포넌트에서 문자열로 처리
            selectedOptions={selectedYear.map(String)} // 숫자를 문자열로 변환
            setSelectedOptions={setSelectedYear}
          />
          <Dropdown
            title="대학"
            options={UNIVERSITY_OPTIONS}
            selectedOptions={selectedUniversity}
            setSelectedOptions={setSelectedUniversity}
          />
          <Dropdown
            title="학년"
            options={GRADE_OPTIONS}
            selectedOptions={selectedGrade}
            setSelectedOptions={setSelectedGrade}
          />
        </div>
        {[
          selectedPosition,
          selectedYear,
          selectedUniversity,
          selectedGrade,
        ].some((arr) => arr.length > 0) && (
          <div className="bg-filterbg flex items-center w-[75rem] h-[4.375rem] px-4 gap-4 mt-5">
            {selectedPosition.map((item) => (
              <FilterBtn
                key={item}
                title={item}
                onClick={() => {
                  handleRemoveFilter(item, 'position')
                }}
              />
            ))}
            {selectedYear.map((item) => (
              <FilterBtn
                key={item}
                title={item.toString()}
                onClick={() => handleRemoveFilter(item, 'year')}
              />
            ))}
            {selectedUniversity.map((item) => (
              <FilterBtn
                key={item}
                title={item}
                onClick={() => handleRemoveFilter(item, 'university')}
              />
            ))}
            {selectedGrade.map((item) => (
              <FilterBtn
                key={item}
                title={item}
                onClick={() => handleRemoveFilter(item, 'grade')}
              />
            ))}
          </div>
        )}
        <ProfileList
          position={selectedPosition}
          year={selectedYear}
          university={selectedUniversity}
          grade={selectedGrade}
        />
      </div>
    </div>
  )
}
