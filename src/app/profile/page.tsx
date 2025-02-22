'use client'

import { useState } from 'react'
import Dropdown from '@/components/common/Dropdown'
import FilterBtn from '@/components/session/FilterBtn'
import ProfileList from './@profiletList'
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

  // 검색어 상태 추가
  const [searchQuery, setSearchQuery] = useState<string>('')

  // 검색어 저장 및 이력서 목록 업데이트
  const handleSearch = (query: string) => {
    setSearchQuery(query)
    sessionStorage.setItem('searchQuery', query)
  }

  const positionOptions = ['FRONTEND', 'BACKEND', 'DEVOPS', 'FULL_STACK']
  const yearOptions = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
  const gradeOptions = ['1학년', '2학년', '3학년', '4학년', '졸업']
  const universityOptions = [
    '강원대',
    '가톨릭대학교',
    '가천대학교',
    '광운대학교',
    '단국대학교',
    '대구가톨릭대학교',
    '덕성여자대학교',
    '동덕여자대학교',
    '서강대학교',
    '성결대학교',
    '세종대학교',
    '안양대학교',
    '연세대학교',
    '이화여자대학교',
    '인천대학교',
    '인하대학교',
    '중앙대학교',
    '창원대학교',
    '충남대학교',
    '충북대학교',
    '평택대학교',
    '부산대학교',
    '한국공학대학교',
    '한서대학교',
    '한성대학교',
    '호서대학교',
  ]
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
        <div className="max-w-[75rem] w-[75rem] text-left mt-[3.56rem] mb-[2rem]">
          <p className="text-[2.5rem]  mb-5 font-bold">프로필</p>
          <div className="flex justify-between">
            <p className="text-[1.25rem]">
              모든 테커인들의 프로필 정보를 확인해보세요.
            </p>
            {/** 검색창 */}
            {/* <SearchBar
              placeholder="이름 또는 키워드로 검색해보세요"
              index="profile"
              onSearchResult={setSearchResults}
            /> */}
          </div>
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
            options={yearOptions} // Dropdown 컴포넌트에서 문자열로 처리
            selectedOptions={selectedYear.map(String)} // 숫자를 문자열로 변환
            setSelectedOptions={setSelectedYear}
          />
          <Dropdown
            title="대학"
            options={universityOptions}
            selectedOptions={selectedUniversity}
            setSelectedOptions={setSelectedUniversity}
          />
          <Dropdown
            title="학년"
            options={gradeOptions}
            selectedOptions={selectedGrade}
            setSelectedOptions={setSelectedGrade}
          />
        </div>
        <div className="bg-filterbg flex items-center w-[75rem] h-[4.375rem] px-4 gap-4 my-6">
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
