'use client'

import { useState } from 'react'
import Link from 'next/link'
import ProjectCard from '@/components/project/ProjectCard'
import StudyCard from '@/components/project/StudyCard'
import TapBar from '@/components/common/TapBar'
import Dropdown from '@/components/common/Dropdown'
import AddBtn from '@/components/project/add/AddBtn'
import { useQuery } from '@tanstack/react-query'
import FilterBtn from '@/components/session/FilterBtn'
import EmptyLottie from '@/components/common/EmptyLottie'
import SkeletonProjectCard from '@/components/project/SkeletonProjectCard'
import SearchBar from '@/components/common/SearchBar'
import { getAllTeams } from '@/api/project/common'
import Star from '../../../public/star.svg'
import { useTapBarStore } from '@/store/tapBarStore'

interface TeamBase {
  id: number
  isDeleted: boolean
  isRecruited: boolean
  isFinished: boolean
  name: string
  createdAt: string
}

interface MainImage {
  id: number
  isDeleted: boolean
  imageUrl: string
}

interface ProjectTeam extends TeamBase {
  type: 'project'
  frontendNum: number
  backendNum: number
  devopsNum: number
  fullStackNum: number
  dataEngineerNum: number
  projectExplain: string
  mainImages?: string[]
  teamStacks: { stackName: string; isMain: boolean }[]
}

interface StudyTeam extends TeamBase {
  type: 'study'
  recruitNum: number
  studyExplain: string
}

type Team = ProjectTeam | StudyTeam

