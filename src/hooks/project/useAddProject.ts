'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { handleAddProject } from '@/api/project/project/project'
import { ProjectData } from '@/types/project/project'

export const useAddProject = () => {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [projectData, setProjectData] = useState<ProjectData>({
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
    mainImageFile: null,
    resultImages: [],
  })

  const handleUpdate = useCallback((key: string, value: any) => {
    setProjectData((prev) => ({ ...prev, [key]: value }))
  }, [])

  const validateProjectData = useCallback(
    (data: ProjectData): string | null => {
      if (!data.name.trim()) {
        return '프로젝트 이름을 입력해주세요.'
      }

      if (!data.mainImageFile) {
        return '대표 이미지를 업로드해주세요.'
      }

      const hasLeader = data.projectMember.some((m) => m.isLeader)
      if (!hasLeader) {
        return '리더를 한 명 이상 지정해주세요!'
      }

      return null
    },
    [],
  )

  const submitProject = useCallback(async () => {
    if (isSubmitting) return

    setIsSubmitting(true)

    try {
      const validationError = validateProjectData(projectData)
      if (validationError) {
        alert(validationError)
        return
      }

      const dataToSend = { ...projectData }

      if (dataToSend.projectMember && Array.isArray(dataToSend.projectMember)) {
        dataToSend.projectMember = dataToSend.projectMember.map((member) => {
          const { profileImage, name, id, email, ...rest } = member
          return rest
        })
      }

      const response = await handleAddProject(dataToSend)

      if (response) {
        router.push(`/project/detail/project/${response.id}`)
      } else {
        throw new Error('프로젝트 등록에 실패했습니다.')
      }
    } catch (error) {
      console.error('프로젝트 등록 중 오류:', error)
      alert('등록에 실패하였습니다. 다시 시도해주세요.')
    } finally {
      setIsSubmitting(false)
    }
  }, [projectData, isSubmitting, validateProjectData, router])

  return {
    projectData,
    isSubmitting,
    handleUpdate,
    submitProject,
  }
}
