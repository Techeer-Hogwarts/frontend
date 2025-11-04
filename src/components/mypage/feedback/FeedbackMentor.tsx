'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useReceivedFeedbacksQuery } from '@/api/feedback/queries'
import { useUpdateMentorGuidelinesMutation } from '@/api/feedback/mutations' // 추가
import { FeedbackResponse } from '@/api/feedback/types'
import FeedbackManageModal from './FeedbackManageModal'
import FeedbackList from './FeedbackList'
import Star from '../../../../public/star.svg'

const NoteModal = ({
  setOpenModal,
}: {
  setOpenModal: (isOpen: boolean) => void
}) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const [note, setNote] = useState('')
  const { mutate: updateGuidelines, isPending } =
    useUpdateMentorGuidelinesMutation()

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

  const handleSave = () => {
    updateGuidelines(
      { feedbackNotes: note },
      {
        onSuccess: () => {
          alert('유의사항이 저장되었습니다.')
          setOpenModal(false)
        },
        onError: (error) => {
          console.error('Error saving note:', error)
          alert('유의사항 저장에 실패했습니다.')
        },
      },
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div
        ref={modalRef}
        className="w-[600px] max-h-[90vh] border rounded-xl bg-white p-6 flex flex-col"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-center w-full">
            유의사항 작성
          </h2>
          <button
            onClick={() => setOpenModal(false)}
            className="text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>
        </div>
        <main className="flex-grow overflow-y-auto pr-4 space-y-10">
          <div className="mb-6">
            <p className="mb-2 font-bold text-lg">유의사항</p>
            <textarea
              className="w-full border border-gray rounded-lg p-3 h-48 bg-gray-50 resize-none focus:border-orange-500"
              placeholder="피드백 진행 시 유의사항을 입력해주세요."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              autoFocus
            />
          </div>
        </main>
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={() => setOpenModal(false)}
            className="px-6 py-2 border border-gray-400 rounded-lg hover:bg-gray-100"
            disabled={isPending}
          >
            취소
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:bg-gray-400"
            disabled={isPending}
          >
            {isPending ? '저장 중...' : '저장'}
          </button>
        </div>
      </div>
    </div>
  )
}

import FeedbackSkeleton from './FeedbackSkeleton'

const FeedbackMentor = () => {
  const [statusFilter, setStatusFilter] = useState<string | undefined>()
  const [selectedFeedback, setSelectedFeedback] =
    useState<FeedbackResponse | null>(null)
  const [isNoteModalOpen, setNoteModalOpen] = useState(false)

  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useReceivedFeedbacksQuery({
      status: statusFilter,
    })

  if (isLoading) {
    return <FeedbackSkeleton />
  }

  if (isError) {
    return <div>받은 피드백 요청 목록을 불러오는데 실패했습니다.</div>
  }

  const allFeedbacks = data?.pages.flatMap((page) => page.feedbacks) || []

  return (
    <>
      {selectedFeedback && (
        <FeedbackManageModal
          feedback={selectedFeedback}
          setOpenModal={() => setSelectedFeedback(null)}
        />
      )}
      {isNoteModalOpen && <NoteModal setOpenModal={setNoteModalOpen} />}
      <header className="flex justify-end items-center mb-3">
        <button
          className="w-[13rem] h-[3rem] text-center rounded-xl shadow-md justify-center text-[1.1rem] font-medium flex items-center hover:shadow-custom"
          onClick={() => setNoteModalOpen(true)}
        >
          <span>유의사항 작성하기</span>
          <Star />
        </button>
      </header>
      <section className="flex flex-col h-[75vh] p-5 bg-white shadow-md rounded-xl border border-lightgray">
        <div className="flex flex-col gap-3 overflow-y-auto">
          <FeedbackList
            feedbacks={allFeedbacks}
            modalOpen={setSelectedFeedback}
            mentor={true}
          />
          {hasNextPage && (
            <button
              onClick={() => fetchNextPage()}
              className="mt-4 p-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              더 보기
            </button>
          )}
        </div>
      </section>
    </>
  )
}

export default FeedbackMentor