interface TeamsResponse {
  allTeams: Team[]
}
const category = ['전체보기', '프로젝트', '스터디']
export default function Project() {
  // TapBar 관련 (전체보기, 프로젝트, 스터디)
  // const [selectedTab, setSelectedTab] = useState<string>('전체보기')
  const { activeOption } = useTapBarStore()
  // 드롭다운 필터 관련 상태
  const [selectedRecruitment, setSelectedRecruitment] = useState<string[]>([]) // 모집여부: ['모집 중', '모집 완료']
  const [selectedProgress, setSelectedProgress] = useState<string[]>([]) // 진행여부: ['진행 중', '진행 완료']
  const [selectedPosition, setSelectedPosition] = useState<string[]>([]) // 포지션: ['Frontend', 'Backend', 'DevOps', 'FullStack', 'DataEngineer']
  const [searchResults, setSearchResults] = useState<any>(null)

  // API 호출 시 사용할 필터 객체 구성
  const teamFilter: any = {}

  // 탭 선택에 따른 필터링
  if (activeOption !== '전체보기') {
    teamFilter.teamTypes = [activeOption === '프로젝트' ? 'project' : 'study']
  }

  // 모집여부 필터링
  if (selectedRecruitment.length === 1) {
    teamFilter.isRecruited = selectedRecruitment[0] === '모집 중' ? true : false
  }

  // 진행여부 필터링
  if (selectedProgress.length === 1) {
    teamFilter.isFinished = selectedProgress[0] === '진행 완료' ? true : false
  }

  // 포지션 필터링 (프로젝트 탭 또는 전체보기 탭일 때만 적용)
  if (
    (activeOption === '프로젝트' || activeOption === '전체보기') &&
    selectedPosition.length > 0
  ) {
    teamFilter.positions = selectedPosition.map((item) => item)
  }

  // useQuery 의존성 배열에 모든 필터 상태를 추가하여 필터 변경 시 새롭게 호출
  const { data: allTeams, isLoading } = useQuery({
    queryKey: [
      'getAllTeams',
      activeOption,
      selectedRecruitment,
      selectedProgress,
      selectedPosition,
    ],
    queryFn: () => getAllTeams(teamFilter),
  })

  // 필터 버튼에서 제거할 때 사용하는 핸들러
  const handleRemoveFilter = (item: string, type: string) => {
    switch (type) {
      case 'recruitment':
        setSelectedRecruitment(
          selectedRecruitment.filter((val) => val !== item),
        )
        break
      case 'progress':
        setSelectedProgress(selectedProgress.filter((val) => val !== item))
        break
      case 'position':
        setSelectedPosition(selectedPosition.filter((val) => val !== item))
        break
      default:
        break
    }
  }

  // 하나 이상의 필터가 선택되었는지 확인
  const anyFilterSelected =
    selectedRecruitment.length > 0 ||
    selectedProgress.length > 0 ||
    selectedPosition.length > 0

  return (
    <div className="max-w-[1200px] w-[1200px] mt-[3.56rem] items-center">
      <div className="flex justify-between mb-[2.84rem]">
        {/* 왼쪽 텍스트 영역 */}
        <div>
          <div className="text-[2rem] font-bold">프로젝트</div>
          <p className="text-[1.25rem]">
            모든 테커인들의 프로젝트와 스터디를 확인해보세요.
          </p>
        </div>
        {/* 오른쪽 버튼 영역 */}
        <div>
          <Link
            href="/mypage"
            type="button"
            className="w-[13rem] h-[3rem] text-center rounded-xl shadow-md justify-center text-[1.1rem] font-medium flex items-center hover:shadow-custom"
          >
            <span>내 프로젝트 확인하기</span>
            <Star />
          </Link>
        </div>
      </div>

      {/* 탭바: 전체보기, 프로젝트, 스터디 옵션 */}
      <div className="flex justify-between">
        <TapBar options={category} />
        <SearchBar
          placeholder="이름 또는 키워드로 검색해보세요"
          index=""
          onSearchResult={setSearchResults}
        />
      </div>
      <div className="flex w-full h-[1px] my-5 bg-gray" />

      {/* 드롭다운 필터 영역 */}
      <div className="flex justify-start gap-3 mb-[2.31rem]">
        <Dropdown
          title="모집여부"
          options={['모집 중', '모집 완료']}
          selectedOptions={selectedRecruitment}
          setSelectedOptions={setSelectedRecruitment}
          singleSelect={true}
        />
        <Dropdown
          title="진행여부"
          options={['진행 중', '진행 완료']}
          selectedOptions={selectedProgress}
          setSelectedOptions={setSelectedProgress}
          singleSelect={true}
        />
        {/* 프로젝트 관련 탭이 선택되었을 때만 포지션 드롭다운 노출 */}
        {activeOption === '프로젝트' && (
          <Dropdown
            title="포지션"
            options={[
              'frontend',
              'backend',
              'devops',
              'fullstack',
              'dataEngineer',
            ]}
            selectedOptions={selectedPosition}
            setSelectedOptions={setSelectedPosition}
          />
        )}
      </div>

      {/* 하나 이상의 필터가 선택된 경우 필터 버튼 패널 노출 */}
      {anyFilterSelected && (
        <div className="bg-filterbg flex items-center w-[75rem] h-[4.375rem] px-4 gap-4 my-6">
          {selectedRecruitment.map((item) => (
            <FilterBtn
              key={item}
              title={item}
              onClick={() => handleRemoveFilter(item, 'recruitment')}
            />
          ))}
          {selectedProgress.map((item) => (
            <FilterBtn
              key={item}
              title={item}
              onClick={() => handleRemoveFilter(item, 'progress')}
            />
          ))}
          {selectedPosition.map((item) => (
            <FilterBtn
              key={item}
              title={item}
              onClick={() => handleRemoveFilter(item, 'position')}
            />
          ))}
        </div>
      )}

      {/* 팀 목록 렌더링 */}
      {isLoading ? (
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <SkeletonProjectCard key={index} />
          ))}
        </div>
      ) : allTeams?.allTeams?.length === 0 ? (
        <div className="flex justify-center w-full">
          <EmptyLottie
            text="프로젝트/스터디 데이터가 없습니다."
            text2="다시 조회해주세요"
          />
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {allTeams?.allTeams.map((team, index) =>
            team.type === 'project' ? (
              <ProjectCard key={index} team={team} />
            ) : (
              <StudyCard key={index} team={team} />
            ),
          )}
        </div>
      )}

      <AddBtn />
    </div>
  )
}
