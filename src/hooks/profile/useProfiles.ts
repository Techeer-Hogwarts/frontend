import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useGetProfileQuery } from '@/app/profile/query/useGetProfileQuery'
import { ProfileQueryParams } from '@/types/queryParams'
import { Profile } from '@/types/profile'

export const useProfiles = ({
  position = [],
  year = [],
  university = [],
  grade = [],
}: ProfileQueryParams = {}) => {
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [limit, setLimit] = useState(12)
  const [ref, inView] = useInView({ threshold: 0.5 })

  const { data, isLoading, isError } = useGetProfileQuery({
    position,
    year,
    university,
    grade,
    limit,
  })

  // 필터 변경 시 초기화
  useEffect(() => {
    setProfiles([])
    setLimit(12)
  }, [position, year, university, grade])

  // 새 데이터 추가 (중복 제거)
  useEffect(() => {
    if (data) {
      setProfiles((prev) => {
        const newProfiles = data.filter(
          (p) => !prev.some((item) => item.id === p.id),
        )
        return [...prev, ...newProfiles]
      })
    }
  }, [data])

  // inView 시 limit 증가
  useEffect(() => {
    if (inView) {
      setLimit((prev) => prev + 8)
    }
  }, [inView])

  return {
    profiles,
    isLoading,
    isError,
    ref,
  }
}
