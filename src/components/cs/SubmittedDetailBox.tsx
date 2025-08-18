'use client'

import { useEffect, useRef, useCallback } from 'react'
import { useCsProblemDetailQuery, useCsAnswerListQuery } from '@/api/cs'
import AnswerCard from './AnswerCard'

interface SubmittedDetailBoxProps {
  id: string
}

export default function SubmittedDetailBox({ id }: SubmittedDetailBoxProps) {
  const observerRef = useRef<HTMLDivElement>(null)

  const {
    data: problemDetail,
    isLoading: problemLoading,
    error: problemError,
  } = useCsProblemDetailQuery(Number(id))

  const {
    data: answerListData,
    isLoading: answerLoading,
    error: answerError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCsAnswerListQuery(Number(id), {
    size: 10,
    sortBy: 'UPDATE_AT_DESC',
  })

  // Intersection Observer를 사용한 무한 스크롤
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0]
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage()
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage],
  )

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0.1,
    })

    if (observerRef.current) {
      observer.observe(observerRef.current)
    }

    return () => observer.disconnect()
  }, [handleObserver])

  if (problemLoading) {
    return (
      <div className="max-w-[1200px] mx-auto mt-[3.56rem]">
        <h1 className="text-[2rem] font-bold mb-5"> CS 문제</h1>
        <div className="border border-gray bg-filterbg px-6 py-8 rounded-xl text-xl font-semibold mb-10">
          <p>문제를 불러오는 중...</p>
        </div>
      </div>
    )
  }

  if (problemError || !problemDetail) {
    return (
      <div className="max-w-[1200px] mx-auto mt-[3.56rem]">
        <h1 className="text-[2rem] font-bold mb-5">CS 문제</h1>
        <div className="border border-red-300 bg-red-50 px-6 py-8 rounded-xl text-xl font-semibold mb-10">
          <p>문제를 불러오는데 실패했습니다.</p>
        </div>
      </div>
    )
  }

  // 모든 답변을 하나의 배열로 합치기 (내 답변 + 다른 답변들)
  const allAnswers = answerListData?.pages.flatMap((page) => page.answers) || []
  const myAnswer = answerListData?.pages[0]?.myAnswer

  return (
    <div className="max-w-[1200px] mx-auto mt-[3.56rem]">
      <h1 className="text-[2rem] font-bold mb-5">CS 문제</h1>
      {/* <p className="text-primary text-lg mb-3">2025년 03월 28일</p> */}

      <div className="border border-gray bg-filterbg px-6 py-8 rounded-xl text-xl font-semibold mb-10">
        <p>{problemDetail.content}</p>
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-bold mb-4 text-primary">정답</h2>
        {problemDetail.solution ? (
          <div className="border border-primary px-6 py-8 rounded-xl">
            <p className="text-darkgray leading-relaxed">
              {problemDetail.solution}
            </p>
          </div>
        ) : (
          <div className="border border-primary px-6 py-8 rounded-xl">
            <p className="text-darkgray">아직 정답이 공개되지 않았습니다.</p>
          </div>
        )}
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">
          답변 {allAnswers.length + (myAnswer ? 1 : 0)}개
        </h2>

        {/* 내 답변을 상단에 고정 */}
        {myAnswer && <AnswerCard answer={myAnswer} isMyAnswer={true} />}

        {/* 다른 답변들 */}
        {allAnswers.map((answer) => (
          <AnswerCard key={answer.id} answer={answer} />
        ))}

        {/* 무한 스크롤을 위한 관찰 요소 */}
        {hasNextPage && (
          <div
            ref={observerRef}
            className="flex justify-center items-center py-4"
          >
            {isFetchingNextPage && <div>답변을 불러오는 중...</div>}
          </div>
        )}
      </div>
    </div>
  )
}
