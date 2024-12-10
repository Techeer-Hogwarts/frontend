import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { fetchBestResumes } from '@/app/resume/api/getBestResume'

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
        const bestResumes = await fetchBestResumes(0, 10) // 예시로 0번째부터 10개 가져오기
        // console.log('Best resumes:', bestResumes)
        setResumes(bestResumes) // 가져온 데이터를 상태에 저장
      } catch (error) {
        console.error('Error loading best resumes:', error)
      }
    }
    loadBestResumes()
  }, [])

  const handleResumeClick = (id: number) => {
    router.push(`/detail/${id}`)
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
        <ul className="absolute left-0 right-0 z-10 bg-white rounded-lg shadow-lg mt-1.5">
          {resumes.map((resume) => {
            return (
              <li
                key={resume.id}
                onClick={() => handleResumeClick(resume.id)}
                className="flex justify-center my-3 gap-2"
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
                <div className="flex flex-col gap-1">
                  <span className="text-[1rem]">{resume.title}</span>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
