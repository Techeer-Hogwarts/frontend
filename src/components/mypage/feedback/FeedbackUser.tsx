'use client'

import React, { useState } from 'react'
import Star from '../../../../public/star.svg'
import FeedbackModal from './FeedbackModal'
import { useMyFeedbackRequestsQuery } from '@/api/feedback/queries'
import { FeedbackListResponse } from '@/api/feedback/types'
import FeedbackDetailModal from './FeedbackDetailModal'
import FeedbackList from './FeedbackList'
import { FeedbackResponse } from '@/api/feedback/types'
import FeedbackSkeleton from './FeedbackSkeleton'

const FeedbackUser = () => {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false)
  const [selectedFeedback, setSelectedFeedback] =
    useState<FeedbackResponse | null>(null)

  const { data, isLoading, isError } = useMyFeedbackRequestsQuery()

  if (isLoading) {
    return <FeedbackSkeleton />
  }

  if (isError) {
    return <div>피드백 요청 목록을 불러오는데 실패했습니다.</div>
  }

  return (
    <>
      {isCreateModalOpen && <FeedbackModal setOpenModal={setCreateModalOpen} />}
      {selectedFeedback && (
        <FeedbackDetailModal
          feedback={selectedFeedback}
          setOpenModal={() => setSelectedFeedback(null)}
        />
      )}
      <header className="flex justify-end items-center mb-3">
        <button
          className="w-[13rem] h-[3rem] text-center rounded-xl shadow-md justify-center text-[1.1rem] font-medium flex items-center hover:shadow-custom"
          onClick={() => setCreateModalOpen(true)}
        >
          <span>피드백 신청하기</span>
          <Star />
        </button>
      </header>
      <section className="flex flex-col h-[75vh] p-5 bg-white shadow-md rounded-xl border border-lightgray">
        <div className="flex flex-col gap-3 overflow-y-auto">
          <FeedbackList
            feedbacks={data?.feedbacks}
            modalOpen={setSelectedFeedback}
          />
        </div>
      </section>
    </>
  )
}

export default FeedbackUser
