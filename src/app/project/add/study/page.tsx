'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import AddMember from '@/components/project/add/AddMember'
import AddProfile from '@/components/project/add/AddProfile'
import AddResults from '@/components/project/add/AddResults'
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
    if (!studyData.name) {
      alert('이름을 입력해주세요.')
      return
    }

    if ((studyData.studyExplain?.trim() ?? '') === '') {
      alert('스터디 설명을 입력해주세요.')
      return
    }

    if (studyData.studyMember.length === 0) {
      alert('스터디 멤버를 최소 1명 이상 추가해주세요.')
      return
    }

    if ((studyData.goal?.trim() ?? '') === '') {
      alert('스터디 목표를 입력해주세요.')
      return
    }

    if ((studyData.rule?.trim() ?? '') === '') {
      alert('스터디 규칙을 입력해주세요.')
      return
    }

    if (studyData.isRecruited) {
      if (studyData.recruitNum <= 0) {
        alert('모집 인원은 1명 이상이어야 합니다.')
        return
      }

      if ((studyData.recruitExplain?.trim() ?? '') === '') {
        alert('모집 설명을 입력해주세요.')
        return
      }
    }

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
    } catch (error) {}
  }

  return (
    <div className="relative flex justify-between mt-[2.75rem] gap-[3.188rem]">
      <div>
        <AddProfile
          variant="study"
          projectData={studyData}
          onUpdate={handleUpdate}
        />
      </div>
      <div className="flex flex-col gap-7">
        <AddMember
          members={studyData.studyMember}
          type="study"
          onUpdateMember={(newMembers) =>
            handleUpdate('studyMember', newMembers)
          }
        />
        <AddGoal goal={studyData.goal} onUpdate={handleUpdate} />
        <AddPlan rule={studyData.rule} onUpdate={handleUpdate} />
        <NecessaryQuestions
          variant="study"
          isFinished={studyData.isFinished}
          onUpdate={handleUpdate}
        />
        <AddRecruit
          variant="study"
          isRecruited={studyData.isRecruited}
          recruitNum={studyData.recruitNum}
          recruitExplain={studyData.recruitExplain}
          onUpdate={handleUpdate}
        />
        <AddResults
          newResultImages={studyData.resultImages} // File[] (새로 업로드할)
          onUpdateResultImages={(files) => handleUpdate('resultImages', files)}
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
