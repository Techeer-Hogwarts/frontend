import React from 'react'
import Star from '../../../../public/star.svg'

const FeedbackMentor = () => {
  return (
    <div className="flex flex-col gap-10">
      <section>
        <header className="flex justify-between items-center mb-3">
          <h1 className="text-xl font-medium">새로운 피드백 요청</h1>
          <button className="w-[15rem] h-[3rem] text-center rounded-xl shadow-md justify-center text-[1.1rem] font-medium flex items-center hover:shadow-custom">
            <span className="text-sm">피드백 유의사항 작성하기</span>
            <Star />
          </button>
        </header>
        <div className="w-full p-5 flex-1 flex flex-col gap-3 shadow-md border border-lightgray rounded-md overflow-y-auto max-h-[30vh]">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="relative w-full min-h-[60px] border-lightgray border rounded-md flex items-center justify-between px-5"
            >
              {/* New 뱃지 */}
              <div className="absolute -top-2 bg-red-200 text-red-400 text-xs px-2 py-1 rounded-xl z-10 font-bold">
                New!
              </div>

              <p>이력서</p>
              <p className="font-bold">Joon</p>
              <p className="font-thin">2025-03-28 22:00</p>
              <button className="bg-primary p-1 w-1/6 rounded-xl text-sm text-white">
                상세보기
              </button>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h1 className="text-xl font-medium mb-3">확정된 피드백 요청</h1>
        <div className="w-full p-5 flex-1 flex flex-col gap-3 shadow-md border border-lightgray rounded-md overflow-y-auto h-[40vh]">
          {' '}
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="w-full min-h-[60px] border-lightgray border rounded-md flex items-center justify-between px-5"
            >
              <p>이력서</p>
              <p className="font-bold">Joon</p>
              <p className="font-thin">2025-03-28 22:00</p>
              <button className="bg-primary p-1 w-1/6 rounded-xl text-sm text-white">
                상세보기
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default FeedbackMentor
