'use client'

import Profile from '@/components/project/detail/Profile'
import Member from '@/components/project/detail/Member'
import FindMember from '@/components/project/detail/FindMember'
import StudyGoal from '@/components/project/detail/study/StudyGoal'
import StudyPlan from '@/components/project/detail/study/StudyPlan'
import Results from '@/components/project/detail/Results'
import BaseModal from '@/components/project/modal/BaseModal'
import Applicants from '@/components/project/detail/Applicants'
import ApplicantModal from '@/components/project/modal/ApplicantModal'
import AuthModal from '@/components/common/AuthModal'
import ProjectDetailSkeleton from '@/components/project/detail/ProjectDetailSkeleton'

import { BiSolidPencil } from 'react-icons/bi'
import Link from 'next/link'
import { useStudyDetail } from '@/hooks/project/useStudyDetail'

interface StudyDetailClientProps {
  studyId: number
}

export default function StudyDetailClient({ studyId }: StudyDetailClientProps) {
  const {
    // 데이터
    studyDetails,
    studyApplicants,
    isStudyLoading,

    // 계산된 값들
    isStudyMember,
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
    handleApplyStudy,
    handleEdit,
    openModal,
    closeModal,
    handleModalConfirm,
  } = useStudyDetail(studyId)

  // 로딩 중
  if (isStudyLoading || !studyDetails) {
    return <ProjectDetailSkeleton />
  }

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
          variant="study"
          applicant={selectedApplicant}
          onClose={handleApplicantModalClose}
        />
      )}

      {/* 편집하기 & 삭제하기 버튼: 스터디 멤버일 경우만 */}
      {isStudyMember && (
        <div className="flex items-center justify-center absolute top-[-1rem] right-0 gap-2">
          <Link
            href={`/project/detail/study/edit/${studyId}`}
            className="flex justify-center items-center gap-2 text-primary font-semibold border border-primary rounded-xl w-[8.375rem] h-[2.125rem]"
          >
            <BiSolidPencil size={14} color="#FE9142" />
            편집하기
          </Link>
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
        <Profile variant="study" projectDetail={studyDetails} />

        {/* 스터디 멤버일 경우 지원자 목록 표시 */}
        {isStudyMember && studyDetails.recruited && (
          <Applicants
            variant="study"
            applicants={studyApplicants || []}
            onOpen={handleApplicantModalOpen}
          />
        )}
      </div>

      {/* 오른쪽 영역 */}
      <div className="flex flex-col gap-7">
        <Member variant="study" members={studyDetails?.studyMember} />
        <StudyGoal goal={studyDetails?.goal} />
        <StudyPlan rule={studyDetails?.rule} />

        {studyDetails?.recruited && (
          <FindMember variant="study" projectDetail={studyDetails} />
        )}

        <Results
          resultImages={
            studyDetails?.resultImages.map((img) => img.imageUrl) || []
          }
        />

        {/* 모집 중인 경우 지원/취소 버튼 */}
        {studyDetails?.recruited && (
          <>
            {isApplicant ? (
              <button
                onClick={() => openModal('cancel')}
                className="w-full h-[2.16044rem] border border-primary text-primary rounded-md hover:shadow-md hover:bg-primary hover:text-white transition-all"
              >
                지원 취소하기
              </button>
            ) : (
              !isStudyMember && (
                <button
                  onClick={handleApplyStudy}
                  className="w-full h-[2.16044rem] border border-primary text-primary rounded-md hover:shadow-md hover:bg-primary hover:text-white transition-all"
                >
                  지원하기
                </button>
              )
            )}
          </>
        )}

        {/* 스터디 멤버이면서 모집 중인 경우 마감 버튼 */}
        {studyDetails?.recruited && isStudyMember && (
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
