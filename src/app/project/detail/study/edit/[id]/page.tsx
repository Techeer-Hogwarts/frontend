'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'

import AddMember from '@/components/project/add/study/AddMember'
import AddProfile from '@/components/project/add/study/AddProfile'
import AddResults from '@/components/project/add/study/AddResults'
import NecessaryQuestions from '@/components/project/add/NecessaryQuestions'
import AddGoal from '@/components/project/add/study/AddGoal'
import AddPlan from '@/components/project/add/study/AddPlan'
import AddRecruit from '@/components/project/add/study/AddRecruit'

import {
  getStudyDetail,
  getStudyMember,
  handleEditStudy,
} from '@/api/project/study/study'

export default function AddStudyPage() {
  const router = useRouter()

  const projectId = Number(localStorage.getItem('projectId'))

  const { data: studyDetails } = useQuery({
    queryKey: ['getStudyDetails', projectId],
    queryFn: () => getStudyDetail(projectId),
  })
  console.log(studyDetails)

  type StudyMember = {
    id: number
    name: string
    isDeleted: boolean
    isLeader: boolean
    studyTeamId: number
    userId: number
    email: string
  }

  type StudyDataType = {
    name: string
    githubLink: string
    notionLink: string
    studyExplain: string
    goal: string
    rule: string
    isFinished: boolean
    isRecruited: boolean
    recruitNum: number
    recruitExplain: string
    studyMember: StudyMember[]
    resultImages: string[]
    deleteImages: string[]
  }

  const [studyData, setStudyData] = useState<StudyDataType | null>(null)

  useEffect(() => {
    if (studyDetails) {
      setStudyData({
        name: studyDetails.name,
        githubLink: studyDetails.githubLink || '',
        notionLink: studyDetails.notionLink || '',
        studyExplain: studyDetails.studyExplain || '',
        goal: studyDetails.goal || '',
        rule: studyDetails.rule || '',
        isFinished: studyDetails.isFinished || false,
        isRecruited: studyDetails.isRecruited || false,
        recruitNum: studyDetails.recruitNum || 0,
        recruitExplain: studyDetails.recruitExplain || '',
        studyMember: studyDetails.studyMember || [],
        resultImages:
          studyDetails.resultImages.map((img) => img.imageUrl) || [],
        deleteImages: [],
      })
    }
  }, [studyDetails])

  const handleUpdate = (key, value) => {
    setStudyData((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = async () => {
    const response = await handleEditStudy(studyData, projectId)
    console.log(response)

    router.push(`/project/detail/study/${response.id}`)
    localStorage.setItem('projectId', response.id)
  }

  return (
    <div className="relative flex justify-between mt-[2.75rem]">
      {studyData && (
        <>
          <div>
            <AddProfile projectData={studyData} onUpdate={handleUpdate} />
          </div>
          <div className="flex flex-col gap-7">
            <AddMember
              projectMember={studyData.studyMember}
              onUpdateMember={(newMembers) =>
                handleUpdate('studyMember', newMembers)
              }
            />
            <AddGoal goal={studyData.goal} onUpdate={handleUpdate} />
            <AddPlan rule={studyData.rule} onUpdate={handleUpdate} />
            <NecessaryQuestions
              isFinished={studyData.isFinished}
              onUpdate={handleUpdate}
            />
            <AddRecruit
              isRecruited={studyData.isRecruited}
              recruitNum={studyData.recruitNum}
              recruitExplain={studyData.recruitExplain}
              onUpdate={handleUpdate}
            />
            {/* <AddResults
              existingUrls={studyData.resultImages || []}
              resultImages={studyData.resultImages || []}
              deleteImages={studyData.deleteImages || []}
              onUpdate={handleUpdate}
            /> */}

            <button
              type="button"
              className="w-full h-[2.16044rem] rounded-[0.3125rem] text-primary border border-primary"
              onClick={handleSubmit}
            >
              등록하기
            </button>
          </div>
        </>
      )}
    </div>
  )
}