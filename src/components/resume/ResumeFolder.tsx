import CareerTag from '../common/CareerTag'
import PositionTag from '../common/PositionTag'

const ResumeFolder = () => {
  // 이력서 리스트
  const resumes = [
    {
      name: '박명수',
      period: '8기',
      position: 'Frontend',
      career: '신입',
      date: '2024.09.21',
    },
    {
      name: '유재석',
      period: '7기',
      position: 'Backend',
      career: '경력',
      date: '2024.09.19',
    },
    {
      name: '정준하',
      period: '6기',
      position: 'DataEngineer',
      career: '신입',
      date: '2024.09.18',
    },
    {
      name: '박명수',
      period: '8기',
      position: 'Frontend',
      career: '신입',
      date: '2024.09.21',
    },
    {
      name: '유재석',
      period: '7기',
      position: 'Backend',
      career: '경력',
      date: '2024.09.19',
    },
    {
      name: '정준하',
      period: '6기',
      position: 'DataEngineer',
      career: '신입',
      date: '2024.09.18',
    },
    {
      name: '박명수',
      period: '8기',
      position: 'Frontend',
      career: '신입',
      date: '2024.09.21',
    },
    {
      name: '유재석',
      period: '7기',
      position: 'Backend',
      career: '경력',
      date: '2024.09.19',
    },
    {
      name: '정준하',
      period: '6기',
      position: 'DataEngineer',
      career: '신입',
      date: '2024.09.18',
    },
  ]

  return (
    <div className="flex flex-wrap gap-12">
      {resumes.map((resume, index) => (
        <div className="flex flex-col w-[16.5rem] h-[10.25rem] gap-2 px-5 border-t-[0.4rem] border-black shadow-lg">
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

export default ResumeFolder
