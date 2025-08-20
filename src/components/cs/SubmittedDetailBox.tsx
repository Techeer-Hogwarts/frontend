'use client'

import AnswerCard from './AnswerCard'
import { useSubmittedDetailBox } from '@/hooks/cs/useSubmittedDetailBox'
import { useInfiniteScroll } from '@/hooks/cs/useInfiniteScroll'
import { useTodayCsQuery } from '@/api/cs/queries'
import { useProblemDate } from '@/hooks/cs/useProblemDate'

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
    refreshAnswers, // 새로고침 함수 추가
  } = useSubmittedDetailBox({ id })

  // 오늘의 CS 문제 조회 (금주의 CS 판단용)
  const { data: todayCs } = useTodayCsQuery()

  const { ref } = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  })

  // 현재 문제가 금주의 CS인지 판단
  const isCurrentWeekCS = todayCs?.problemId === Number(id)

  // 공통 훅 사용
  const { getProblemDate } = useProblemDate(problemDetail?.updatedAt || '')

  if (problemLoading) {
    return (
      <div className="max-w-[1200px] mx-auto mt-[3.56rem]">
        <div className="flex items-center space-x-4 mb-5">
          <h1 className="text-[2rem] font-bold">
            {isCurrentWeekCS ? '금주의 CS' : '이전 CS'}
          </h1>
        </div>
        <div className="border border-gray bg-filterbg px-6 py-8 rounded-xl text-xl font-semibold mb-10">
          <p>문제를 불러오는 중...</p>
        </div>
      </div>
    )
  }

  if (problemError || !problemDetail) {
    return (
      <div className="max-w-[1200px] mx-auto mt-[3.56rem]">
        <div className="flex items-center space-x-4 mb-5">
          <h1 className="text-[2rem] font-bold">
            {isCurrentWeekCS ? '금주의 CS' : '이전 CS'}
          </h1>
        </div>
        <div className="border border-red-300 bg-red-50 px-6 py-8 rounded-xl text-xl font-semibold mb-10">
          <p>문제를 불러오는데 실패했습니다.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-[1200px] mx-auto mt-[3.56rem]">
      <div className="flex items-center space-x-4 mb-5">
        <h1 className="text-[2rem] font-bold">
          {isCurrentWeekCS ? '금주의 CS' : '이전 CS'}
        </h1>
        <p className="text-lg text-gray">{getProblemDate()}</p>
      </div>

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
            <AnswerCard
              answer={myAnswer}
              isMyAnswer={true}
              problemId={Number(id)}
              onRefresh={refreshAnswers} // 새로고침 함수 전달
            />
          </div>
        )}
        {allAnswers.length > 0 && (
          <div>
            {allAnswers.map((answer) => (
              <AnswerCard
                key={answer.id}
                answer={answer}
                problemId={Number(id)}
                onRefresh={refreshAnswers} // 새로고침 함수 전달
              />
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
