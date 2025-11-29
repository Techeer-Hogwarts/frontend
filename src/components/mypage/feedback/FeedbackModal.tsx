'use client'

import React, { useState, useEffect, useRef, useMemo } from 'react'
import { useCreateFeedbackRequestMutation } from '@/api/feedback'
import { useQuery } from '@tanstack/react-query'
import { getMentorGuidelines } from '@/api/feedback/apis'
import { MentorInfo } from '@/api/feedback/types'

interface FeedbackModalProps {
  setOpenModal: (isOpen: boolean) => void
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ setOpenModal }) => {
  const [isMentorSearchOpen, setMentorSearchOpen] = useState(false)
  const [selectedMentor, setSelectedMentor] = useState<MentorInfo | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const [feedbackType, setFeedbackType] = useState<'RESUME' | 'ONEONONE'>(
    'RESUME',
  )
  const [selectedTimes, setSelectedTimes] = useState<string[]>(['', '', ''])
  const [motivation, setMotivation] = useState('')
  const modalRef = useRef<HTMLDivElement>(null)
  const { mutate } = useCreateFeedbackRequestMutation()

  const {
    data: mentorData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['mentorGuidelines'],
    queryFn: getMentorGuidelines,
  })

  const filteredMentors = useMemo(() => {
    if (!mentorData) return []
    return mentorData.mentors.filter((mentor) =>
      mentor.name.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [mentorData, searchTerm])

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

  const handleTimeChange = (index: number, value: string) => {
    setSelectedTimes((prev) => {
      const newTimes = [...prev]
      newTimes[index] = value
      return newTimes
    })
  }

  const handleSelectMentor = (mentor: MentorInfo) => {
    setSelectedMentor(mentor)
    setMentorSearchOpen(false)
  }

  const handleSubmit = () => {
    if (!selectedMentor) {
      alert('멘토를 선택해주세요.')
      return
    }
    if (!feedbackType) {
      alert('피드백 유형을 선택해주세요.')
      return
    }

    const data = {
      recipientId: selectedMentor.id,
      type: feedbackType,
      firstPreferredTime: selectedTimes[0] || '',
      secondPreferredTime: selectedTimes[1] || '',
      thirdPreferredTime: selectedTimes[2] || '',
      applicationReason: motivation,
    }
    mutate(data, {
      onSuccess: () => {
        alert('피드백 신청이 완료되었습니다.')
        setOpenModal(false)
      },
      onError: () => {
        alert('피드백 신청에 실패했습니다. 다시 시도해주세요.')
      },
    })
  }

  const renderMentorSearch = () => (
    <div className="absolute inset-0 bg-white p-6 flex flex-col rounded-xl">
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-lightgray">
        <h2 className="text-xl font-semibold">멘토 선택</h2>
        <button
          onClick={() => setMentorSearchOpen(false)}
          className="text-gray-500 hover:text-gray-800"
        >
          <img src="/XIcon.svg" alt="close" className="w-6 h-6" />
        </button>
      </div>
      <div className="mb-4 relative">
        <input
          type="text"
          placeholder="멘토 이름으로 검색"
          className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:border-primary border-lightgray"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <svg
          className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </div>
      <div className="flex-grow overflow-y-auto pr-2 h-[50vh]">
        {isLoading && (
          <p className="text-center text-gray">멘토 목록을 불러오는 중...</p>
        )}
        {isError && (
          <p className="text-center text-red-500">오류가 발생했습니다.</p>
        )}
        {filteredMentors.length > 0 ? (
          <ul className="space-y-4">
            {filteredMentors.map((mentor) => (
              <li
                key={mentor.id}
                className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                  selectedMentor?.id === mentor.id
                    ? 'border-primary shadow-lg'
                    : 'border-lightgray hover:shadow-md hover:border-primary'
                }`}
                onClick={() => handleSelectMentor(mentor)}
              >
                <div className="flex justify-between items-center">
                  <p className="font-bold text-lg text-darkgray">
                    {mentor.name}
                  </p>
                  <div className="text-right">
                    <p className="text-md text-gray-600">
                      {mentor.mainPosition}
                    </p>
                    <p className="text-xs text-gray">{mentor.subPosition}</p>
                  </div>
                </div>
                <p className="mt-2 hover text-darkgray">
                  {mentor.feedbackNotes}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray">검색 결과가 없습니다.</p>
        )}
      </div>
    </div>
  )

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div
        ref={modalRef}
        className="w-[700px] max-h-[90vh] border border-lightgray rounded-xl bg-white p-6 flex flex-col relative"
      >
        {isMentorSearchOpen && renderMentorSearch()}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-center w-full">
            피드백 신청하기
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
            <p className="mb-2 font-bold text-lg">멘토 선택</p>
            <button
              onClick={() => setMentorSearchOpen(true)}
              className="w-full px-4 py-2 rounded-lg border border-gray bg-white text-gray-700 hover:bg-lightprimary mb-4"
            >
              멘토 선택하기
            </button>
            {selectedMentor && (
              <div className="p-4 border rounded-lg bg-gray-50">
                <div className="flex justify-between items-center">
                  <p className="font-bold text-lg">{selectedMentor.name}</p>
                  <p className="text-sm text-gray-600">
                    {selectedMentor.mainPosition}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="mb-6">
            <p className="mb-2 font-bold text-lg">원하는 피드백의 유형</p>
            <div className="flex gap-6">
              <button
                onClick={() => setFeedbackType('RESUME')}
                className={`flex-1 px-4 py-2 rounded-lg border ${
                  feedbackType === 'RESUME'
                    ? 'border-primary bg-lightprimary text-primary'
                    : 'border border-gray bg-white text-gray-500'
                }`}
              >
                이력서
              </button>
              <button
                onClick={() => setFeedbackType('ONEONONE')}
                className={`flex-1 px-4 py-2 rounded-lg border ${
                  feedbackType === 'ONEONONE'
                    ? 'border-primary bg-lightprimary text-primary'
                    : 'border border-gray bg-white text-gray-500'
                }`}
              >
                원온원
              </button>
            </div>
          </div>
          <div className="mb-6">
            <p className="mb-2 font-bold text-lg">
              원하는 시간대{' '}
              <span className="text-gray text-xs font-medium">
                가능한 시간대를 입력해주세요.
              </span>
            </p>
            <div className="space-y-5">
              {[0, 1, 2].map((index) => (
                <div key={index} className="space-y-2">
                  <p className=" text-darkPrimary">{index + 1}지망 시간</p>
                  <input
                    key={index}
                    type="datetime-local"
                    value={selectedTimes[index] || ''}
                    onChange={(e) => handleTimeChange(index, e.target.value)}
                    className="w-full border rounded-lg p-3 bg-gray-50 border-gray focus:border-primary"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="mb-6">
            <p className="mb-2 font-bold text-lg">지원동기</p>
            <textarea
              value={motivation}
              onChange={(e) => setMotivation(e.target.value)}
              className="w-full border border-gray rounded-lg p-3 h-36 bg-gray-50 resize-none focus:border-primary"
              placeholder=""
            />
          </div>
        </main>
        <div className="flex justify-start gap-3 mt-6">
          <button
            onClick={() => setOpenModal(false)}
            className="px-6 py-2 border border-gray rounded-lg hover:bg-gray-100 w-[50%]"
          >
            다음에 신청하기
          </button>
          <button
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-darkPrimary w-[50%] disabled:bg-gray-300"
            onClick={handleSubmit}
          >
            신청하기
          </button>
        </div>
      </div>
    </div>
  )
}

export default FeedbackModal
