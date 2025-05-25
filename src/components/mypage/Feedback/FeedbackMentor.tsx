import React from 'react'
import Star from '../../../../public/star.svg'

const FeedbackMentor = () => {
  return (
    <div className="flex flex-col gap-10">
      {/* 새로운 피드백 요청 */}
      <section>
        <header className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold text-gray-800">
            새로운 피드백 요청
          </h1>
          <button className="w-[15rem] h-[3rem] text-center rounded-xl shadow-md flex items-center justify-center gap-2 text-[1rem] font-medium bg-white border border-lightgray hover:shadow-custom transition-all">
            <span className="text-sm text-gray-700">
              피드백 유의사항 작성하기
            </span>
            <Star />
          </button>
        </header>

        <div className="w-full p-4 flex-1 flex flex-col gap-3 shadow-sm border border-lightgray rounded-md overflow-y-auto max-h-[30vh] bg-white">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="relative w-full min-h-[60px] border border-lightgray rounded-lg flex items-center justify-between px-5 py-2 hover:bg-gray-50 transition"
            >
              <span className="absolute -top-2 left-3 bg-red-100 text-red-500 text-xs px-2 py-[2px] rounded-xl font-semibold">
                New!
              </span>

              <p className="text-sm text-gray-700">이력서</p>
              <p className="font-semibold text-gray-800">Joon</p>
              <p className="text-xs text-gray-500">2025.03.28 22:00</p>
              <button className="bg-primary px-3 py-1 w-1/6 rounded-lg text-sm text-white hover:opacity-90 transition">
                상세보기
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 확정된 피드백 요청 */}
      <section>
        <h1 className="text-xl font-semibold text-gray-800 mb-4">
          확정된 피드백 요청
        </h1>
        <div className="w-full p-4 flex-1 flex flex-col gap-3 shadow-sm border border-lightgray rounded-md overflow-y-auto h-[40vh] bg-white">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="w-full min-h-[60px] border border-lightgray rounded-lg flex items-center justify-between px-5 py-2 hover:bg-gray-50 transition"
            >
              <p className="text-sm text-gray-700">이력서</p>
              <p className="font-semibold text-gray-800">Joon</p>
              <p className="text-xs text-gray-500">2025.03.28 22:00</p>
              <button className="bg-primary px-3 py-1 w-1/6 rounded-lg text-sm text-white hover:opacity-90 transition">
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
