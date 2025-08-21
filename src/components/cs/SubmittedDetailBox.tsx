'use client'

import AnswerCard from './AnswerCard'
import { useSubmittedDetailBox } from '@/hooks/cs/useSubmittedDetailBox'
import { useInfiniteScroll } from '@/hooks/cs/useInfiniteScroll'
import ProblemHeader from './ProblemHeader'
import ProblemStatus from './ProblemStatus'

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

  const { ref } = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  })

  if (problemLoading) {
    return <ProblemStatus problemId={Number(id)} updatedAt="" type="loading" />
  }

  if (problemError || !problemDetail) {
    return <ProblemStatus problemId={Number(id)} updatedAt="" type="error" />
  }

  return (
    <div className="max-w-[1200px] mx-auto mt-[3.56rem]">
      <ProblemHeader
        problemId={Number(id)}
        updatedAt={problemDetail.updatedAt}
      />
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
