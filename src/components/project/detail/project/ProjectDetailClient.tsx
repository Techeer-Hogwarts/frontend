'use client'

import Profile from '@/components/project/detail/Profile'
import Member from '@/components/project/detail/Member'
import Stack from '@/components/project/detail/Stack'
import FindMember from '@/components/project/detail/FindMember'
import Results from '@/components/project/detail/Results'
import Applicants from '@/components/project/detail/Applicants'
import AuthModal from '@/components/common/AuthModal'
import BaseModal from '@/components/project/modal/BaseModal'
import ApplicantModal from '@/components/project/modal/ApplicantModal'
import ProjectDetailSkeleton from '@/components/project/detail/ProjectDetailSkeleton'

import { BiSolidPencil } from 'react-icons/bi'
import { useProjectDetail } from '@/hooks/project/useProjectDetail'

interface ProjectDetailClientProps {
  projectId: number
}

export default function ProjectDetailClient({
  projectId,
}: ProjectDetailClientProps) {
  const {
    // 데이터
    projectDetails,
    projectApplicants,
    isProjectLoading,

    // 계산된 값들
    isTeamMember,
    isApplicant,

    // 모달 상태들
    authModalOpen,
    setAuthModalOpen,
    isModalOpen,
    modalType,
    isApplicantModalOpen,
    selectedApplicant,

    // 모달 텍스트
    MODAL_TEXT_MAP,
    MODAL_BTN_TEXT_MAP,

    // 핸들러들
    handleApplicantModalOpen,
    handleApplicantModalClose,
    handleApplyProject,
    handleEdit,
    openModal,
    closeModal,
    handleModalConfirm,
  } = useProjectDetail(projectId)

  // 로딩 중
  if (isProjectLoading || !projectDetails) {
    return <ProjectDetailSkeleton />
  }

  const { recruited } = projectDetails

  return (
    <div className="relative flex justify-between mt-[2.75rem] gap-[3.313rem]">
      {/* 모달들 */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />

      {isModalOpen && modalType && (
        <BaseModal
          text={MODAL_TEXT_MAP[modalType]}
          btn={MODAL_BTN_TEXT_MAP[modalType]}
          onClose={closeModal}
          onClick={handleModalConfirm}
        />
      )}

      {isApplicantModalOpen && selectedApplicant && (
        <ApplicantModal
          variant="project"
          applicant={selectedApplicant}
          onClose={handleApplicantModalClose}
        />
      )}

      {/* 팀원이라면 편집/삭제 버튼 */}
      {isTeamMember && (
        <div className="flex items-center justify-center absolute top-[-1rem] right-0 gap-2">
          <button
            onClick={handleEdit}
            className="flex justify-center items-center gap-2 text-primary font-semibold border border-primary rounded-xl w-[8.375rem] h-[2.125rem]"
          >
            <BiSolidPencil size={14} color="#FE9142" />
            편집하기
          </button>
          <button
            onClick={() => openModal('delete')}
            className="flex justify-center items-center gap-2 text-primary font-semibold border border-primary rounded-xl w-[8.375rem] h-[2.125rem]"
          >
            <BiSolidPencil size={14} color="#FE9142" />
            삭제하기
          </button>
        </div>
      )}

      {/* 왼쪽 영역 */}
      <div>
        <Profile variant="project" projectDetail={projectDetails} />

        {/* 팀원 + isRecruited → 지원자 목록 */}
        {isTeamMember && recruited && (
          <Applicants
            variant="project"
            applicants={projectApplicants || []}
            onOpen={handleApplicantModalOpen}
          />
        )}
      </div>

      {/* 오른쪽 영역 */}
      <div className="flex flex-col gap-7">
        <Member variant="project" members={projectDetails?.projectMember} />
        <Stack stacks={projectDetails?.teamStacks} />

        {recruited && (
          <FindMember variant="project" projectDetail={projectDetails} />
        )}

        <Results
          resultImages={
            projectDetails?.resultImages.map((img) => img.imageUrl) || []
          }
        />

        {/* 팀원이 아니고 모집 중인 경우 */}
        {!isTeamMember && recruited && (
          <>
            {isApplicant ? (
              <button
                onClick={() => openModal('cancel')}
                className="w-full h-[2.16044rem] border border-primary text-primary rounded-md hover:shadow-md hover:bg-primary hover:text-white transition-all"
              >
                지원 취소하기
              </button>
            ) : (
              <button
                onClick={handleApplyProject}
                className="w-full h-[2.16044rem] border border-primary text-primary rounded-md hover:shadow-md hover:bg-primary hover:text-white transition-all"
              >
                지원하기
              </button>
            )}
          </>
        )}

        {/* 팀원이면서 모집 중인 경우 */}
        {isTeamMember && recruited && (
          <button
            onClick={() => openModal('close')}
            className="w-full h-[2.16044rem] border border-primary text-primary rounded-md hover:shadow-md hover:bg-primary hover:text-white transition-all"
          >
            마감하기
          </button>
        )}
      </div>
    </div>
  )
}
