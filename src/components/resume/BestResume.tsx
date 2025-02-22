import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { fetchBestResumes } from '@/app/resume/api/getBestResume'

interface ResumeData {
  id: number
  createdAt: number
  title: string
  url: string
  category: string
  user: {
    name: string
    year: number
    profileImage: string
    mainPosition: string
  }
}

interface ResumeFolderProps {
  offset: number
  limit: number
}
export default function BestResume({ offset, limit }: ResumeFolderProps) {
  const [resumes, setResumes] = useState<ResumeData[]>([]) // 빈 배열로 초기화
  const router = useRouter() // useRouter 훅 추가

  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function loadBestResumes() {
      try {
        const bestResumes = await fetchBestResumes(offset, limit) // 예시로 0번째부터 10개 가져오기
        // console.log('Best resumes:', bestResumes)
        setResumes(bestResumes.data || []) // 가져온 데이터를 상태에 저장
      } catch (error) {
        console.error('Error loading best resumes:', error)
      }
    }
    loadBestResumes()
  }, [offset, limit])

  const handleResumeClick = (id: number) => {
    router.push(`/resume/${id}`)
  }

  const toggleDropdown = () => setIsOpen(!isOpen)

  return (
    <div ref={dropdownRef} className="relative w-[12rem]">
      <button
        className="flex justify-between items-center w-[12rem] h-[2.5rem] px-4 shadow-md border-2 border-primary rounded-xl font-medium text-[1rem]"
        onClick={toggleDropdown}
      >
        인기 이력서 확인하기
        <Image src="/arrow.png" width={15} height={10} alt="arrow" />
      </button>
      {isOpen && (
        <div className="flex flex-col absolute left-0 right-0 z-10 bg-white rounded-lg shadow-lg mt-1.5 max-h-[17rem] overflow-y-auto">
          {Array.isArray(resumes) &&
            resumes.map((resume) => {
              const resumeTitle = resume.title.split('-').pop() || resume.title
              const truncatedTitle =
                resumeTitle.length > 16
                  ? resumeTitle.slice(0, 16) + '...'
                  : resumeTitle // 길이 초과시 자르기

              return (
                <button
                  key={resume.id}
                  onClick={() => handleResumeClick(resume.id)}
                  className="flex justify-center items-center w-full py-2 gap-1 hover:bg-lightprimary "
                >
                  <Image
                    src="/file.png"
                    width={25}
                    height={25}
                    alt="file"
                    style={{
                      width: '30px',
                      height: '30px',
                      objectFit: 'contain',
                    }}
                  />
                  <div className="flex flex-col gap-1 w-[8.2rem]">
                    <span className="text-[1rem] text-left">
                      {truncatedTitle}
                    </span>
                  </div>
                </button>
              )
            })}
        </div>
      )}
    </div>
  )
}
