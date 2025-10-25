'use client'

import { useState } from 'react'
import TabLayout from '@/components/home/TabLayout'
import ProjectCard from '@/components/project/ProjectCard'
import StudyCard from '@/components/project/StudyCard'
import { useAllTeamsQuery } from '@/api/home/queries'
import { ProjectStudyTeam } from '@/api/home'

const convertToProjectTeam = (team: ProjectStudyTeam) => {
  return {
    id: team.id,
    isDeleted: team.deleted,
    isRecruited: team.isRecruited,
    isFinished: team.finished,
    name: team.name,
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
    resultImages: team.mainImages,
    deleted: team.deleted,
    recruited: team.isRecruited,
    finished: team.finished,
  }
}

const convertToStudyTeam = (team: ProjectStudyTeam) => {
  return {
    id: team.id,
    name: team.name,
    isRecruited: team.isRecruited,
    finished: team.finished,
    type: 'STUDY' as const,
    recruitNum: team.recruitNum || 0,
    studyExplain: team.studyExplain || '',
    deleted: team.deleted,
    recruited: team.isRecruited,
    resultImages: team.mainImages,
    createdAt: team.createdAt,
  }
}

export default function ProjectStudySection() {
  const [selectedTab, setSelectedTab] = useState<'project' | 'study'>('project')

  const {
    data: projectData,
    isLoading: projectLoading,
    error: projectError,
  } = useAllTeamsQuery({
    teamTypes: ['PROJECT'],
    limit: 4,
    sortType: 'UPDATE_AT_DESC',
  })

  const {
    data: studyData,
    isLoading: studyLoading,
    error: studyError,
  } = useAllTeamsQuery({
    teamTypes: ['STUDY'],
    limit: 4,
    sortType: 'UPDATE_AT_DESC',
  })

  const projects = projectData?.pages?.[0]?.teams || []
  const studies = studyData?.pages?.[0]?.teams || []

  const loading = projectLoading || studyLoading
  const error = projectError || studyError

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
              <div className="text-lg text-red-500">{error?.message}</div>
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
