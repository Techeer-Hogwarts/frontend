'use client'

import React, { useEffect, useRef, useState } from 'react'
import {
  useUpdateFeedbackMutation,
  useDeleteFeedbackMutation,
} from '@/api/feedback/queries'
import { FeedbackResponse, UpdateFeedbackRequest } from '@/api/feedback/types'

interface FeedbackDetailModalProps {
  feedback: FeedbackResponse
  setOpenModal: (isOpen: boolean) => void
}

const FeedbackDetailModal: React.FC<FeedbackDetailModalProps> = ({
  feedback,
  setOpenModal,
}) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const { mutate: updateFeedback } = useUpdateFeedbackMutation(feedback.id)
  const { mutate: deleteFeedback } = useDeleteFeedbackMutation(feedback.id)

  const [isEditMode, setIsEditMode] = useState(false)
  const [formData, setFormData] = useState<UpdateFeedbackRequest | null>(null)

  useEffect(() => {
    if (feedback) {
      setFormData({
        type: feedback.type,
        applicationReason: feedback.applicationReason,
        firstPreferredTime: feedback.firstPreferredTime,
        secondPreferredTime: feedback.secondPreferredTime,
        thirdPreferredTime: feedback.thirdPreferredTime,
      })
    }
  }, [feedback])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setOpenModal(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.body.style.overflow = 'auto'
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [setOpenModal])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (!formData) return
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleTypeChange = (type: 'RESUME' | 'ONEONONE') => {
    if (!formData) return
    setFormData({ ...formData, type })
  }

  const handleSave = () => {
    if (formData) {
      updateFeedback(formData, {
        onSuccess: () => {
          setIsEditMode(false)
        },
      })
    }
  }

  const handleCancel = () => {
    if (feedback) {
      setFormData({
        type: feedback.type,
        applicationReason: feedback.applicationReason,
        firstPreferredTime: feedback.firstPreferredTime,
        secondPreferredTime: feedback.secondPreferredTime,
        thirdPreferredTime: feedback.thirdPreferredTime,
      })
    }
    setIsEditMode(false)
  }

  const handleDelete = () => {
    if (window.confirm('정말로 이 피드백 요청을 삭제하시겠습니까?')) {
      deleteFeedback(undefined, {
        onSuccess: () => {
          setOpenModal(false)
        },
      })
    }
  }

  const formatDateTime = (dateTime: string | undefined) => {
    if (!dateTime) return ''
    return new Date(dateTime).toISOString().slice(0, 16)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div
        ref={modalRef}
        className="w-[600px] max-h-[90vh] border border-lightgray rounded-xl bg-white p-6 flex flex-col"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-center w-full">
            피드백 요청 상세
          </h2>
          <button
            onClick={() => setOpenModal(false)}
            className="text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>
        </div>

        {formData && (
          <>
            <main className="flex-grow overflow-y-auto pr-4 space-y-10">
              {feedback.status === 'APPROVED' && (
                <div className="mb-6 p-4 bg-lightgreen border border-emerald-600 text-emerald-600 rounded-lg">
                  <p className="font-bold">수락된 요청입니다.</p>
                </div>
              )}
              {feedback.status === 'REJECTED' && (
                <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                  <p className="font-bold">거절된 요청입니다.</p>
                  {feedback.rejectionReason && (
                    <p>거절 사유: {feedback.rejectionReason}</p>
                  )}
                </div>
              )}
              <div className="mb-6">
                <p className="mb-2 font-bold text-lg">피드백 유형</p>
                <div className="flex gap-6">
                  <button
                    onClick={() => handleTypeChange('RESUME')}
                    className={`flex-1 px-4 py-2 rounded-lg border ${
                      formData.type === 'RESUME'
                        ? 'border-orange-500 bg-orange-100 text-orange-500'
                        : 'border border-gray bg-white text-gray-500'
                    }`}
                    disabled={!isEditMode}
                  >
                    이력서
                  </button>
                  <button
                    onClick={() => handleTypeChange('ONEONONE')}
                    className={`flex-1 px-4 py-2 rounded-lg border ${
                      formData.type === 'ONEONONE'
                        ? 'border-orange-500 bg-orange-100 text-orange-500'
                        : 'border border-gray bg-white text-gray-500'
                    }`}
                    disabled={!isEditMode}
                  >
                    원온원
                  </button>
                </div>
              </div>
              {feedback.status === 'APPROVED' ? (
                <div className="mb-6">
                  <p className="mb-2 font-bold text-lg">확정된 시간</p>
                  <div className="w-full text-left border rounded-lg p-3 transition-colors bg-orange-100 border-orange-500 text-orange-500">
                    {new Date(feedback.confirmedTime || '').toLocaleString(
                      'ko-KR',
                      {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true,
                      },
                    )}
                  </div>
                </div>
              ) : (
                <div className="mb-6">
                  <p className="mb-2 font-bold text-lg">
                    원하는 시간대{' '}
                    <span className="text-gray text-xs font-medium">
                      가능한 시간대를 입력해주세요.
                    </span>
                  </p>
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <p className=" text-darkPrimary">1지망 시간</p>
                      <input
                        type="datetime-local"
                        name="firstPreferredTime"
                        className="w-full border rounded-lg p-3 bg-gray-50 border-gray focus:border-orange-500"
                        value={formatDateTime(formData.firstPreferredTime)}
                        onChange={handleInputChange}
                        disabled={!isEditMode}
                      />
                    </div>
                    <div className="space-y-2">
                      <p className=" text-darkPrimary">2지망 시간</p>
                      <input
                        type="datetime-local"
                        name="secondPreferredTime"
                        className="w-full border rounded-lg p-3 bg-gray-50 border-gray focus:border-orange-500"
                        value={formatDateTime(formData.secondPreferredTime)}
                        onChange={handleInputChange}
                        disabled={!isEditMode}
                      />
                    </div>
                    <div className="space-y-2">
                      <p className=" text-darkPrimary">3지망 시간</p>
                      <input
                        type="datetime-local"
                        name="thirdPreferredTime"
                        className="w-full border rounded-lg p-3 bg-gray-50 border-gray focus:border-orange-500"
                        value={formatDateTime(formData.thirdPreferredTime)}
                        onChange={handleInputChange}
                        disabled={!isEditMode}
                      />
                    </div>
                  </div>
                </div>
              )}
              <div className="mb-6">
                <p className="mb-2 font-bold text-lg">지원동기</p>
                <textarea
                  name="applicationReason"
                  className="w-full border border-gray rounded-lg p-3 h-36 bg-gray-50 resize-none"
                  value={formData.applicationReason}
                  onChange={handleInputChange}
                  disabled={!isEditMode}
                />
              </div>
            </main>
            <div className="flex justify-between items-center mt-6">
              <div>
                {feedback.status === 'PENDING' && !isEditMode && (
                  <button
                    onClick={handleDelete}
                    className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    삭제
                  </button>
                )}
              </div>
              <div className="flex gap-3">
                {isEditMode ? (
                  <>
                    <button
                      onClick={handleCancel}
                      className="px-6 py-2 border border-gray-400 rounded-lg hover:bg-gray-100"
                    >
                      취소
                    </button>
                    <button
                      onClick={handleSave}
                      className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                    >
                      저장
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setOpenModal(false)}
                      className="px-6 py-2 border border-gray-400 rounded-lg hover:bg-gray-100"
                    >
                      닫기
                    </button>
                    {feedback.status === 'PENDING' && (
                      <button
                        onClick={() => setIsEditMode(true)}
                        className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                      >
                        수정
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default FeedbackDetailModal
