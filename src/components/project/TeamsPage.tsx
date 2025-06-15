'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useTeamsList } from '@/hooks/project/useTeamsList'
import type { TeamFilter } from '@/types/project/project'
import {
  TAB_OPTIONS,
  SORT_OPTIONS,
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
  const { activeOption } = useTapBarStore()
  const [selectedRecruitment, setSelectedRecruitment] = useState<string[]>([])
  const [selectedProgress, setSelectedProgress] = useState<string[]>([])
  const [selectedPosition, setSelectedPosition] = useState<string[]>([])
  const [selectedSort, setSelectedSort] = useState<string[]>(['최신순']) // 기본값 필수
  const [searchResults, setSearchResults] = useState<any>(null)

  // 정렬 옵션을 API 형태로 변환하는 함수
  const getSortType = (sortOption: string) => {
    switch (sortOption) {
      case '최신순':
        return 'UPDATE_AT_DESC'
      case '조회수순':
        return 'VIEW_COUNT_DESC'
      default:
        return 'UPDATE_AT_DESC'
    }
  }

  // 커스텀 정렬 핸들러 - 항상 하나는 선택되어야 함
  const handleSortChange = (newSelectedSort: string[]) => {
    // 빈 배열이면 기본값 유지
    if (newSelectedSort.length === 0) {
      return
    }

    // 현재 선택된 값과 같으면 변경 안함 (취소 방지)
    if (newSelectedSort[0] === selectedSort[0]) {
      return
    }

    // 새로운 정렬로 변경
    setSelectedSort(newSelectedSort)
  }

  // 필터 조립
  const filters: TeamFilter = {}

  // 안전한 activeOption 처리
  const safeActiveOption = activeOption || '전체보기'

  if (safeActiveOption !== '전체보기') {
    if (safeActiveOption === '프로젝트') {
      filters.teamTypes = ['PROJECT']
    } else if (safeActiveOption === '스터디') {
      filters.teamTypes = ['STUDY']
    }
  }
  if (selectedRecruitment.length === 1) {
    filters.isRecruited = selectedRecruitment[0] === '모집 중'
  }
  if (selectedProgress.length === 1) {
    filters.isFinished = selectedProgress[0] === '진행 완료'
  }
  if (
    (safeActiveOption === '프로젝트' || safeActiveOption === '전체보기') &&
    selectedPosition.length > 0
  ) {
    filters.positions = selectedPosition as any
  }

  // 정렬 옵션 추가 (항상 적용됨)
  filters.sortType = getSortType(selectedSort[0])

  // 무한스크롤 데이터 조회
  const { teams, isLoading, isLoadingMore, error, hasNext, loadMoreRef } =
    useTeamsList(filters)

  // 필터 제거 (정렬 제외)
  const removeFilter = (
    item: string,
    type: 'recruitment' | 'progress' | 'position',
  ) => {
    if (type === 'recruitment') {
      setSelectedRecruitment((rs) => rs.filter((r) => r !== item))
    } else if (type === 'progress') {
      setSelectedProgress((ps) => ps.filter((p) => p !== item))
    } else if (type === 'position') {
      setSelectedPosition((ps) => ps.filter((p) => p !== item))
    }
  }

  // 정렬은 제외하고 다른 필터들만 확인
  const anyFilterSelected =
    selectedRecruitment.length +
      selectedProgress.length +
      selectedPosition.length >
    0

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
      <div className="flex justify-between mb-[2.31rem]">
        <div className="flex gap-3">
          <Dropdown
            title="모집여부"
            options={RECRUITMENT_OPTIONS}
            selectedOptions={selectedRecruitment}
            setSelectedOptions={setSelectedRecruitment}
            singleSelect={true}
          />
          <Dropdown
            title="진행여부"
            options={PROGRESS_OPTIONS}
            selectedOptions={selectedProgress}
            setSelectedOptions={setSelectedProgress}
            singleSelect={true}
          />
          {safeActiveOption === '프로젝트' && (
            <Dropdown
              title="포지션"
              options={POSITION_OPTIONS}
              selectedOptions={selectedPosition}
              setSelectedOptions={setSelectedPosition}
            />
          )}
        </div>
        <Dropdown
          title={selectedSort[0]} // 현재 선택된 정렬 표시
          options={SORT_OPTIONS}
          selectedOptions={selectedSort}
          setSelectedOptions={handleSortChange} // 커스텀 핸들러 사용
          singleSelect={true}
        />
      </div>

      {/* 선택된 필터 버튼 (정렬 제외) */}
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
        // 첫 로딩 중일 때 스켈레톤 표시
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <SkeletonProjectCard key={i} />
          ))}
        </div>
      ) : error ? (
        <div className="flex flex-col items-center w-full">
          <EmptyLottie
            text="데이터 로딩 실패"
            text2="페이지를 새로고침해주세요"
          />
        </div>
      ) : teams.length === 0 ? (
        <div className="flex justify-center w-full">
          <EmptyLottie
            text="조건에 맞는 팀이 없습니다."
            text2="필터를 조정해보세요."
          />
        </div>
      ) : (
        // 정상 데이터 표시
        <>
          <div className="grid grid-cols-4 gap-4">
            {teams.map((team, idx) => {
              if (team.type === 'PROJECT') {
                return <ProjectCard key={`${team.id}-${idx}`} team={team} />
              }
              return <StudyCard key={`${team.id}-${idx}`} team={team} />
            })}
          </div>

          {/* 무한스크롤 트리거 & 로딩 상태 */}
          <div ref={loadMoreRef} className="py-8">
            {isLoadingMore && (
              <div className="grid grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <SkeletonProjectCard key={`loading-${i}`} />
                ))}
              </div>
            )}
          </div>
        </>
      )}

      <AddBtn />
    </div>
  )
}
