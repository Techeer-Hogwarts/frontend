'use client'

import FilterBtn from './FilterBtn'
import SessionPost from './SessionPost'
import Dropdown from '../common/Dropdown'
import EmptyLottie from '../common/EmptyLottie'
import BlogPostSkeleton from '../blog/BlogPostSkeleton'
import { useEffect, useState } from 'react'
import { useLike } from '@/app/blog/_lib/useLike'
import { useTapBarStore } from '@/store/tapBarStore'
import { useInView } from 'react-intersection-observer'
import { useAuthModal } from '@/store/useAuthModal'
import { useSessionsQuery } from '@/hooks/session/useSessionsQuery'

interface User {
  name: string
  profileImage: string
}
interface Session {
  id: string
  title: string
  date: string
  userId: string
  presenter: string
  likeCount: number
  thumbnail: string
  videoUrl: string
  fileUrl: string
  user: User
}

const PartnersPeriod = [
  'FIRST',
  'SECOND',
  'THIRD',
  'FOURTH',
  'FIFTH',
  'SIXTH',
  'SEVENTH',
  'EIGHTH',
]
const BootcampPeriod = [
  'SUMMER_2022',
  'WINTER_2022',
  'SUMMER_2023',
  'WINTER_2023',
  'SUMMER_2024',
  'WINTER_2024',
]
const Position = ['FRONTEND', 'BACKEND', 'DEVOPS', 'OTHERS']

