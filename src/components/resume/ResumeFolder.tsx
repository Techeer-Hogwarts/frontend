import CareerTag from '../common/CareerTag'
import PositionTag from '../common/PositionTag'

interface Resume {
  name: string
  period: string
  position: string
  career: string
  date: string
}

const ResumeFolder = ({ name, period, position, career, date }: Resume) => {
  return (
    <div className="flex flex-col w-[16.5rem] h-[10.25rem] gap-2 px-5 border-t-[0.4rem] border-black shadow-lg">
      {/** 이름/기수 */}
      <div className="flex flex-row justify-between mt-3 mx-1 gap-[8rem]">
        <span className="font-bold text-[1.25rem]">{name}</span>
        <span className="font-bold text-primary">{period}</span>
      </div>
      <span className="flex w-[14rem] border-t border-black"></span>
      {/** 포지션/경력 */}
      <div className="flex flex-row gap-1 mt-1 mb-6">
        <PositionTag position={position} />
        <CareerTag career={career} />
      </div>
      {/** 날짜 */}
      <span className="ml-2 font-light text-[1rem]">{date}</span>
    </div>
  )
}

export default ResumeFolder
