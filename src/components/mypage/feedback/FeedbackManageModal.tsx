'use client'

import React, { useEffect, useRef, useState } from 'react'
import { FeedbackResponse } from '@/api/feedback/types'
import {
  useApproveFeedbackMutation,
  useRejectFeedbackMutation,
} from '@/api/feedback'

interface FeedbackManageModalProps {
  feedback: FeedbackResponse
  setOpenModal: (isOpen: boolean) => void
}

const FeedbackManageModal: React.FC<FeedbackManageModalProps> = ({
  feedback,
  setOpenModal,
}) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const { mutate: approveFeedback } = useApproveFeedbackMutation()
  const { mutate: rejectFeedback } = useRejectFeedbackMutation()

  const [view, setView] = useState<'main' | 'rejecting'>('main')
  const [rejectionReason, setRejectionReason] = useState('')
  const [selectedTimeChoice, setSelectedTimeChoice] = useState<
    1 | 2 | 3 | null
  >(null)

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

  const handleApprove = () => {
    if (selectedTimeChoice === null) {
      alert('수락할 시간을 선택해주세요.')
      return
    }
    approveFeedback(
      { feedbackId: feedback.id, data: { timeChoice: selectedTimeChoice } },
      {
        onSuccess: () => {
          alert('피드백 요청을 수락했습니다.')
          setOpenModal(false)
        },
      },
    )
  }

  const handleReject = () => {
    if (!rejectionReason.trim()) {
      alert('반려 사유를 입력해주세요.')
      return
    }
    rejectFeedback(
      { feedbackId: feedback.id, data: { rejectionReason } },
      {
        onSuccess: () => {
          alert('피드백 요청을 거절했습니다.')
          setOpenModal(false)
        },
      },
    )
  }

  const formatDateTime = (dateTime: string | undefined) => {
    if (!dateTime) return ''
    return new Date(dateTime).toLocaleString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    })
  }

  const timeSlots = [
    { id: 1, time: feedback.firstPreferredTime },
    { id: 2, time: feedback.secondPreferredTime },
    { id: 3, time: feedback.thirdPreferredTime },
  ].filter((slot) => slot.time)

  const renderMainView = () => (
    <>
      <main className="flex-grow overflow-y-auto pr-4 space-y-10">
        <div className="mb-6">
          <p className="mb-2 font-bold text-lg">피드백 유형</p>
          <div className="flex gap-6">
            <button
              className={`flex-1 px-4 py-2 rounded-lg border ${
                feedback.type === 'RESUME'
                  ? 'border-orange-500 bg-orange-100 text-orange-500'
                  : 'border border-gray bg-white text-gray-500'
              }`}
              disabled
            >
              이력서
            </button>
            <button
              className={`flex-1 px-4 py-2 rounded-lg border ${
                feedback.type === 'ONEONONE'
                  ? 'border-orange-500 bg-orange-100 text-orange-500'
                  : 'border border-gray bg-white text-gray-500'
              }`}
              disabled
            >
              원온원
            </button>
          </div>
        </div>
        <div className="mb-6">
          <p className="mb-2 font-bold text-lg">지원동기</p>
          <textarea
            name="applicationReason"
            className="w-full border border-gray rounded-lg p-3 h-36 bg-gray-50 resize-none"
            value={feedback.applicationReason}
            disabled
          />
        </div>
        {feedback.status === 'PENDING' && (
          <div className="mb-6">
            <p className="mb-2 font-bold text-lg">수락할 시간 선택</p>
            <div className="space-y-5">
              {timeSlots.map((slot) => (
                <div className="space-y-2" key={slot.id}>
                  <p className=" text-darkPrimary">{slot.id}지망 시간</p>
                  <button
                    onClick={() => setSelectedTimeChoice(slot.id as 1 | 2 | 3)}
                    className={`w-full text-left border rounded-lg p-3 transition-colors ${
                      selectedTimeChoice === slot.id
                        ? 'bg-orange-100 border-orange-500 text-orange-500'
                        : 'bg-gray-50 border-gray hover:bg-gray-100'
                    }`}
                  >
                    {formatDateTime(slot.time)}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
      <div className="flex justify-between items-center mt-6">
        <div>
          {feedback.status === 'PENDING' && (
            <button
              onClick={() => setView('rejecting')}
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              거절
            </button>
          )}
        </div>
        <div className="flex gap-3">
          {feedback.status === 'PENDING' ? (
            <>
              <button
                onClick={() => setOpenModal(false)}
                className="px-6 py-2 border border-gray-400 rounded-lg hover:bg-gray-100"
              >
                닫기
              </button>
              <button
                onClick={handleApprove}
                className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
              >
                수락
              </button>
            </>
          ) : (
            <button
              onClick={() => setOpenModal(false)}
              className="px-6 py-2 border border-gray-400 rounded-lg hover:bg-gray-100"
            >
              닫기
            </button>
          )}
        </div>
      </div>
    </>
  )

  const renderRejectingView = () => (
    <>
      <main className="flex-grow overflow-y-auto pr-4 space-y-10">
        <div className="mb-6">
          <p className="mb-2 font-bold text-lg">반려 사유</p>
          <textarea
            className="w-full border border-gray rounded-lg p-3 h-48 bg-gray-50 resize-none focus:border-orange-500"
            placeholder="반려 사유를 입력해주세요."
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            autoFocus
          />
        </div>
      </main>
      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={() => setView('main')}
          className="px-6 py-2 border border-gray-400 rounded-lg hover:bg-gray-100"
        >
          취소
        </button>
        <button
          onClick={handleReject}
          className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
        >
          확인
        </button>
      </div>
    </>
  )

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div
        ref={modalRef}
        className="w-[600px] max-h-[90vh] border rounded-xl bg-white p-6 flex flex-col"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-center w-full">
            {view === 'main' ? '피드백 요청 관리' : '피드백 거절'}
          </h2>
          <button
            onClick={() => setOpenModal(false)}
            className="text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>
        </div>
        {view === 'main' ? renderMainView() : renderRejectingView()}
      </div>
    </div>
  )
}

export default FeedbackManageModal
