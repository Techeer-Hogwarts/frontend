'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import AddMember from '@/components/project/add/AddMember'
import AddProfile from '@/components/project/add/AddProfile'
import AddResults from '@/components/project/add/project/AddResults'
import NecessaryQuestions from '@/components/project/add/NecessaryQuestions'
import AddGoal from '@/components/project/add/study/AddGoal'
import AddPlan from '@/components/project/add/study/AddPlan'
import AddRecruit from '@/components/project/add/AddRecruit'

import { handleAddStudy } from '@/api/project/study/study'

export default function AddStudyPage() {
  const router = useRouter()

  const [studyData, setStudyData] = useState({
    name: '',
    githubLink: '',
    notionLink: '',
    studyExplain: '',
    goal: '',
    rule: '',
    isFinished: false,
    isRecruited: true,
    recruitNum: 0,
    recruitExplain: '',
    studyMember: [],
    resultImages: [],
  })

  const handleUpdate = (key, value) => {
    setStudyData((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = async () => {
    const formData = new FormData()

    try {
      const { resultImages, ...studyWithoutImages } = studyData
      formData.append(
        'createStudyTeamRequest',
        JSON.stringify(studyWithoutImages),
      )

      resultImages.forEach((file) => {
        formData.append('files', file)
      })

      const response = await handleAddStudy(formData)

      router.push(`/project/detail/study/${response.id}`)
      localStorage.setItem('projectId', response.id)
    } catch (error) {
      alert('서버 요청 중 오류가 발생했습니다.')
    }
  }

  return (
    <div className="relative flex justify-between mt-[2.75rem]">
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
        <AddResults
          resultImages={studyData.resultImages || []}
          onUpdate={handleUpdate}
        />

        <button
          type="button"
          className="w-full h-[2.16044rem] rounded-[0.3125rem] text-primary border border-primary"
          onClick={handleSubmit}
        >
          등록하기
        </button>
      </div>
    </div>
  )
}
