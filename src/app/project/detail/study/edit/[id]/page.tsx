'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'

import AddMember from '@/components/project/add/AddMember'
import AddProfile from '@/components/project/add/AddProfile'
import AddResults from '@/components/project/add/study/AddResults'
import NecessaryQuestions from '@/components/project/add/study/NecessaryQuestions'
import AddGoal from '@/components/project/add/study/AddGoal'
import AddPlan from '@/components/project/add/study/AddPlan'
import AddRecruit from '@/components/project/add/study/AddRecruit'
import Loading from '@/components/common/Loading'

import { getStudyDetail, handleEditStudy } from '@/api/project/study/study'

export default function AddStudyPage() {
  const router = useRouter()
  const params = useParams()
  const projectId = Number(params.id)

  const { data: studyDetails, isLoading } = useQuery({
    queryKey: ['getStudyDetails', projectId],
    queryFn: () => getStudyDetail(projectId),
    enabled: !!projectId,
  })

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
    resultImages: File[]
    deleteImages: string[]
  }

  const [studyData, setStudyData] = useState<any | null>(null)
  // 기존 결과이미지 삭제용
  const [deleteImages, setDeleteImages] = useState<number[]>([])
  const [tempDeleted, setTempDeleted] = useState<any>([])
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
        resultImages: [],
        deleteImages: [],
      })
    }
  }, [studyDetails])

  if (isLoading) return <Loading />

  const handleUpdate = (key, value) => {
    setStudyData((prev) => ({ ...prev, [key]: value }))
  }

  // 결과이미지 삭제
  const handleDeleteOldResultImage = (oldId: number) => {
    setDeleteImages((prev) => [...prev, oldId])
  }

  // 자식에서 멤버 삭제 시 → deleteMembers에 “멤버의 id”를 추가

  const handleDeleteMember = (memberId: number, userId: number) => {
    const already = tempDeleted.some((item) => item.id === memberId)
    if (!already) {
      // 올바른 memberId를 사용하여 삭제 대상에 추가합니다.
      const updated = [...tempDeleted, { id: memberId }]
      setTempDeleted(updated)
    }
  }

  const handleRestoreMember = (memberId: number, userId: number) => {
    const updated = tempDeleted.filter((item) => item.userId !== userId)
    setTempDeleted(updated)
  }

  const handleSubmit = async () => {
    if (!studyData.name) {
      alert('스터디 이름을 입력해주세요.')
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

    // 리더(팀장) 확인: studyMember 배열에 isLeader가 true인 멤버가 존재하는지 확인합니다.
    const hasLeader = studyData.studyMember.some((member) => member.isLeader)
    // 만약 리더가 없다면 아래와 같이 경고 메시지를 표시할 수 있습니다.
    if (!hasLeader) {
      alert('리더를 한 명 이상 지정해주세요!')
      return
    }

    // 삭제되지 않은 멤버만 골라서 최종 전송할 형태로 변환
    const finalMember = studyData?.projectMember
      ?.filter((m: any) => {
        return !tempDeleted.some((td) => td.id === m.id)
      })
      .map((m: any) => ({
        userId: m.userId,
        isLeader: m.isLeader || false,
      }))

    const deleteMembers = tempDeleted.map((td) => td.id)

    // FormData 객체를 생성합니다.
    const formData = new FormData()

    // studyData에서 resultImages를 분리하고, 나머지 데이터는 studyWithoutImages에 저장합니다.
    const { resultImages, ...studyWithoutImages } = studyData

    // studyMember 배열의 각 객체에서 userId와 isLeader만 추출합니다.
    const filteredStudyMembers = studyData.studyMember.map(
      ({ userId, isLeader }) => ({
        userId,
        isLeader,
      }),
    )

    // JSON 데이터 생성 시 studyMember 필드를 filteredStudyMembers로 대체하고, deleteImages도 포함합니다.
    formData.append(
      'updateStudyTeamRequest',
      JSON.stringify({
        ...studyWithoutImages,
        studyMember: filteredStudyMembers,
        deleteImages,
        deleteMembers,
      }),
    )

    // resultImages 배열에 포함된 파일들을 FormData에 추가합니다.
    resultImages.forEach((file: File) => {
      formData.append('files', file)
    })

    try {
      // handleEditStudy API 함수를 통해 서버에 수정 요청을 보냅니다.
      const response = await handleEditStudy(formData, projectId)

      // 성공적으로 요청이 완료되면 해당 study의 상세 페이지로 이동합니다.
      router.push(`/project/detail/study/${response.id}`)
    } catch (error) {}
  }

  return (
    <div className="relative flex justify-between mt-[2.75rem] gap-[3.188rem]">
      {studyData && (
        <>
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
              onDeleteMember={(memberId, userId) =>
                handleDeleteMember(memberId, userId)
              }
              onRestoreMember={(memberId, userId) =>
                handleRestoreMember(memberId, userId)
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
              existingResultImages={studyDetails?.resultImages}
              newResultImages={studyData.resultImages}
              onUpdateResultImages={(files) => {
                handleUpdate('resultImages', files)
              }}
              onDeleteOldResultImage={handleDeleteOldResultImage}
            />

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
