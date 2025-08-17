'use client'

import { useState } from 'react'
import { FaRegThumbsUp, FaChevronDown } from 'react-icons/fa'
import { useCsProblemDetailQuery } from '@/api/cs'

interface SubmittedDetailBoxProps {
  id: string
}

const comments = [
  {
    id: 1,
    user: 'user1',
    date: '2025년 4월 13일 10:31',
    content:
      "먼저, staleTime은 데이터를 처음 가져온 후에 그 데이터를 '신선한' 상태로 간주하는 시간을 말합니다. staleTime 내에는 같은 쿼리에 대한 새로운 네트워크 요청이 일어나지 않고, 캐시 데이터를 그대로 사용하게 됩니다. 예를 들어, staleTime을 5분으로 설정하면, 데이터를 가져오고 나서 5분 동안은 이 데이터가 '신선하다'고 판단해서 refetch가 트리거되더라도 추가 요청 없이 캐시를 그대로 반환하게 됩니다.",
    likes: 12,
    replies: [
      {
        id: 11,
        user: 'user2',
        content: '캐시 데이터를 그대로 사용하는 것이 핵심이에요.',
      },
      { id: 12, user: 'user3', content: '좋은 설명 감사합니다!' },
    ],
  },
  {
    id: 2,
    user: 'user2',
    date: '2025년 4월 13일 10:31',
    content:
      "먼저, staleTime은 데이터를 처음 가져온 후에 그 데이터를 '신선한' 상태로 간주하는 시간을 말합니다. staleTime 내에는 같은 쿼리에 대한 새로운 네트워크 요청이 일어나지 않고, 캐시 데이터를 그대로 사용하게 됩니다. 예를 들어, staleTime을 5분으로 설정하면, 데이터를 가져오고 나서 5분 동안은 이 데이터가 '신선하다'고 판단해서 refetch가 트리거되더라도 추가 요청 없이 캐시를 그대로 반환하게 됩니다.",
    likes: 12,
    replies: [
      {
        id: 11,
        user: 'user1',
        content: '캐시 데이터를 그대로 사용하는 것이 핵심이에요.',
      },
      { id: 12, user: 'user3', content: '좋은 설명 감사합니다!' },
    ],
  },
]

export default function SubmittedDetailBox({ id }: SubmittedDetailBoxProps) {
  const { data: problemDetail } = useCsProblemDetailQuery(Number(id))

  return (
    <div className="max-w-[1200px] mx-auto mt-[3.56rem]">
      <h1 className="text-[2rem] font-bold mb-5">오늘의 CS</h1>
      {/* <p className="text-primary text-lg mb-3">2025년 03월 28일</p> */}

      <div className="border border-gray bg-filterbg px-6 py-8 rounded-xl text-xl font-semibold mb-10">
        <p>{problemDetail.content}</p>
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-bold mb-4">정답</h2>
        <p className="text-gray-700 leading-relaxed">
          {problemDetail.solution}
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">답변 {comments.length}개</h2>
        {comments.map((comment) => (
          <div key={comment.id} className="border-b border-gray py-6">
            <div className="flex items-start gap-3 mb-2">
              <img
                src="https://i.pravatar.cc/40?u=user"
                alt="avatar"
                className="rounded-full w-10 h-10"
              />
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <p className="font-semibold">{comment.user}</p>
                  <span className="text-xs text-gray-500">{comment.date}</span>
                </div>
                <p className="mt-2 text-gray-800 text-sm leading-relaxed whitespace-pre-wrap">
                  {comment.content}
                </p>
                <div className="flex gap-4 items-center text-sm text-gray-500 mt-2">
                  <button className="flex items-center gap-1 hover:text-black">
                    <FaRegThumbsUp className="text-sm" /> {comment.likes}
                  </button>
                  <span className="text-xs">
                    답글 {comment.replies.length}개
                  </span>
                </div>

                <div className="mt-4 ml-6 space-y-2">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="text-sm text-gray-700">
                      <span className="font-semibold mr-2">{reply.user}</span>
                      {reply.content}
                    </div>
                  ))}
                  <button className="text-xs text-gray-500 flex items-center gap-1 hover:text-black">
                    <FaChevronDown className="w-3 h-3" /> 답글 더보기
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
