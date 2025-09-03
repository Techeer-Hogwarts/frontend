'use client'

import { useState } from 'react'
import Dropdown from '@/components/common/Dropdown'
import FilterBtn from '@/components/session/FilterBtn'
import ProfileList from './@profiletList'
import SearchBar from '@/components/common/SearchBar'
import ProfileCard from '@/components/profile/ProfileCard'
import { useUrlQueryFilters } from '@/hooks/useUrlQueryFilters'

export default function Page() {
  // 검색어 상태 추가
  const [searchResults, setSearchResults] = useState<any>(null)
  const { filters, set, remove } = useUrlQueryFilters()
  const {
    selectedPosition,
    selectedYear,
    selectedUniversity,
    selectedGrade,
    selectedSortBy,
  } = filters

  const positionOptions = [
    'FRONTEND',
    'BACKEND',
    'DEVOPS',
    'FULL_STACK',
    'DATA_ENGINEER',
  ]
  const yearOptions = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
  const gradeOptions = ['1학년', '2학년', '3학년', '4학년', '졸업']
  const universityOptions = [
    '강원대학교',
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
    '홍익대학교',
    '해당 없음',
  ]
  const sortByOptions = ['기수순', '이름순']

  //기수 탭
  // const category = ['전체', '이력서', '포트폴리오', 'ICT', 'OTHER']

  const handleRemoveFilter = (
    filter: string | number,
    type: 'position' | 'year' | 'university' | 'grade',
  ) => {
    const map = {
      position: 'selectedPosition',
      year: 'selectedYear',
      university: 'selectedUniversity',
      grade: 'selectedGrade',
    } as const
    remove(map[type], String(filter))
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
        </div>
        <div className="w-full flex justify-end mb-4">
          <SearchBar
            placeholder="이름 또는 키워드로 검색해보세요"
            index="user"
            onSearchResult={setSearchResults}
          />
        </div>
        <div className="flex w-full h-[1px] mb-5 bg-gray"></div>
        <div className="flex justify-between">
          <div className="flex justify-start gap-3">
            <Dropdown
              title="포지션"
              options={positionOptions}
              selectedOptions={selectedPosition}
              setSelectedOptions={(v) => set('selectedPosition', v)}
            />
            <Dropdown
              title="기수"
              options={yearOptions} // Dropdown 컴포넌트에서 문자열로 처리
              selectedOptions={selectedYear}
              setSelectedOptions={(v) => set('selectedYear', v)}
            />
            <Dropdown
              title="대학"
              options={universityOptions}
              selectedOptions={selectedUniversity}
              setSelectedOptions={(v) => set('selectedUniversity', v)}
            />
            <Dropdown
              title="학년"
              options={gradeOptions}
              selectedOptions={selectedGrade}
              setSelectedOptions={(v) => set('selectedGrade', v)}
            />
          </div>
          <Dropdown
            title={selectedSortBy[0] || '기수순'}
            options={sortByOptions}
            selectedOptions={selectedSortBy}
            setSelectedOptions={(v) => set('selectedSortBy', v)}
            singleSelect={true}
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
        {Array.isArray(searchResults) && searchResults.length > 0 ? (
          <div className="grid grid-cols-4 gap-4 mt-8">
            {(() => {
              console.log('Profile search results:', searchResults)
              return null
            })()}
            {searchResults.map((r: any) => (
              <ProfileCard
                key={r.id}
                id={r.id}
                name={r.userName || r.name || ''}
                mainPosition={r.position || r.mainPosition || ''}
                profileImage={r.userProfileImage || r.profileImage || ''}
                school={r.school || ''}
                grade={r.grade || ''}
                year={r.year || 0}
                stack={r.stack || r.techStacks || []}
                projectTeams={r.projectTeams || []}
              />
            ))}
          </div>
        ) : (
          <>
            {(() => {
              console.log(
                'Normal profile list data (not search):',
                'ProfileList component will render with filters:',
                {
                  position: selectedPosition,
                  year: selectedYear,
                  university: selectedUniversity,
                  grade: selectedGrade,
                  sortBy: selectedSortBy[0],
                },
              )
              return null
            })()}
            <ProfileList
              key={`${selectedPosition.join(',')}_${selectedYear.join(',')}_${selectedUniversity.join(',')}_${selectedGrade.join(',')}_${selectedSortBy[0]}`}
              position={selectedPosition}
              year={selectedYear}
              university={selectedUniversity}
              grade={selectedGrade}
              sortBy={selectedSortBy[0]}
            />
          </>
        )}
      </div>
    </div>
  )
}
