import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import {
  getProjectDetail,
  handleEditProject,
} from '@/api/project/project/project'
import {
  EditProjectData,
  DeletedMember,
  EditProjectMember,
  EditProjectFormData,
} from '@/types/project/projectEdit'

export const useEditProject = (projectId: number) => {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // React Query: 프로젝트 상세 정보
  const {
    data: projectDetails,
    isSuccess,
    isLoading,
  } = useQuery({
    queryKey: ['getProjectDetails', projectId],
    queryFn: () => getProjectDetail(projectId),
    enabled: !!projectId,
  })

  // 편집용 상태
  const [projectData, setProjectData] = useState<EditProjectData>({
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
    mainImageFile: null,
    resultImages: [],
  })

  const [tempDeleted, setTempDeleted] = useState<DeletedMember[]>([])
  const [deleteMainImages, setDeleteMainImages] = useState<number[]>([])
  const [deleteResultImages, setDeleteResultImages] = useState<number[]>([])

  // 프로젝트 데이터 초기화
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

  // 상태 업데이트 핸들러
  const handleUpdate = useCallback((key: keyof EditProjectData, value: any) => {
    setProjectData((prev) => ({ ...prev, [key]: value }))
  }, [])

  // 메인 이미지 삭제 핸들러
  const handleDeleteOldMainImage = useCallback((oldId: number) => {
    setDeleteMainImages((prev) => [...prev, oldId])
  }, [])

  // 결과 이미지 삭제 핸들러
  const handleDeleteOldResultImage = useCallback((oldId: number) => {
    setDeleteResultImages((prev) => [...prev, oldId])
  }, [])

  // 멤버 삭제 핸들러
  const handleDeleteMember = useCallback(
    (memberId: number, userId: number) => {
      const already = tempDeleted.some((item) => item.id === memberId)
      if (!already) {
        setTempDeleted((prev) => [...prev, { id: memberId, userId }])
      }
    },
    [tempDeleted],
  )

  // 멤버 복구 핸들러
  const handleRestoreMember = useCallback(
    (memberId: number, userId: number) => {
      setTempDeleted((prev) => prev.filter((item) => item.userId !== userId))
    },
    [],
  )

  // 유효성 검사
  const validateProjectData = useCallback(
    (data: EditProjectData): string | null => {
      if (!data.name.trim()) {
        return '프로젝트 이름을 입력해주세요!'
      }

      if (deleteMainImages.length > 0 && !data.mainImageFile) {
        return '메인 이미지를 업로드해주세요!'
      }

      const hasLeader = data.projectMember.some(
        (m: EditProjectMember) => m.isLeader,
      )
      if (!hasLeader) {
        return '리더를 한 명 이상 지정해주세요!'
      }

      return null
    },
    [deleteMainImages],
  )

  // 전송 데이터 준비
  const prepareFormData = useCallback(
    (data: EditProjectData): EditProjectFormData => {
      const finalMember = data.projectMember
        .filter((m: EditProjectMember) => {
          return !tempDeleted.some((td) => td.id === m.id)
        })
        .map((m: EditProjectMember) => ({
          userId: m.userId,
          isLeader: m.isLeader || false,
          teamRole: m.teamRole || '',
        }))

      const deleteMembers = tempDeleted.map((td) => td.id)

      return {
        ...data,
        projectMember: finalMember,
        deleteMembers,
        deleteMainImages,
        deleteResultImages,
      }
    },
    [tempDeleted, deleteMainImages, deleteResultImages],
  )

  // 프로젝트 수정 제출
  const submitEditProject = useCallback(async () => {
    if (isSubmitting) return

    setIsSubmitting(true)

    try {
      const validationError = validateProjectData(projectData)
      if (validationError) {
        alert(validationError)
        return
      }

      const dataToSend = prepareFormData(projectData)
      const result = await handleEditProject(projectId, dataToSend)

      if (result) {
        router.push(`/project/detail/project/${projectId}`)
      } else {
        throw new Error('프로젝트 수정에 실패했습니다.')
      }
    } catch (error) {
      console.error('프로젝트 수정 중 오류:', error)
      alert('수정 실패')
    } finally {
      setIsSubmitting(false)
    }
  }, [
    isSubmitting,
    projectData,
    projectId,
    router,
    validateProjectData,
    prepareFormData,
  ])

  return {
    // 데이터
    projectDetails,
    projectData,
    isLoading,
    isSubmitting,

    // 삭제 관련 상태
    tempDeleted,
    deleteMainImages,
    deleteResultImages,

    // 핸들러들
    handleUpdate,
    handleDeleteOldMainImage,
    handleDeleteOldResultImage,
    handleDeleteMember,
    handleRestoreMember,
    submitEditProject,
  }
}
