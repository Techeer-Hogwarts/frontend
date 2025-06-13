'use client'

import AddMember from '@/components/project/add/AddMember'
import AddProfile from '@/components/project/add/AddProfile'
import AddResults from '@/components/project/add/AddResults'
import NecessaryQuestions from '@/components/project/add/NecessaryQuestions'
import AddGoal from '@/components/project/add/study/AddGoal'
import AddPlan from '@/components/project/add/study/AddPlan'
import AddRecruit from '@/components/project/add/AddRecruit'
import Loading from '@/components/common/Loading'

import { useEditStudy } from '@/hooks/project/useEditStudy'

interface EditStudyClientProps {
  studyId: number
}

export default function EditStudyClient({ studyId }: EditStudyClientProps) {
  const {
    // 데이터
    studyDetails,
    studyData,
    isLoading,
    isSubmitting,

    // 핸들러들
    handleUpdate,
    handleDeleteOldResultImage,
    handleDeleteMember,
    handleRestoreMember,
    submitEditStudy,
  } = useEditStudy(studyId)

  if (isLoading) return <Loading />

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
              onDeleteMember={handleDeleteMember}
              onRestoreMember={handleRestoreMember}
            />

            <AddGoal goal={studyData.goal} onUpdate={handleUpdate} />

            <AddPlan rule={studyData.rule} onUpdate={handleUpdate} />

            <NecessaryQuestions
              variant="study"
              isFinished={studyData.isFinished}
              onUpdate={handleUpdate}
            />

            <AddRecruit
              variant="study"
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
              onClick={submitEditStudy}
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
        </>
      )}
    </div>
  )
}