export default function SessionList() {
  const { fetchLikes } = useLike()
  const { activeOption } = useTapBarStore()
  const { isOpen: authModalOpen, onOpen: openAuthModal } = useAuthModal()

  const [selectedFilters, setSelectedFilters] = useState({
    partners: [] as string[],
    bootcamp: [] as string[],
    position: [] as string[],
  })
  const [limit, setLimit] = useState(12)
  const [likeList, setLikeList] = useState([])
  const [message, setMessage] = useState<string | null>(null)
  const [allSessions, setAllSessions] = useState<Session[]>([])
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.5 })

  const updateFilter = (key: keyof typeof selectedFilters, value: string[]) => {
    setSelectedFilters((prev) => ({ ...prev, [key]: value }))
  }

  const {
    data: newSessions,
    isLoading,
    refetch,
    error,
  } = useSessionsQuery({
    activeOption: activeOption || '',
    limit,
    selectedPeriodsP: selectedFilters.partners,
    selectedPeriodsB: selectedFilters.bootcamp,
    selectedPeriodsPo: selectedFilters.position,
    setAuthModalOpen: openAuthModal,
  })

  const showMessage = () => {
    console.log('세션영상 삭제')
    setMessage('세션영상이 삭제되었습니다.')
    setTimeout(() => setMessage(null), 2000)
    refetch()
  }

  const checkLike = async () => {
    const data = await fetchLikes('SESSION', 0, 50)
    setLikeList(data)
  }

  const handleLikeUpdate = (sessionId: string, newLikeCount: number) => {
    setAllSessions((prev) =>
      prev.map((session) =>
        session.id === sessionId
          ? { ...session, likeCount: newLikeCount }
          : session,
      ),
    )
    setTimeout(() => {
      checkLike()
      refetch()
    }, 500)
  }

  useEffect(() => {
    if (!newSessions || isLoading) return
    if (limit === 12) {
      setAllSessions(newSessions)
    } else {
      setAllSessions((prev) => {
        const existingIds = new Set(prev.map((session) => session.id))
        const newItems = newSessions.filter(
          (session: any) => !existingIds.has(session.id),
        )
        return [...prev, ...newItems]
      })
    }
  }, [newSessions, isLoading, limit])

  useEffect(() => {
    setLimit(12)
    checkLike()
    refetch()
  }, [activeOption, selectedFilters])

  useEffect(() => {
    if (!newSessions) return
    const reachedEnd = newSessions.length < limit
    if (inView && !reachedEnd) {
      setLimit((prev) => prev + 12)
    }
  }, [inView])

  return (
    <div>
      <div className="flex items-center justify-start gap-8">
        <div className="flex justify-start gap-3">
          {activeOption === '부트캠프' && (
            <>
              <Dropdown
                title="부트캠프 기간"
                options={BootcampPeriod}
                selectedOptions={selectedFilters.bootcamp}
                setSelectedOptions={(value) => updateFilter('bootcamp', value)}
              />
              <Dropdown
                title="포지션"
                options={Position}
                selectedOptions={selectedFilters.position}
                setSelectedOptions={(value) => updateFilter('position', value)}
              />
            </>
          )}
          {activeOption === '파트너스' && (
            <>
              <Dropdown
                title="파트너스 기간"
                options={PartnersPeriod}
                selectedOptions={selectedFilters.partners}
                setSelectedOptions={(value) => updateFilter('partners', value)}
              />
              <Dropdown
                title="포지션"
                options={Position}
                selectedOptions={selectedFilters.position}
                setSelectedOptions={(value) => updateFilter('position', value)}
              />
            </>
          )}
          {activeOption === '전체보기' && (
            <>
              <Dropdown
                title="파트너스 기간"
                options={PartnersPeriod}
                selectedOptions={selectedFilters.partners}
                setSelectedOptions={(value) => updateFilter('partners', value)}
              />
              <Dropdown
                title="부트캠프 기간"
                options={BootcampPeriod}
                selectedOptions={selectedFilters.bootcamp}
                setSelectedOptions={(value) => updateFilter('bootcamp', value)}
              />
              <Dropdown
                title="포지션"
                options={Position}
                selectedOptions={selectedFilters.position}
                setSelectedOptions={(value) => updateFilter('position', value)}
              />
            </>
          )}
        </div>
      </div>

      {activeOption !== '금주의 세션' &&
        Object.values(selectedFilters).some((arr) => arr.length > 0) && (
          <div className="bg-filterbg flex items-center w-[1200px] h-[100px] px-4 gap-4 mt-3 mb-5">
            {selectedFilters.partners.map((period) => (
              <FilterBtn
                key={period}
                title={period}
                onClick={() => updateFilter('partners', [])}
              />
            ))}
            {selectedFilters.bootcamp.map((period) => (
              <FilterBtn
                key={period}
                title={period}
                onClick={() => updateFilter('bootcamp', [])}
              />
            ))}
            {selectedFilters.position.map((period) => (
              <FilterBtn
                key={period}
                title={period}
                onClick={() => updateFilter('position', [])}
              />
            ))}
          </div>
        )}

      {allSessions.length === 0 && isLoading && (
        <div className="grid grid-cols-4 gap-8 mt-[2.84rem] ">
          {Array.from({ length: 8 }).map((_, i) => (
            <BlogPostSkeleton key={i} />
          ))}
        </div>
      )}
      <div className="flex justify-center w-[1200px]">
        {authModalOpen && (
          <EmptyLottie
            text="세션 데이터가 없습니다."
            text2="로그인 후 다시 시도해주세요."
          />
        )}
        {!authModalOpen &&
          (error || (newSessions && allSessions.length === 0)) && (
            <EmptyLottie
              text="세션 데이터가 없습니다."
              text2="다시 조회해주세요."
            />
          )}
        {!authModalOpen && !error && allSessions.length > 0 && (
          <div className="grid grid-cols-4 gap-8 mt-[2.84rem] w-[1200px]">
            {allSessions.map((data: Session) => (
              <SessionPost
                key={data.id}
                {...data}
                showMessage={showMessage}
                likeList={likeList}
                onLikeUpdate={handleLikeUpdate}
              />
            ))}
            <div ref={ref} className="h-1" />
          </div>
        )}
      </div>
      {message && (
        <div className="fixed z-50 px-4 py-2 text-center text-white transform -translate-x-1/2 rounded-md bg-red-500/80 bottom-5 left-1/2">
          {message}
        </div>
      )}
    </div>
  )
}
