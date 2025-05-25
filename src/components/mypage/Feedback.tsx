import React from 'react'
import Star from '../../../public/star.svg'

const Feedback = () => {
  return (
    <div className="w-[890px] h-[80vh] rounded-xl p-5">
      <header className="flex justify-between items-center mb-3">
        <h1 className="text-xl font-medium">나의 피드백 요청</h1>
        <button className="w-[13rem] h-[3rem] text-center rounded-xl shadow-md justify-center text-[1.1rem] font-medium flex items-center hover:shadow-custom">
          <span>피드백 신청하기</span>
          <Star />
        </button>
      </header>
      <section className="w-full p-5 flex-1 flex flex-col gap-3 shadow-md border border-lightgray rounded-md overflow-y-auto h-full">
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
      </section>
    </div>
  )
}

export default Feedback
