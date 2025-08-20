'use client'

import AnswerCard from './AnswerCard'
import { useSubmittedDetailBox } from '@/hooks/cs/useSubmittedDetailBox'
import { useInfiniteScroll } from '@/hooks/cs/useInfiniteScroll'

interface SubmittedDetailBoxProps {
  id: string
}

export default function SubmittedDetailBox({ id }: SubmittedDetailBoxProps) {
  const {
    problemDetail,
    problemLoading,
    problemError,
    allAnswers,
    myAnswer,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSubmittedDetailBox({ id })

  const { ref } = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  })

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

      <div className="mb-10">
        <h2 className="text-xl font-bold mb-4">답변</h2>
        {myAnswer && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-primary">내 답변</h3>
            <AnswerCard answer={myAnswer} isMyAnswer={true} />
          </div>
        )}
        {allAnswers.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3">다른 답변들</h3>
            {allAnswers.map((answer) => (
              <AnswerCard key={answer.id} answer={answer} />
            ))}
          </div>
        )}
        {allAnswers.length === 0 && !myAnswer && (
          <div className="text-center py-8 text-gray">
            아직 답변이 없습니다.
          </div>
        )}
      </div>

      {/* 무한 스크롤 감지 요소 */}
      <div ref={ref} className="h-10 flex items-center justify-center">
        {isFetchingNextPage && <div className="text-gray">로딩 중...</div>}
      </div>
    </div>
  )
}
