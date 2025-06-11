import AddMember from '@/components/project/add/AddMember'
import AddProfile from '@/components/project/add/AddProfile'
import AddRecruit from '@/components/project/add/AddRecruit'
import AddResults from '@/components/project/add/AddResults'
import AddStack from '@/components/project/add/project/AddStack'
import NecessaryQuestions from '@/components/project/add/NecessaryQuestions'

import { useAddProject } from '@/hooks/project/useAddProject'

export default function AddProjectClient() {
  const { projectData, isSubmitting, handleUpdate, submitProject } =
    useAddProject()

  return (
    <div className="relative flex justify-between mt-[2.75rem] gap-[3.188rem]">
      <div>
        <AddProfile
          variant="project"
          projectData={projectData}
          onUpdate={handleUpdate}
        />
      </div>
      <div className="flex flex-col gap-7">
        <AddMember
          members={projectData.projectMember}
          type="project"
          onUpdateMember={(newMembers) =>
            handleUpdate('projectMember', newMembers)
          }
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
          onUpdateStacks={(teamStacks) =>
            handleUpdate('teamStacks', teamStacks)
          }
        />
        <AddResults
          newResultImages={projectData.resultImages}
          onUpdateResultImages={(files) => handleUpdate('resultImages', files)}
        />
        <button
          type="button"
          onClick={submitProject}
          disabled={isSubmitting}
          className={`w-full h-[2.16044rem] rounded-[0.3125rem] text-primary border border-primary ${
            isSubmitting
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-primary hover:text-white'
          }`}
        >
          {isSubmitting ? '등록 중...' : '등록하기'}
        </button>
      </div>
    </div>
  )
}
