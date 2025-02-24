'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Star from '../../../public/star.svg'
import Dropdown from '@/components/common/Dropdown'
import TapBar from '@/components/common/TapBar'
import BestResume from '@/components/resume/BestResume'
import FilterBtn from '@/components/session/FilterBtn'
import ResumeList from './@resumeList'
import SearchBar from '@/components/common/SearchBar'
import AuthModal from '@/components/common/AuthModal'

export default function Resume() {
  const router = useRouter() // Resume 페이지에서 useRouter 사용

  // ✅ 로그인 모달 상태 추가
  const [authModalOpen, setAuthModalOpen] = useState(false)

  // 검색어 상태 추가
  const [searchResults, setSearchResults] = useState<any>(null)

  // 드롭다운 선택된 옵션 상태 관리
  const [selectedPosition, setSelectedPosition] = useState<string[]>([])
  const [selectedYear, setSelectedYear] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState('전체')

  // 드롭다운 항목 리스트
  const positionOptions = [
    'FRONTEND',
    'BACKEND',
    'DEVOPS',
    'FULL_STACK',
    'DATA_ENGINEER',
  ]
  const yearOptions = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
  const category = ['전체', '이력서', '포트폴리오', 'ICT', 'OTHER']

  //필터 제거
  const handleRemoveFilter = (filter: string | number, type: string) => {
    if (type === 'position') {
      setSelectedPosition(selectedPosition.filter((item) => item !== filter))
    } else if (type === 'year') {
      setSelectedYear(selectedYear.filter((item) => item !== filter))
    }
  }

  // 카테고리 변경
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
  }

  // // 검색어 저장 및 이력서 목록 업데이트
  // const handleSearch = (query: string) => {
  //   setSearchResults(query)
  //   sessionStorage.setItem('searchQuery', query)
  // }

  // 마이페이지로 이동
  const openMyPage = () => {
    router.push(`/mypage`)
  }

  return (
    <div className="flex flex-col max-w-[75rem] w-[75rem] mt-[3.56rem]">
      {/* ✅ AuthModal 추가 */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />

      {/** 배너 */}
      <div className="flex justify-between gap-10 mb-[2.84rem]">
        <div className="flex flex-col">
          <span className="text-[2rem] font-bold">이력서 & 포트폴리오</span>
          <span className="text-[1.25rem]">
            모든 테커인들의 이력서와 포트폴리오를 확인해보세요.
          </span>
        </div>
        <div
          className="flex justify-center items-center w-[13rem] h-[3rem] border-2 border-transparent shadow-md rounded-xl hover:shadow-custom"
          onClick={openMyPage}
        >
          <span className="text-[1.1rem] font-medium cursor-pointer">
            내 이력서 수정하기
          </span>
          <Star />
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex justify-between">
          {/** 기수 탭 */}
          <TapBar options={category} onSelect={handleCategoryChange} />
          {/** 검색창 */}
          <SearchBar
            placeholder="이름 또는 키워드로 검색해보세요"
            index="resume"
            onSearchResult={setSearchResults}
          />
        </div>
        <div className="flex w-full h-[1px] my-5 bg-gray"></div>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-3">
          {/** 드롭다운 */}
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
        </div>
        {/** ✅ BestResume에서 setAuthModalOpen을 전달하도록 수정 */}
        <BestResume offset={0} limit={10} setAuthModalOpen={setAuthModalOpen} />
      </div>
      {[selectedPosition, selectedYear].some((arr) => arr.length > 0) && (
        <div className="bg-filterbg flex items-center w-[75rem] h-[4.375rem] px-4 gap-4 my-3">
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
        </div>
      )}
      {/** 이력서 폴더 */}
      <div className="mt-[2.84rem]">
        <ResumeList
          position={selectedPosition}
          year={selectedYear}
          category={selectedCategory}
        />
      </div>
    </div>
  )
}
