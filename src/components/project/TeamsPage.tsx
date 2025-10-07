'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTeamsList } from '@/hooks/project/useTeamsList'
import type {
  TeamFilter,
  ProjectTeam,
  StudyTeam,
} from '@/types/project/project'
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
import EmptyAnimation from '@/components/common/EmptyAnimation'
import ProjectCard from '@/components/project/ProjectCard'
import StudyCard from '@/components/project/StudyCard'
import SkeletonProjectCard from '@/components/project/SkeletonProjectCard'
import AddBtn from '@/components/project/add/AddBtn'
import { useUrlQueryFilters } from '@/hooks/useUrlQueryFilters'

export default function TeamsPage() {
  const { activeOption } = useTapBarStore()
  const { filters, set, remove } = useUrlQueryFilters()
  const selectedRecruitment = filters.selectedRecruitment ?? []
  const selectedProgress = filters.selectedProgress ?? []
  const selectedPosition = filters.selectedPosition ?? []
  const [selectedSort, setSelectedSort] = useState<string[]>(['최신순']) // 기본값 필수
  const [searchResults, setSearchResults] = useState<any>(null)

  // URL 쿼리와 동기화된 탭 옵션 (옵션 집합과 불일치 시 기본값으로 강제)
  const normalizedCategory = TAB_OPTIONS.includes(
    filters.selectedCategory as (typeof TAB_OPTIONS)[number],
  )
    ? filters.selectedCategory
    : undefined
  const normalizedActiveOption = TAB_OPTIONS.includes(
    activeOption as (typeof TAB_OPTIONS)[number],
  )
    ? activeOption
    : undefined
  const currentTabOption =
    normalizedCategory || normalizedActiveOption || TAB_OPTIONS[0]

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

  // 팀 조회용 쿼리 조립 (hook의 filters와 이름 충돌 방지)
  const query: TeamFilter = {}

  // 안전한 activeOption 처리 (URL 쿼리 우선)
  const safeActiveOption = currentTabOption

  if (safeActiveOption !== '전체보기') {
    if (safeActiveOption === '프로젝트') {
      query.teamTypes = ['PROJECT']
    } else if (safeActiveOption === '스터디') {
      query.teamTypes = ['STUDY']
    }
  }
  if (selectedRecruitment.length === 1) {
    query.isRecruited = selectedRecruitment[0] === '모집 중'
  }
  if (selectedProgress.length === 1) {
    query.isFinished = selectedProgress[0] === '진행 완료'
  }
  if (
    (safeActiveOption === '프로젝트' || safeActiveOption === '전체보기') &&
    selectedPosition.length > 0
  ) {
    query.positions = selectedPosition
  }

  // 정렬 옵션 추가 (항상 적용됨)
  query.sortType = getSortType(selectedSort[0])

  // 무한스크롤 데이터 조회
  const { teams, isLoading, isLoadingMore, error, hasNext, loadMoreRef } =
    useTeamsList(query)

  // 필터 제거 (정렬 제외)
  const removeFilter = (
    item: string,
    type: 'recruitment' | 'progress' | 'position',
  ) => {
    if (type === 'recruitment') {
      remove('selectedRecruitment', item)
    } else if (type === 'progress') {
      remove('selectedProgress', item)
    } else if (type === 'position') {
      remove('selectedPosition', item)
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
          <img src="/star.svg" alt="star" width={20} height={20} />
        </Link>
      </div>

      {/* 탭 & 검색 */}
      <div className="flex justify-between">
        <TapBar
          options={TAB_OPTIONS}
          onOptionChange={(option) => set('selectedCategory', option)}
          initialOption={currentTabOption}
        />
        <SearchBar
          placeholder="이름 또는 키워드로 검색"
          index={
            safeActiveOption === '프로젝트'
              ? 'project'
              : safeActiveOption === '스터디'
                ? 'study'
                : ''
          }
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
            setSelectedOptions={(v) => set('selectedRecruitment', v)}
            singleSelect={true}
          />
          <Dropdown
            title="진행여부"
            options={PROGRESS_OPTIONS}
            selectedOptions={selectedProgress}
            setSelectedOptions={(v) => set('selectedProgress', v)}
            singleSelect={true}
          />
          {safeActiveOption === '프로젝트' && (
            <Dropdown
              title="포지션"
              options={POSITION_OPTIONS}
              selectedOptions={selectedPosition}
              setSelectedOptions={(v) => set('selectedPosition', v)}
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
      {Array.isArray(searchResults) && searchResults.length > 0 ? (
        // 검색 결과가 있을 때
        <div className="grid grid-cols-4 gap-4">
          {searchResults.map((result: any) => {
            if (result.index === 'project') {
              // ProjectTeam 타입으로 변환
              const projectTeam: ProjectTeam = {
                id: parseInt(String(result.id), 10),
                name: result.name || result.title,
                projectExplain: result.projectExplain || '',
                mainImages:
                  Array.isArray(result.mainImages) &&
                  result.mainImages.length > 0
                    ? result.mainImages
                    : ['/images/session/thumbnail.png'],
                teamStacks: result.teamStacks || [],
                type: 'PROJECT',
                // TeamBase 필드들
                deleted: false,
                recruited: true,
                finished: false,
                createdAt: new Date().toISOString(),
                // ProjectTeam 전용 필드들
                frontendNum: 0,
                backendNum: 0,
                devopsNum: 0,
                fullStackNum: 0,
                dataEngineerNum: 0,
                // 누락된 필드 추가
                resultImages: [],
              }
              return <ProjectCard key={result.id} team={projectTeam} />
            } else {
              // StudyTeam 타입으로 변환
              const studyTeam: StudyTeam = {
                id: parseInt(String(result.id), 10),
                name: result.name || result.title,
                studyExplain: result.projectExplain || '',
                type: 'STUDY',
                // TeamBase 필드들
                deleted: false,
                recruited: true,
                finished: false,
                createdAt: new Date().toISOString(),
                // StudyTeam 전용 필드들
                recruitNum: 0,
              }
              return <StudyCard key={result.id} team={studyTeam} />
            }
          })}
        </div>
      ) : isLoading ? (
        // 첫 로딩 중일 때 스켈레톤 표시
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <SkeletonProjectCard key={i} />
          ))}
        </div>
      ) : error ? (
        <div className="flex flex-col items-center w-full">
          <EmptyAnimation
            text="데이터 로딩 실패"
            text2="페이지를 새로고침해주세요"
          />
        </div>
      ) : teams.length === 0 ? (
        <div className="flex justify-center w-full">
          <EmptyAnimation
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
