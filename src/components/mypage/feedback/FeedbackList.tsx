import React, { useEffect } from 'react'
import { FeedbackResponse } from '@/api/feedback/types'

interface FeedbackListProps {
  feedbacks: FeedbackResponse[]
  modalOpen: (feedback: FeedbackResponse) => void
  mentor?: boolean
}

const FeedbackList = ({ feedbacks, modalOpen, mentor }: FeedbackListProps) => {
  return (
    <>
      {feedbacks?.length > 0 ? (
        feedbacks?.map((feedback) => (
          <div
            key={feedback.id}
            className="w-full min-h-[60px] border border-lightgray rounded-md flex items-center justify-between px-5 py-3 bg-gray-50"
          >
            <p className="text-sm">
              {feedback.type === 'RESUME' ? '이력서' : '원온원'}
            </p>
            <p className="font-bold text-sm">
              {mentor ? feedback.requester.name : feedback.recipient.name}
            </p>
            <p className="text-xs text-gray-500">
              {new Date(feedback.createdAt).toLocaleDateString()}
            </p>
            <div className="flex items-center gap-2">
              <span
                className={`text-xs font-bold w-20 text-center ${
                  feedback.status === 'APPROVED'
                    ? 'text-emerald-600'
                    : feedback.status === 'REJECTED'
                      ? 'text-red-600'
                      : 'text-yellow-600'
                }`}
              >
                {feedback.status}
              </span>
              <button
                onClick={() => modalOpen(feedback)}
                className="bg-primary p-1 px-3 rounded-xl text-sm text-white hover:bg-primary/90"
              >
                상세보기
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="m-auto mt-10 text-bold text-lightgray text-xl">
          피드백 요청이 없습니다.
        </div>
      )}
    </>
  )
}

export default FeedbackList
