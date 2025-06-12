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
    mainImage: null,
    resultImages: [],
  })

  const [tempDeleted, setTempDeleted] = useState<DeletedMember[]>([])
  const [deleteMainImages, setDeleteMainImages] = useState<number[]>([])
  const [deleteResultImages, setDeleteResultImages] = useState<number[]>([])

  // 기존 메인 이미지 ID 저장 (교체 시 삭제하기 위해)
  const [originalMainImageId, setOriginalMainImageId] = useState<number | null>(
    null,
  )

  // 프로젝트 데이터 초기화
  useEffect(() => {
    if (!projectDetails) return

    // 기존 메인 이미지 ID 저장
    if (projectDetails.mainImages && projectDetails.mainImages.length > 0) {
      setOriginalMainImageId(projectDetails.mainImages[0].id)
    }

    setProjectData({
      name: projectDetails.name || '',
      projectExplain: projectDetails.projectExplain || '',
      frontendNum: projectDetails.frontendNum || 0,
      backendNum: projectDetails.backendNum || 0,
      devopsNum: projectDetails.devopsNum || 0,
      fullStackNum: projectDetails.fullStackNum || 0,
      dataEngineerNum: projectDetails.dataEngineerNum || 0,
      isRecruited: projectDetails.recruited,
      isFinished: projectDetails.finished,
      recruitExplain: projectDetails.recruitExplain || '',
      githubLink: projectDetails.githubLink || '',
      notionLink: projectDetails.notionLink || '',
      projectMember: projectDetails.projectMember
        ? projectDetails.projectMember.map((member) => ({
            ...member,
            isLeader: member.leader,
          }))
        : [],
      teamStacks: projectDetails.teamStacks
        ? projectDetails.teamStacks.map((item: any) => ({
            stack: item.stack.name,
            isMain: item.main,
          }))
        : [],
      mainImage: null,
      resultImages: [],
    })
  }, [projectDetails])

  console.log('projectDetails', projectDetails)
  console.log('projectData', projectData)
  console.log('originalMainImageId', originalMainImageId)
  console.log('deleteMainImages', deleteMainImages)

  // 상태 업데이트 핸들러
  const handleUpdate = useCallback(
    (key: keyof EditProjectData, value: any) => {
      // 메인 이미지 업데이트 시 기존 이미지 삭제 대상에 추가
      if (key === 'mainImage' && value) {
        console.log('🔄 메인 이미지 교체 감지')

        // 기존 메인 이미지가 있고, 아직 삭제 대상에 없다면 추가
        if (
          originalMainImageId &&
          !deleteMainImages.includes(originalMainImageId)
        ) {
          console.log(
            '🗑️ 기존 메인 이미지를 삭제 대상에 추가:',
            originalMainImageId,
          )
          setDeleteMainImages((prev) => [...prev, originalMainImageId])
        }
      }

      setProjectData((prev) => ({ ...prev, [key]: value }))
    },
    [originalMainImageId, deleteMainImages],
  )

  // 메인 이미지 삭제 핸들러 (수동 삭제)
  const handleDeleteOldMainImage = useCallback((oldId: number) => {
    console.log('🗑️ 메인 이미지 수동 삭제:', oldId)
    setDeleteMainImages((prev) => {
      if (!prev.includes(oldId)) {
        return [...prev, oldId]
      }
      return prev
    })

    // 메인 이미지를 삭제하면 새 이미지도 제거
    setProjectData((prev) => ({ ...prev, mainImage: null }))
  }, [])

  // 결과 이미지 삭제 핸들러
  const handleDeleteOldResultImage = useCallback((oldId: number) => {
    console.log('🗑️ 결과 이미지 삭제:', oldId)
    setDeleteResultImages((prev) => {
      if (!prev.includes(oldId)) {
        return [...prev, oldId]
      }
      return prev
    })
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

      // 메인 이미지가 삭제되었는데 새 이미지가 없는 경우
      if (deleteMainImages.length > 0 && !data.mainImage) {
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

      console.log('📤 전송 데이터 준비:')
      console.log('  - 새 메인 이미지:', data.mainImage?.name || '없음')
      console.log('  - 삭제할 메인 이미지 ID들:', deleteMainImages)
      console.log('  - 삭제할 결과 이미지 ID들:', deleteResultImages)

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
        alert('프로젝트가 성공적으로 수정되었습니다!')
        router.push(`/project/detail/project/${projectId}`)
      } else {
        throw new Error('프로젝트 수정에 실패했습니다.')
      }
    } catch (error) {
      alert(error.message || '수정에 실패했습니다.')
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
