import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { fetchBestResumes } from '@/app/resume/api/getBestResume'
import { useInView } from 'react-intersection-observer'

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
  setAuthModalOpen: (open: boolean) => void 
}
export default function BestResume({ setAuthModalOpen }: ResumeFolderProps) {
  const [resumes, setResumes] = useState<ResumeData[]>([]) // 빈 배열로 초기화
  const [cursorId, setCursorId] = useState<number | undefined>(undefined)
  const [hasNext, setHasNext] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  const router = useRouter() // useRouter 훅 추가
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { ref, inView } = useInView({ threshold: 0.01 })
  const limit = 12

  const loadMoreResumes = useCallback(async () => {
    if (!hasNext || isLoadingMore) return

    try {
      setIsLoadingMore(true)
      const response = await fetchBestResumes(cursorId || undefined, limit, setAuthModalOpen)
      const newResumes: ResumeData[] = response.data || []

      setResumes((prev) => {
        const existingIds = new Set(prev.map((r) => r.id))
        const filtered = newResumes.filter((r) => !existingIds.has(r.id))
        return [...prev, ...filtered]
      })

      if (response.hasNext !== undefined) setHasNext(response.hasNext)
      if (response.nextCursor !== undefined) setCursorId(response.nextCursor)

    } catch (error) {
      console.error('인기 이력서 불러오기 실패:', error)
    } finally {
      setIsLoadingMore(false)
    }
  }, [cursorId, hasNext, isLoadingMore, setAuthModalOpen])

  useEffect(() => {
    if (inView && hasNext && !isLoadingMore && isOpen) {
      loadMoreResumes()
    }
  }, [inView, hasNext, isOpen, isLoadingMore, loadMoreResumes])

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
           {hasNext && <div ref={ref} className="h-2" />}
        </div>
      )}
    </div>
  )
}
