'use client'
import { useEffect, useState } from 'react'
import CareerTag from '../common/CareerTag'
import PositionTag from '../common/PositionTag'
import { useRouter } from 'next/navigation'
import { fetchResumes } from '@/app/resume/api/getResumeList'

interface ResumeData {
  id: number
  title: string
  url: string
  category: string
  user: {
    name: string
    year: number
    isIntern: boolean
    profileImage: string
    mainPosition: string
    school: string
    createdAt: number
  }
}

interface ResumeFolderProps {
  position?: string
  year?: number
  offset: number
  limit: number
  resumes: ResumeData[]
}
export default function ResumeFolder({
  position,
  year,
  offset,
  limit,
}: ResumeFolderProps) {
  const [resumes, setResumes] = useState<ResumeData[]>([]) // 빈 배열로 초기화
  const [isLoading, setIsLoading] = useState(true) // 로딩 상태 추가
  const router = useRouter() // useRouter 훅 추가

  useEffect(() => {
    async function getResumeList() {
      try {
        setIsLoading(true)
        const data = await fetchResumes(
          position, // 선택적
          year, // 선택적
          offset ?? 0,
          limit ?? 10,
        )
        setResumes(data)
        console.log('이력서 목록 조회 성공:', data)
      } catch (err: any) {
        console.log('이력서 목록 조회 Error: ', err.message)
      } finally {
        setIsLoading(false) // 로딩 완료
      }
    }

    getResumeList()
  }, [position, year, offset, limit])

  if (isLoading) {
    return <div>Loading resumes...</div> // 로딩 상태 표시
  }

  // 이력서 목록이 없는 경우
  if (resumes.length === 0) {
    return <div>No resumes available</div>
  }

  const handleResumeClick = (id: number) => {
    router.push(`/detail/${id}`)
  }
  return (
    <div className="flex flex-wrap gap-12">
      {resumes.map((resume) => {
        // 신입/경력 구분
        const isIntern = resume.user.isIntern
        const userPosition = isIntern ? '경력' : '신입'

        // createdAt을 원하는 형식으로 변환
        const formattedDate = new Date(resume.user.createdAt)
          .toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })
          .replace(/\. /g, '.') // `.` 뒤에 공백 제거

        return (
          <div
            key={resume.id}
            onClick={() => handleResumeClick(resume.id)}
            className="flex flex-col w-[16.5rem] h-[10.25rem] gap-2 px-5 border-t-[0.4rem] border-black shadow-lg"
          >
            {/** 이름/기수 */}
            <div className="flex flex-row justify-between mt-3 mx-1 gap-[8rem]">
              <span className="font-bold text-[1.25rem]">
                {resume.user.name}
              </span>
              <span className="font-bold text-primary">
                {resume.user.year}기
              </span>
            </div>
            <span className="flex w-[14rem] border-t border-black"></span>
            {/** 포지션/경력 */}
            <div className="flex flex-row gap-1 mt-1 mb-6">
              <PositionTag position={resume.user.mainPosition} />
              <CareerTag career={userPosition} />
            </div>
            {/** 날짜 */}
            <span className="ml-2 font-light text-[1rem]">{formattedDate}</span>
          </div>
        )
      })}
    </div>
  )
}
