'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useAllTeams } from '@/hooks/project/useAllTeams'
import type { TeamFilter } from '@/types/project/project'
import {
  TAB_OPTIONS,
  RECRUITMENT_OPTIONS,
  PROGRESS_OPTIONS,
  POSITION_OPTIONS,
} from '@/constants/project/option'

import { useTapBarStore } from '@/store/tapBarStore'
import TapBar from '@/components/common/TapBar'
import SearchBar from '@/components/common/SearchBar'
import Dropdown from '@/components/common/Dropdown'
import FilterBtn from '@/components/session/FilterBtn'
import EmptyLottie from '@/components/common/EmptyLottie'
import ProjectCard from '@/components/project/ProjectCard'
import StudyCard from '@/components/project/StudyCard'
import SkeletonProjectCard from '@/components/project/SkeletonProjectCard'
import AddBtn from '@/components/project/add/AddBtn'

export default function TeamsPage() {
  // --- 1) 로컬 상태 ---
  const { activeOption } = useTapBarStore() // '전체보기' | '프로젝트' | '스터디'
  const [selectedRecruitment, setSelectedRecruitment] = useState<string[]>([])
  const [selectedProgress, setSelectedProgress] = useState<string[]>([])
  const [selectedPosition, setSelectedPosition] = useState<string[]>([])
  const [searchResults, setSearchResults] = useState<any>(null)

  // --- 2) TeamFilter 조립 ---
  const filters: TeamFilter = {}

  if (activeOption !== '전체보기') {
    filters.teamTypes = [activeOption === '프로젝트' ? 'project' : 'study']
  }
  if (selectedRecruitment.length === 1) {
    filters.isRecruited = selectedRecruitment[0] === '모집 중'
  }
  if (selectedProgress.length === 1) {
    filters.isFinished = selectedProgress[0] === '진행 완료'
  }
  if (
    (activeOption === '프로젝트' || activeOption === '전체보기') &&
    selectedPosition.length > 0
  ) {
    filters.positions = selectedPosition as any
  }

  // --- 3) 데이터 조회 ---
  const { data, isLoading } = useAllTeams(filters)
  const teams = data?.allTeams || []

  // --- 4) 필터 제거 ---
  const removeFilter = (
    item: string,
    type: 'recruitment' | 'progress' | 'position',
  ) => {
    if (type === 'recruitment') {
      setSelectedRecruitment((rs) => rs.filter((r) => r !== item))
    } else if (type === 'progress') {
      setSelectedProgress((ps) => ps.filter((p) => p !== item))
    } else {
      setSelectedPosition((ps) => ps.filter((p) => p !== item))
    }
  }

  const anyFilterSelected =
    selectedRecruitment.length +
      selectedProgress.length +
      selectedPosition.length >
    0

  // --- 5) 렌더링 ---
  return (
    <div className="max-w-[1200px] mx-auto mt-[3.56rem]">
      {/* 헤더 */}
      <div className="flex justify-between mb-[2.84rem]">
        <div>
          <h1 className="text-[2rem] font-bold">프로젝트</h1>
          <p className="text-[1.25rem]">
            모든 테커인들의 프로젝트와 스터디를 확인해보세요.
          </p>
        </div>
        <Link
          href="/mypage"
          className="flex items-center gap-2 w-[13rem] h-[3rem] rounded-xl shadow-md text-[1.1rem] font-medium justify-center hover:shadow-custom"
        >
          <span>내 프로젝트 확인하기</span>
          <Image
            src="/star.svg"
            alt="star"
            width={20}
            height={20}
            unoptimized
          />
        </Link>
      </div>

      {/* 탭 & 검색 */}
      <div className="flex justify-between">
        <TapBar options={TAB_OPTIONS} />
        <SearchBar
          placeholder="이름 또는 키워드로 검색"
          index=""
          onSearchResult={setSearchResults}
        />
      </div>
      <div className="border-t my-5" />

      {/* 필터 드롭다운 */}
      <div className="flex gap-3 mb-[2.31rem]">
        <Dropdown
          title="모집여부"
          options={RECRUITMENT_OPTIONS}
          selectedOptions={selectedRecruitment}
          setSelectedOptions={setSelectedRecruitment}
          singleSelect
        />
        <Dropdown
          title="진행여부"
          options={PROGRESS_OPTIONS}
          selectedOptions={selectedProgress}
          setSelectedOptions={setSelectedProgress}
          singleSelect
        />
        {activeOption === '프로젝트' && (
          <Dropdown
            title="포지션"
            options={POSITION_OPTIONS}
            selectedOptions={selectedPosition}
            setSelectedOptions={setSelectedPosition}
          />
        )}
      </div>

      {/* 선택된 필터 버튼 */}
      {anyFilterSelected && (
        <div className="bg-filterbg flex items-center gap-4 px-4 py-2 mb-6">
          {selectedRecruitment.map((item) => (
            <FilterBtn
              key={item}
              title={item}
              onClick={() => removeFilter(item, 'recruitment')}
            />
          ))}
          {selectedProgress.map((item) => (
            <FilterBtn
              key={item}
              title={item}
              onClick={() => removeFilter(item, 'progress')}
            />
          ))}
          {selectedPosition.map((item) => (
            <FilterBtn
              key={item}
              title={item}
              onClick={() => removeFilter(item, 'position')}
            />
          ))}
        </div>
      )}

      {/* 팀 목록 */}
      {isLoading ? (
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonProjectCard key={i} />
          ))}
        </div>
      ) : teams.length === 0 ? (
        <div className="flex justify-center w-full">
          <EmptyLottie
            text="프로젝트/스터디 데이터가 없습니다."
            text2="다시 조회해주세요"
          />
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {teams.map((team, idx) => {
            if (team.type === 'project') {
              return <ProjectCard key={idx} team={team} />
            }
            return <StudyCard key={idx} team={team} />
          })}
        </div>
      )}

      <AddBtn />
    </div>
  )
}
