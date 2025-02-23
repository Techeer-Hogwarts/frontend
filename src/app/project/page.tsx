'use client'

import { useEffect, useState } from 'react'
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

import { getAllTeams } from '@/api/project/common'
import { getMyInfo } from '@/api/project/common'

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

export default function Project() {
  const [projectId, setProjectId] = useState<number | null>(null)
  // TapBar 관련 (모집 중이면 isRecruited=true)
  const [selectedTab, setSelectedTab] = useState<string>('전체보기')
  const [inputValue, setInputValue] = useState('')

  // 드롭다운 필터 관련 상태 (초기엔 빈 배열로 설정)
  const [selectedProgress, setSelectedProgress] = useState<string[]>([]) // 진행여부: ['진행 중', '완료']
  const [selectedTeamType, setSelectedTeamType] = useState<string[]>([]) // 구분: ['프로젝트', '스터디']
  const [selectedPosition, setSelectedPosition] = useState<string[]>([]) // 포지션: ['Frontend', 'Backend', 'DevOps', 'FullStack', 'DataEngineer']

  // 탭 선택 핸들러: TapBar에서 선택 시 호출 (모집 중이면 selectedTab이 '모집 중'이 됨)
  const handleTabSelect = (option: string) => {
    setSelectedTab(option)
  }

  // 검색 핸들러 (추후 검색 로직과 탭 필터를 분리할 수 있음)
  const handleSearch = (query: string) => {
    sessionStorage.setItem('searchQuery', query)
    setInputValue(query)
  }

  useEffect(() => {
    const id = Number(localStorage.getItem('projectId'))
    setProjectId(id)
  }, [])

  // API 호출 시 사용할 필터 객체를 구성합니다.
  // 탭 선택에 따라 isRecruited 적용
  const teamFilter: any = {}
  if (selectedTab === '모집 중') {
    teamFilter.isRecruited = true
  }
  // 진행여부 드롭다운: '진행 중'이면 isFinished=false, '완료'이면 isFinished=true
  // (한 가지만 선택된 경우에만 필터를 적용합니다.)
  if (selectedProgress.length === 1) {
    teamFilter.isFinished = selectedProgress[0] === '완료' ? true : false
  }
  // 구분 드롭다운: 프로젝트/스터디 선택 (API에서는 소문자 영문 값 사용)
  if (selectedTeamType.length > 0) {
    teamFilter.teamTypes = selectedTeamType.map((item) =>
      item === '프로젝트' ? 'project' : 'study',
    )
  }
  // 포지션 드롭다운: 구분에서 프로젝트가 선택되어 있을 때만 적용
  if (selectedTeamType.includes('프로젝트') && selectedPosition.length > 0) {
    // API에 전달할 때는 소문자로 변환 (예: frontend)
    teamFilter.positions = selectedPosition.map((item) => item.toLowerCase())
  }

  // useQuery 의 의존성 배열에 모든 필터 상태를 추가하여 필터 변경 시 새롭게 호출
  const { data: allTeams, isLoading } = useQuery({
    queryKey: [
      'getAllTeams',
      selectedTab,
      selectedProgress,
      selectedTeamType,
      selectedPosition,
    ],
    queryFn: () => getAllTeams(teamFilter),
  })

  // 필터 버튼에서 제거할 때 사용하는 핸들러
  const handleRemoveFilter = (item: string, type: string) => {
    switch (type) {
      case 'progress':
        setSelectedProgress(selectedProgress.filter((val) => val !== item))
        break
      case 'teamType':
        setSelectedTeamType(selectedTeamType.filter((val) => val !== item))
        // 구분에서 프로젝트가 제거되면 포지션 필터도 초기화
        if (item === '프로젝트') {
          setSelectedPosition([])
        }
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
    selectedProgress.length > 0 ||
    selectedTeamType.length > 0 ||
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
            href="/"
            type="button"
            className="w-[13.1875rem] h-[3.3125rem] text-center rounded-lg shadow-md justify-center text-[1.125rem] flex items-center hover:shadow-custom"
          >
            내 프로젝트 확인하기 <span className="ml-2">✨</span>
          </Link>
        </div>
      </div>

      {/* 탭바: onSelect 핸들러로 탭 변경을 처리 */}
      <TapBar options={['전체보기', '모집 중']} onSelect={handleTabSelect} />
      <div className="flex w-full h-[1px] my-5 bg-gray" />

      {/* 드롭다운 필터 영역 */}
      <div className="flex justify-start gap-3 mb-[2.31rem]">
        <Dropdown
          title="진행여부"
          options={['진행 중', '완료']}
          selectedOptions={selectedProgress}
          setSelectedOptions={setSelectedProgress}
        />
        <Dropdown
          title="구분"
          options={['프로젝트', '스터디']}
          selectedOptions={selectedTeamType}
          setSelectedOptions={setSelectedTeamType}
        />
        {/* 구분에서 프로젝트가 선택되어 있을 때에만 포지션 드롭다운 노출 */}
        {selectedTeamType.includes('프로젝트') && (
          <Dropdown
            title="포지션"
            options={[
              'Frontend',
              'Backend',
              'DevOps',
              'FullStack',
              'DataEngineer',
            ]}
            selectedOptions={selectedPosition}
            setSelectedOptions={setSelectedPosition}
          />
        )}
      </div>

      {/* 하나 이상의 필터가 선택된 경우 필터 버튼 패널 노출 */}
      {anyFilterSelected && (
        <div className="bg-filterbg flex items-center w-[75rem] h-[4.375rem] px-4 gap-4 my-6">
          {selectedProgress.map((item) => (
            <FilterBtn
              key={item}
              title={item}
              onClick={() => handleRemoveFilter(item, 'progress')}
            />
          ))}
          {selectedTeamType.map((item) => (
            <FilterBtn
              key={item}
              title={item}
              onClick={() => handleRemoveFilter(item, 'teamType')}
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
          {allTeams?.allTeams?.map((team) =>
            team.type === 'project' ? (
              <ProjectCard key={'project' + team.id} team={team} />
            ) : (
              <StudyCard key={team.id} team={team} />
            ),
          )}
        </div>
      )}

      <AddBtn />
    </div>
  )
}
