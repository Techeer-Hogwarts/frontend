import { useState, useEffect } from 'react'
import { useGetResumeQuery } from '../query/useGetResumeQuery'
import { Resume } from '@/types/resume'
import { ResumeQueryParams } from '@/types/queryParams'
import { useInView } from 'react-intersection-observer'

export function useResumeList({
  position = [],
  year = [],
  category = '전체',
}: ResumeQueryParams = {}) {
  const [resumes, setResumes] = useState<Resume[]>([])
  const [limit, setLimit] = useState(12)
  const { ref, inView } = useInView({ threshold: 0.1 })

  const {
    data: newResume,
    isLoading,
    isError,
    refetch,
  } = useGetResumeQuery({ position, year, category, limit })

  console.log('Fetched Data:', newResume)
  console.log('Loading:', isLoading)
  console.log('Error:', isError)

  useEffect(() => {
    setResumes([])
    setLimit(8)
    refetch()
  }, [position, year, category])

  useEffect(() => {
    if (newResume && Array.isArray(newResume)) {
      setResumes((prev) => {
        const existingIds = new Set(prev.map((p) => p.id))
        const newResumes = newResume.filter((p) => !existingIds.has(p.id)) // 중복 제거
        return [...prev, ...newResumes]
      })
    }
  }, [newResume])

  useEffect(() => {
    if (inView) {
      setLimit((prev) => prev + 8)
    }
  }, [inView])

  return { resumes, isLoading, isError, ref, refetch }
}
