'use client'

import AddProfile from '@/components/project/add/AddProfile'
import AddMember from '@/components/project/add/AddMember'
import AddRecruit from '@/components/project/add/AddRecruit'
import AddStack from '@/components/project/add/project/AddStack'
import AddResults from '@/components/project/add/AddResults'
import NecessaryQuestions from '@/components/project/add/NecessaryQuestions'
import Loading from '@/components/common/Loading'

import { useEditProject } from '@/hooks/project/useEditProject'

interface EditProjectClientProps {
  projectId: number
}

export default function EditProjectClient({
  projectId,
}: EditProjectClientProps) {
  const {
    // 데이터
    projectDetails,
    projectData,
    isLoading,
    isSubmitting,

    // 핸들러들
    handleUpdate,
    handleDeleteOldMainImage,
    handleDeleteOldResultImage,
    handleDeleteMember,
    handleRestoreMember,
    submitEditProject,
  } = useEditProject(projectId)

  if (isLoading) return <Loading />

  return (
    <div className="relative flex justify-between mt-[2.75rem] gap-[3.188rem]">
      <div>
        <AddProfile
          variant="project"
          projectData={projectData}
          onUpdate={handleUpdate}
          // 기존 메인이미지 URL, ID
          existingMainImageUrl={projectDetails?.mainImages?.[0]?.imageUrl || ''}
          existingMainImageId={projectDetails?.mainImages?.[0]?.id || null}
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
          onDeleteMember={handleDeleteMember}
          onRestoreMember={handleRestoreMember}
        />

        <NecessaryQuestions
          variant="project"
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
          onClick={submitEditProject}
          disabled={isSubmitting}
          className={`w-full h-[2.16044rem] rounded-[0.3125rem] text-primary border border-primary transition-all duration-200 ${
            isSubmitting
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-primary hover:text-white'
          }`}
        >
          {isSubmitting ? '수정 중...' : '수정하기'}
        </button>
      </div>
    </div>
  )
}
