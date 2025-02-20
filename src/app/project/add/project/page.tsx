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
    uiuxNum: 0,
    dataEngineerNum: 0,
    isRecruited: false,
    isFinished: true,
    recruitExplain: '',
    githubLink: '',
    notionLink: '',
    projectMember: [],
    teamStacks: [],
    // 대표 이미지는 단일 파일(또는 null)
    mainImageFile: null as File | null,
    // 결과 이미지는 여러 개 가능 → File[]
    resultImages: [] as File[],
  })

  const handleUpdate = (key: string, value: any) => {
    setProjectData((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = async () => {
    console.log(projectData)

    const response = await handleAddProject(projectData)
    console.log(response)
    if (response) {
      router.push(`/project/detail/project/${response.id}`)
      localStorage.setItem('projectId', response.id)
    } else {
      alert('등록에 실패하였습니다. 다시 시도해주세요.')
    }
  }

  return (
    <div className="relative flex justify-between mt-[2.75rem]">
      <div>
        <AddProfile projectData={projectData} onUpdate={handleUpdate} />
      </div>
      <div className="flex flex-col gap-7">
        {/* 추후처리 */}
        <AddMember
          projectMember={projectData.projectMember}
          onUpdateMember={(newMembers) =>
            handleUpdate('projectMember', newMembers)
          }
        />
        <NecessaryQuestions
          isFinished={projectData.isFinished}
          onUpdate={handleUpdate}
        />
        <AddRecruit
          isRecruited={projectData.isRecruited}
          frontendNum={projectData.frontendNum}
          backendNum={projectData.backendNum}
          devopsNum={projectData.devopsNum}
          uiuxNum={projectData.uiuxNum}
          dataEngineerNum={projectData.dataEngineerNum}
          recruitExplain={projectData.recruitExplain}
          onUpdate={handleUpdate}
        />
        <AddStack
          onUpdateStacks={(teamStacks) =>
            handleUpdate('teamStacks', teamStacks)
          }
        />
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
