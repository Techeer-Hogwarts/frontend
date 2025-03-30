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
    fullStackNum: 0,
    dataEngineerNum: 0,
    isRecruited: true,
    isFinished: false,
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
    // 1) 프로젝트 이름 확인
    if (!projectData.name.trim()) {
      alert('프로젝트 이름을 입력해주세요.')
      return
    }

    // 2) 메인 이미지 체크
    if (!projectData.mainImageFile) {
      alert('대표 이미지를 업로드해주세요.')
      return
    }

    // 3) 리더(팀장) 체크
    const hasLeader = projectData.projectMember.some((m) => m.isLeader)
    if (!hasLeader) {
      alert('리더를 한 명 이상 지정해주세요!')
      return
    }

    const dataToSend = { ...projectData }

    if (dataToSend.projectMember && Array.isArray(dataToSend.projectMember)) {
      dataToSend.projectMember = dataToSend.projectMember.map((member) => {
        const { profileImage, name, id, email, ...rest } = member
        return rest
      })
    }

    // (C) 수정된 데이터(dataToSend)를 전송
    const response = await handleAddProject(dataToSend)
    if (response) {
      router.push(`/project/detail/project/${response.id}`)
    } else {
      alert('등록에 실패하였습니다. 다시 시도해주세요.')
    }
  }

  return (
    <div className="relative flex justify-between mt-[2.75rem] gap-[3.188rem]">
      <div>
        <AddProfile projectData={projectData} onUpdate={handleUpdate} />
      </div>
      <div className="flex flex-col gap-7">
        {/* 추후처리 */}
        <AddMember
          members={projectData.projectMember}
          type="project"
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
          fullStackNum={projectData.fullStackNum}
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
          newResultImages={projectData.resultImages} // File[] (새로 업로드할)
          onUpdateResultImages={(files) => handleUpdate('resultImages', files)}
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
