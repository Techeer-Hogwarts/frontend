'use client'

import { useState, useEffect } from 'react'
import TabLayout from '@/components/home/TabLayout'
import ProjectCard from '@/components/project/ProjectCard'
import StudyCard from '@/components/project/StudyCard'
import { getAllTeams } from '@/api/home'
import { ProjectStudyTeam } from '@/api/home'

const convertToProjectTeam = (team: ProjectStudyTeam) => {
  return {
    id: team.id,
    isDeleted: team.deleted,
    isRecruited: team.isRecruited,
    isFinished: team.finished,
    name: team.name, // 실제 백엔드 데이터의 name 속성 사용
    createdAt: team.createdAt,
    type: 'PROJECT' as const,
    frontendNum: team.frontendNum,
    backendNum: team.backendNum,
    devopsNum: team.devopsNum,
    fullStackNum: team.fullStackNum,
    dataEngineerNum: team.dataEngineerNum,
    projectExplain: team.projectExplain || '',
    mainImages: team.mainImages,
    teamStacks: team.teamStacks.map((stack) => ({
      stack: stack.stack,
      isMain: stack.isMain,
    })),
    // ProjectTeam 타입에 필요한 추가 속성들
    resultImages: team.mainImages,
    deleted: team.deleted,
    recruited: team.isRecruited,
    finished: team.finished,
  }
}

const convertToStudyTeam = (team: ProjectStudyTeam) => {
  return {
    id: team.id,
    name: team.name, // 실제 백엔드 데이터의 name 속성 사용
    isRecruited: team.isRecruited,
    finished: team.finished,
    type: 'STUDY' as const,
    recruitNum: team.recruitNum || 0,
    studyExplain: team.studyExplain || '', // studyExplain 속성 사용
    deleted: team.deleted,
    recruited: team.isRecruited,
    resultImages: team.mainImages, // mainImages를 resultImages로 사용
    createdAt: team.createdAt, // createdAt 속성 추가
  }
}

export default function ProjectStudySection() {
  const [selectedTab, setSelectedTab] = useState<'project' | 'study'>('project')
  const [projects, setProjects] = useState<ProjectStudyTeam[]>([])
  const [studies, setStudies] = useState<ProjectStudyTeam[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setLoading(true)
        setError(null)

        const projectResponse = await getAllTeams({
          teamTypes: ['PROJECT'],
          limit: 4,
          sortType: 'UPDATE_AT_DESC',
        })

        const studyResponse = await getAllTeams({
          teamTypes: ['STUDY'],
          limit: 4,
          sortType: 'UPDATE_AT_DESC',
        })

        if (projectResponse.teams && Array.isArray(projectResponse.teams)) {
          setProjects(projectResponse.teams)
        } else {
          setProjects([])
        }

        if (studyResponse.teams && Array.isArray(studyResponse.teams)) {
          setStudies(studyResponse.teams)
        } else {
          setProjects([])
        }
      } catch (error) {
        setError('팀 데이터를 가져오는데 실패했습니다.')

        setProjects([])
        setStudies([])
      } finally {
        setLoading(false)
      }
    }

    fetchTeams()
  }, [])

  return (
    <section className="w-full mt-8">
      <TabLayout
        iconSrc="/images/home/Light.svg"
        iconWidth={38}
        iconHeight={30}
        tabs={[
          { label: '프로젝트', value: 'project' },
          { label: '스터디', value: 'study' },
        ]}
        selectedTab={selectedTab}
        onSelect={(tab: 'project' | 'study') => setSelectedTab(tab)}
      >
        <div className="grid grid-cols-4 gap-6 min-h-[250px]">
          {loading ? (
            <div className="col-span-4 flex items-center justify-center">
              <div className="text-lg text-gray-500">로딩 중...</div>
            </div>
          ) : error ? (
            <div className="col-span-4 flex items-center justify-center">
              <div className="text-lg text-red-500">{error}</div>
            </div>
          ) : (
            <>
              {selectedTab === 'project' && (
                <>
                  {projects.length > 0 ? (
                    projects.map((team) => (
                      <ProjectCard
                        key={team.id}
                        team={convertToProjectTeam(team)}
                        hideLabel={true}
                      />
                    ))
                  ) : (
                    <div className="col-span-4 flex items-center justify-center">
                      <div className="text-lg text-gray-500">
                        프로젝트가 없습니다.
                      </div>
                    </div>
                  )}
                </>
              )}

              {selectedTab === 'study' && (
                <>
                  {studies.length > 0 ? (
                    studies.map((team) => (
                      <StudyCard
                        key={team.id}
                        team={convertToStudyTeam(team)}
                        hideLabel={true}
                      />
                    ))
                  ) : (
                    <div className="col-span-4 flex items-center justify-center">
                      <div className="text-lg text-gray-500">
                        스터디가 없습니다.
                      </div>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </TabLayout>
    </section>
  )
}
