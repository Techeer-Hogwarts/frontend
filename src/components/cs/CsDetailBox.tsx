import { useCsDetailBox } from '@/hooks/cs/useCsDetailBox'

interface CSDetailBoxProps {
  id: string
}

export default function CSDetailBox({ id }: CSDetailBoxProps) {
  const {
    answer,
    setAnswer,
    problemDetail,
    isLoading,
    error,
    submitAnswerMutation,
    handleSubmit,
  } = useCsDetailBox({ id })

  if (isLoading) {
    return (
      <div className="max-w-[1200px] mx-auto mt-[3.56rem]">
        <h1 className="text-[2rem] font-bold mb-5">CS 문제</h1>
        <div className="border border-gray bg-filterbg px-6 py-8 rounded-xl text-xl font-semibold mb-10">
          <p>문제를 불러오는 중...</p>
        </div>
      </div>
    )
  }

  if (error || !problemDetail) {
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

      <div className="mb-5">
        <p className="text-xl font-semibold text-primary mb-3">답변</p>
        <textarea
          placeholder="답변을 작성해주세요"
          className="w-full h-[12rem] border border-gray rounded-xl p-4 resize-none focus:outline-none"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          disabled={submitAnswerMutation.isPending}
        ></textarea>
      </div>

      <button
        onClick={handleSubmit}
        disabled={!answer.trim() || submitAnswerMutation.isPending}
        className={`w-full h-[3rem] rounded-xl text-white ${
          answer.trim() && !submitAnswerMutation.isPending
            ? 'bg-primary hover:bg-darkPrimary'
            : 'bg-lightgray'
        }`}
      >
        {submitAnswerMutation.isPending ? '제출 중...' : '제출'}
      </button>
    </div>
  )
}
