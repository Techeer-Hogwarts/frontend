import CareerTag from '../common/CareerTag'
import PositionTag from '../common/PositionTag'

interface Resume {
  resumes: Array<{
    name: string
    period: string
    position: string
    career: string
    date: string
  }>
}
export default function ResumeFolder({ resumes }: Resume) {
  return (
    <div className="flex flex-wrap gap-12">
      {resumes.map((resume, index) => (
        <div
          key={index}
          className="flex flex-col w-[16.5rem] h-[10.25rem] gap-2 px-5 border-t-[0.4rem] border-black shadow-lg"
        >
          {/** 이름/기수 */}
          <div className="flex flex-row justify-between mt-3 mx-1 gap-[8rem]">
            <span className="font-bold text-[1.25rem]">{resume.name}</span>
            <span className="font-bold text-primary">{resume.period}</span>
          </div>
          <span className="flex w-[14rem] border-t border-black"></span>
          {/** 포지션/경력 */}
          <div className="flex flex-row gap-1 mt-1 mb-6">
            <PositionTag position={resume.position} />
            <CareerTag career={resume.career} />
          </div>
          {/** 날짜 */}
          <span className="ml-2 font-light text-[1rem]">{resume.date}</span>
        </div>
      ))}
    </div>
  )
}
