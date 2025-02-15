'use client'

import { useRouter } from 'next/navigation'
import ResumeFolder from '@/components/resume/ResumeFolder'
import Star from '../../../public/star.svg'
import Dropdown from '@/components/common/Dropdown'
import { useState } from 'react'
import TapBar from '@/components/common/TapBar'
import BestResume from '@/components/resume/BestResume'

export default function Resume() {
  const router = useRouter() // Resume 페이지에서 useRouter 사용
  const [inputValue, setInputValue] = useState('')

  const handleSearch = (query: string) => {
    sessionStorage.setItem('searchQuery', query)
    setInputValue(query)
  }
  const handleFolderClick = () => {
    router.push('/detail') // Resume 페이지에서 라우팅 처리
  }

  const openModal = () => {
    router.push('/resume?modal=true') // 모달 경로로 라우팅
  }
  // 드롭다운 선택된 옵션 상태 관리

  const [selectedPosition, setSelectedPosition] = useState<string | undefined>(
    undefined,
  )
  const [selectedYear, setSelectedYear] = useState<number | undefined>(
    undefined,
  )

  // 드롭다운 항목 리스트
  const positionOptions = ['Frontend', 'Backend', 'DataEngineer', 'FullStack']
  const yearOptions = ['8기', '7기', '6기', '5기', '4기', '3기', '2기', '1기']

  //기수 탭
  const options = ['전체', '이력서', '포트폴리오', 'OTHER']

  return (
    <div className="flex flex-col max-w-[1200px] w-[1200px] mt-[3.56rem] gap-6">
      {/** 배너 */}
      <div className="flex justify-between gap-10 mb-[2.84rem]">
        <div className="flex flex-col">
          <span className="text-[2.5rem] font-bold">이력서 & 포트폴리오</span>
          <span className="text-[1.25rem]">
            모든 테커인들의 이력서와 포트폴리오를 확인해보세요.
          </span>
        </div>
        <div
          className="flex justify-center items-center w-[13rem] h-[3rem] border-2 border-transparent shadow-md rounded-xl"
          onClick={openModal}
        >
          <span className="text-[1.1rem] font-medium">
            나의 이력서 수정하기
          </span>
          <Star />
        </div>
      </div>
      {/** 기수 탭 */}
      <TapBar
        options={options}
        placeholder="프로젝트 명 혹은 이름으로 검색해보세요"
        onSearch={handleSearch}
      />
      <div className="flex justify-between">
        <div className="flex gap-3">
          {/** 드롭다운 */}
          <Dropdown
            title="포지션"
            options={positionOptions}
            selectedOptions={selectedPosition ? [selectedPosition] : []}
            setSelectedOptions={(selected) =>
              setSelectedPosition(selected[0] || undefined)
            }
          />
          <Dropdown
            title="기수"
            options={yearOptions.map(String)}
            selectedOptions={selectedYear ? [String(selectedYear)] : []}
            setSelectedOptions={(selected) =>
              setSelectedYear(
                selected.length > 0 ? parseInt(selected[0]) : undefined,
              )
            }
          />
        </div>
        {/** 인기 이력서 조회 */}
        <BestResume offset={0} limit={10} />
      </div>
      {/** 이력서 폴더 */}
      <div>
        <ResumeFolder
          position={selectedPosition}
          year={selectedYear}
          offset={0}
          limit={10}
        />
      </div>
    </div>
  )
}
