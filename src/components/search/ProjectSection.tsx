import ProjectCard from './ProjectCard'
import Section from './Section'
import CardItem from './CardItem'
import { useEffect, useState } from 'react'
import { useQueries } from '@tanstack/react-query'
import { getAllTeams } from '@/api/project/common'
import StudyCard from './StudyCard'

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
  mainImages?: MainImage[]
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

const ProjectSection: React.FC<{
  project: ProjectTeam[]
  study: StudyTeam[]
}> = ({ project, study }) => {
  const [projectId, setProjectId] = useState<number | null>(null)
  const [showAll, setShowAll] = useState(false)

  // 처음에는 8개만 보여주고, 더보기 클릭 시 전체 데이터 보여주기
  const visibleProjects = showAll
    ? [...project, ...study] // 프로젝트와 스터디를 모두 합친 후 전체 표시
    : [...project, ...study]?.slice(0, 8) // 8개만 보이도록 제한

  return (
    <Section id="project" title="프로젝트">
      {visibleProjects?.length > 0 ? (
        <div className="grid grid-cols-4 gap-5">
          {visibleProjects?.map((team) =>
            team.type === 'project' ? (
              <ProjectCard key={'project' + team.id} team={team} />
            ) : (
              <StudyCard key={team.id} team={team} />
            ),
          )}
        </div>
      ) : (
        <p className="text-center text-darkgray">검색 결과가 없습니다</p>
      )}
      {/* 더보기 버튼 표시 */}
      {!showAll && project.length > 8 && (
        <div className="flex flex-col items-center mt-10">
          <button
            onClick={() => setShowAll(true)}
            className="px-6 py-2 text-primary text-sm border border-primary rounded-full hover:bg-primary hover:text-white transition-colors"
          >
            더보기 +
          </button>
        </div>
      )}
      <div className="w-[77rem] h-[1px] mt-10 bg-lightgray"></div>
    </Section>
  )
}

export default ProjectSection
