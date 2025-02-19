'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import ProjectCard from '@/components/project/ProjectCard'
import StudyCard from '@/components/project/StudyCard'
import TapBar from '@/components/common/TapBar'
import Dropdown from '@/components/common/Dropdown'
import AddBtn from '../../components/project/add/AddBtn'
import { useQueries } from '@tanstack/react-query'

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

interface ProjectTeam extends TeamBase {
  type: 'project'
  frontendNum: number
  backendNum: number
  devopsNum: number
  uiuxNum: number
  dataEngineerNum: number
  projectExplain: string
  mainImages: string[]
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
  const [selectedPeriods, setSelectedPeriods] = useState<string[]>(['0'])

  const [{ data: allTeams }] = useQueries({
    queries: [
      // {
      //   queryKey: ['getMyInfo'],
      //   queryFn: getMyInfo,
      // },
      {
        queryKey: ['getAllTeams', projectId],
        queryFn: getAllTeams,
      },
    ],
  })

  useEffect(() => {
    const id = Number(localStorage.getItem('projectId'))
    setProjectId(id)
  }, [])

  const [inputValue, setInputValue] = useState('')

  const handleSearch = (query: string) => {
    sessionStorage.setItem('searchQuery', query)
    setInputValue(query)
  }
  return (
    <div className="max-w-[1200px] w-[1200px] mt-[3.56rem] items-center">
      <div className="flex justify-between mb-[2.84rem]">
        {/* 왼쪽 텍스트 영역 */}
        <div>
          <div className="text-[2.5rem] font-bold">프로젝트</div>
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
            내 프로젝트 확인하기
            <span className="ml-2">✨</span>
          </Link>
        </div>
      </div>

      {/* 탭바 */}
      <TapBar
        options={['전체보기', '모집 중']}
        placeholder="프로젝트 명 혹은 이름으로 검색해보세요"
        onSearch={handleSearch}
      />
      <div className="flex justify-start mt-5 gap-3 mb-[2.31rem]">
        <Dropdown
          title="구분"
          options={['프로젝트', '스터디']}
          selectedOptions={selectedPeriods}
          setSelectedOptions={setSelectedPeriods}
        />
        <Dropdown
          title="포지션"
          options={['Frontend', 'Backend', 'DevOps', 'Others']}
          selectedOptions={selectedPeriods}
          setSelectedOptions={setSelectedPeriods}
        />
        <Dropdown
          title="진행여부"
          options={['진행 중', '완료']}
          selectedOptions={selectedPeriods}
          setSelectedOptions={setSelectedPeriods}
        />
      </div>
      <div className="flex gap-[1rem] flex-wrap">
        {allTeams?.allTeams?.map((team) =>
          team.type === 'project' ? (
            <ProjectCard key={'project' + team.id} team={team} />
          ) : (
            <StudyCard key={team.id} team={team} />
          ),
        )}
      </div>

      <AddBtn />
    </div>
  )
}
