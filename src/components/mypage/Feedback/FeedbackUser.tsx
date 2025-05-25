import React from 'react'
import Star from '../../../../public/star.svg'

const FeedbackUser = () => {
  return (
    <>
      <header className="flex justify-between items-center mb-3">
        <h1 className="text-xl font-medium">나의 피드백 요청</h1>
        <button className="w-[13rem] h-[3rem] text-center rounded-xl shadow-md justify-center text-[1.1rem] font-medium flex items-center hover:shadow-custom">
          <span>피드백 신청하기</span>
          <Star />
        </button>
      </header>
      <section className="flex flex-col h-[75vh] p-5 bg-white shadow-md rounded-xl border border-lightgray">
        <div className="flex flex-col gap-3 overflow-y-auto">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="w-full min-h-[60px] border border-lightgray rounded-md flex items-center justify-between px-5 py-3 bg-gray-50"
            >
              <p className="text-sm">이력서</p>
              <p className="font-bold text-sm">Joon</p>
              <p className="text-xs text-gray-500">2025-03-28 22:00</p>
              <button className="bg-primary p-1 px-3 rounded-xl text-sm text-white hover:bg-primary/90">
                상세보기
              </button>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default FeedbackUser
