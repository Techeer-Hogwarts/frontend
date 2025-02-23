'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import ProjectCard from '@/components/project/ProjectCard'
import StudyCard from '@/components/project/StudyCard'
import TapBar from '@/components/common/TapBar'
import Dropdown from '@/components/common/Dropdown'
import AddBtn from '../../components/project/add/AddBtn'
import { useQueries } from '@tanstack/react-query'
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
  const [selectedPeriods, setSelectedPeriods] = useState<string[]>(['0'])
  const [isLoading, setIsLoading] = useState(true)
  const [teams, setTeams] = useState<Team[]>([])

  const [{ data: allTeams }] = useQueries({
    queries: [
      // {
      //   queryKey: ['getMyInfo'],
      //   queryFn: getMyInfo,
      // },
      {
        queryKey: ['getAllTeams', projectId],
        queryFn: async () => {
          setIsLoading(true)
          const data = await getAllTeams()

          // 🔹 API 응답에서 mainImages가 string[]으로 되어 있는 경우 변환
          const formattedTeams: Team[] = data.allTeams.map((team: any) => {
            if (team.type === 'project') {
              return {
                ...team,
                mainImages: team.mainImages?.map((img: any) =>
                  typeof img === 'string' ? img : img.imageUrl // ⚡ mainImages를 string[]로 변환
                ),
              } as ProjectTeam;
            }
            return team as StudyTeam;
          });

          setTimeout(() => {
            setIsLoading(false)
          }, 500) // 0.5초 딜레이 적용 (스켈레톤 유지)
          return { allTeams: formattedTeams }
        },
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

  useEffect(() => {
    if (allTeams && allTeams.allTeams) {
      setTeams((prev) => {
        const existingIds = new Set(prev.map((team) => team.id))
        const newTeams = allTeams.allTeams.filter((team) => !existingIds.has(team.id))
        return [...prev, ...newTeams] // 기존 데이터 유지하면서 새로운 데이터 추가
      })
    }
  }, [allTeams])


  return (
    <div className="w-[1200px] mt-[3.56rem] h-auto min-h-screen">
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
            내 프로젝트 확인하기
            <span className="ml-2">✨</span>
          </Link>
        </div>
      </div>
      {/* 탭바 */}
      <TapBar
        options={['전체보기', '모집 중']}
        onSelect={handleSearch}
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
      {/* 로딩 중 & 데이터가 없을 때 스켈레톤 유지 */}
      {isLoading && teams.length === 0 ? (
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <SkeletonProjectCard key={index} />
          ))}
        </div>
      ) : teams.length === 0 ? (
        <div className="flex justify-center w-full">
          <EmptyLottie text="프로젝트/스터디 데이터가 없습니다." text2="다시 조회해주세요" />
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {teams.map((team) =>
            team.type === 'project' ? (
              <ProjectCard key={'project' + team.id} team={team as ProjectTeam} />
            ) : (
              <StudyCard key={team.id} team={team as StudyTeam} />
            )
          )}
        </div>
      )}

      <AddBtn />
    </div>
  )
}
