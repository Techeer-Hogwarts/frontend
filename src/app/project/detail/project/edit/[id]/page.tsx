'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'

// 기존 컴포넌트
import AddProfile from '@/components/project/add/AddProfile'
import AddMember from '@/components/project/add/AddMember'
import AddRecruit from '@/components/project/add/AddRecruit'
import AddStack from '@/components/project/add/project/AddStack'
import AddResults from '@/components/project/add/project/AddResults'
import NecessaryQuestions from '@/components/project/add/NecessaryQuestions'
import Loading from '@/components/common/Loading'

// API
import {
  getProjectDetail,
  handleEditProject,
} from '@/api/project/project/project'

export default function EditProjectPage() {
  const router = useRouter()
  const params = useParams()
  const projectId = Number(params.id)

  // 1) 프로젝트 상세 정보
  const {
    data: projectDetails,
    isSuccess,
    isLoading,
  } = useQuery({
    queryKey: ['getProjectDetails', projectId],
    queryFn: () => getProjectDetail(projectId),
    enabled: !!projectId,
  })

  // 3) 편집용 state
  const [projectData, setProjectData] = useState({
    name: '',
    projectExplain: '',
    frontendNum: 0,
    backendNum: 0,
    devopsNum: 0,
    fullStackNum: 0,
    dataEngineerNum: 0,
    isRecruited: false,
    isFinished: true,
    recruitExplain: '',
    githubLink: '',
    notionLink: '',
    projectMember: [],
    teamStacks: [],
    mainImageFile: null as File | null,
    resultImages: [] as File[],
  })
  const [tempDeleted, setTempDeleted] = useState<
    Array<{ id: number; userId: number }>
  >([])

  // 기존 메인이미지 삭제용
  const [deleteMainImages, setDeleteMainImages] = useState<number[]>([])
  // 기존 결과이미지 삭제용
  const [deleteResultImages, setDeleteResultImages] = useState<number[]>([])

  // 4) projectDetails 로딩 후 초기화
  useEffect(() => {
    if (!projectDetails) return

    setProjectData({
      name: projectDetails.name || '',
      projectExplain: projectDetails.projectExplain || '',
      frontendNum: projectDetails.frontendNum || 0,
      backendNum: projectDetails.backendNum || 0,
      devopsNum: projectDetails.devopsNum || 0,
      fullStackNum: projectDetails.fullStackNum || 0,
      dataEngineerNum: projectDetails.dataEngineerNum || 0,
      isRecruited: projectDetails.isRecruited,
      isFinished: projectDetails.isFinished,
      recruitExplain: projectDetails.recruitExplain || '',
      githubLink: projectDetails.githubLink || '',
      notionLink: projectDetails.notionLink || '',
      projectMember: projectDetails.projectMember,
      teamStacks:
        projectDetails.teamStacks?.map((item: any) => ({
          stack: item.stack.name,
          isMain: item.isMain,
        })) || [],
      mainImageFile: null,
      resultImages: [],
    })
  }, [projectDetails])

  if (isLoading) return <Loading />

  // 5) state 갱신 함수
  const handleUpdate = (key: string, value: any) => {
    setProjectData((prev) => ({ ...prev, [key]: value }))
  }

  // 메인이미지 삭제
  const handleDeleteOldMainImage = (oldId: number) => {
    setDeleteMainImages((prev) => [...prev, oldId])
  }

  // 결과이미지 삭제
  const handleDeleteOldResultImage = (oldId: number) => {
    setDeleteResultImages((prev) => [...prev, oldId])
  }

  /**
   * (B) 자식에서 멤버 삭제 시 → deleteMembers에 “멤버의 id”를 추가
   */
  const handleDeleteMember = (memberId: number, userId: number) => {
    const already = tempDeleted.some((item) => item.id === memberId)
    if (!already) {
      const updated = [...tempDeleted, { id: memberId, userId }]
      setTempDeleted(updated)
    }
  }

  const handleRestoreMember = (memberId: number, userId: number) => {
    const updated = tempDeleted.filter((item) => item.userId !== userId)
    setTempDeleted(updated)
  }

  // 6) 수정하기
  const handleSubmit = async () => {
    // (1) 프로젝트 이름 확인
    if (!projectData.name.trim()) {
      alert('프로젝트 이름을 입력해주세요!')
      return
    }

    // (2) 메인 이미지 확인
    //    - 기존 메인 이미지가 없다거나 삭제되었고 (existingMainImageId가 null)
    //    - 새로 업로드한 mainImageFile도 없다면
    if (deleteMainImages.length > 0 && !projectData.mainImageFile) {
      alert('메인 이미지를 업로드해주세요!')
      return
    }

    // (3) 리더(팀장) 확인
    const hasLeader = projectData.projectMember.some((m: any) => m.isLeader)
    if (!hasLeader) {
      alert('리더를 한 명 이상 지정해주세요!')
      return
    }

    // (4) 삭제되지 않은 멤버만 골라서 최종 전송할 형태로 변환
    const finalMember = projectData.projectMember
      .filter((m: any) => {
        return !tempDeleted.some((td) => td.id === m.id)
      })
      .map((m: any) => ({
        userId: m.userId,
        isLeader: m.isLeader || false,
        teamRole: m.teamRole || '',
      }))

    const deleteMembers = tempDeleted.map((td) => td.id)

    // (D) 최종 전송
    const dataToSend = {
      ...projectData,
      projectMember: finalMember,
      deleteMembers,
      deleteMainImages,
      deleteResultImages,
    }

    try {
      const result = await handleEditProject(projectId, dataToSend)
      if (result) {
        router.push(`/project/detail/project/${projectId}`)
      }
    } catch (error) {
      alert('수정 실패')
    }
  }

  return (
    <div className="relative flex justify-between mt-[2.75rem] gap-[3.188rem]">
      <div>
        <AddProfile
          variant="project"
          projectData={projectData}
          onUpdate={handleUpdate}
          // 기존 메인이미지 URL, ID
          existingMainImageUrl={projectDetails.mainImages?.[0]?.imageUrl || ''}
          existingMainImageId={projectDetails.mainImages?.[0]?.id || null}
          onDeleteOldMainImage={handleDeleteOldMainImage}
        />
      </div>
      <div className="flex flex-col gap-7">
        <AddMember
          members={projectData.projectMember}
          type="project"
          onUpdateMember={(newMembers) =>
            handleUpdate('projectMember', newMembers)
          }
          onDeleteMember={(memberId, userId) =>
            handleDeleteMember(memberId, userId)
          }
          onRestoreMember={(memberId, userId) =>
            handleRestoreMember(memberId, userId)
          }
        />
        <NecessaryQuestions
          isFinished={projectData.isFinished}
          onUpdate={handleUpdate}
        />
        <AddRecruit
          variant="project"
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
          /** 기존 teamStacks (ex: [{ stack: "React.js", isMain: true }, ...]) */
          initialTeamStacks={projectData.teamStacks}
          onUpdateStacks={(teamStacks) =>
            handleUpdate('teamStacks', teamStacks)
          }
        />

        <AddResults
          existingResultImages={projectDetails?.resultImages} // [{ id: 101, imageUrl: "..." }, ...]
          newResultImages={projectData.resultImages} // File[] (새로 업로드할)
          onUpdateResultImages={(files) => handleUpdate('resultImages', files)}
          onDeleteOldResultImage={handleDeleteOldResultImage}
        />

        <button
          type="button"
          onClick={handleSubmit}
          className="w-full h-[2.16044rem] rounded-[0.3125rem] text-primary border border-primary"
        >
          수정하기
        </button>
      </div>
    </div>
  )
}
