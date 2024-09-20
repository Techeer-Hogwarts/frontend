import CareerTag from './CareerTag'
import PositionTag from './PostionTag'

const ResumeFolder = () => {
  return (
    <div className="flex flex-col w-[16.5rem] h-[10.25rem] gap-2 px-5 border-t-[0.4rem] border-black shadow-lg">
      {/** 이름/기수 */}
      <div className="flex flex-row justify-between mt-3 mx-1 gap-[8rem]">
        <span className="font-bold text-[1.25rem]">박명수</span>
        <span className="font-bold text-[#FF7816]">8기</span>
      </div>

      <span className="flex w-[14rem] border-t border-black"></span>
      {/** 포지션/경력 */}
      <div className="flex flex-row gap-1 mt-1 mb-6">
        <PositionTag />
        <CareerTag />
      </div>
      {/** 날짜 */}
      <span className="ml-2 font-light text-[1rem]">2024.09.21</span>
    </div>
  )
}

export default ResumeFolder
