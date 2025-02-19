'use client'

import AddMember from '@/components/project/add/AddMember'
import AddProfile from '@/components/project/add/AddProfile'
import AddRecruit from '@/components/project/add/AddRecruit'
import AddResults from '@/components/project/add/project/AddResults'
import AddStack from '@/components/project/add/project/AddStack'
import NecessaryQuestions from '@/components/project/add/NecessaryQuestions'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { handleAddProject } from '@/api/project/project/project'

export default function AddProjectPage() {
  const router = useRouter()

  const [projectData, setProjectData] = useState({
    name: '',
    projectExplain: '',
    frontendNum: 0,
    backendNum: 0,
    devopsNum: 0,
    // fullStackNum: 0,
    isRecruited: false,
    isFinished: true,
    recruitExplain: '',
    githubLink: '',
    notionLink: '',
    projectMember: [],
    teamStacks: [],
    resultImages: [],
    projectImage: '',
  })

  const handleUpdate = (key, value) => {
    setProjectData((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = async () => {
    console.log(projectData)
    try {
      const response = await handleAddProject(projectData)
      if (response.status === 200) {
        router.push(`/project/detail/project/${response.data.id}`)
        localStorage.setItem('projectId', response.data.id)
      } else {
        alert('등록에 실패하였습니다. 다시 시도해주세요.')
      }
    } catch (error) {
      alert('서버 요청 중 오류가 발생했습니다.')
    }
  }

  return (
    <div className="relative flex justify-between mt-[2.75rem]">
      <div>
        <AddProfile projectData={projectData} onUpdate={handleUpdate} />
      </div>
      <div className="flex flex-col gap-7">
        {/* 추후처리 */}
        {/* <AddMember
          projectMember={projectData.projectMember}
          onUpdateMember={(newMembers) =>
            handleUpdate('projectMember', newMembers)
          }
        /> */}
        <NecessaryQuestions
          isFinished={projectData.isFinished}
          onUpdate={handleUpdate}
        />
        <AddRecruit
          isRecruited={projectData.isRecruited}
          frontendNum={projectData.frontendNum}
          backendNum={projectData.backendNum}
          devopsNum={projectData.devopsNum}
          // fullStackNum={projectData.fullStackNum}
          recruitExplain={projectData.recruitExplain}
          onUpdate={handleUpdate}
        />
        {/* 추후처리 */}
        <AddStack />
        <AddResults
          resultImages={projectData.resultImages || []}
          onUpdate={handleUpdate}
        />
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full h-[2.16044rem] rounded-[0.3125rem] text-primary border border-primary"
        >
          등록하기
        </button>
      </div>
    </div>
  )
}
