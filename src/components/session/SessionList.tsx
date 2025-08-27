'use client'

import FilterBtn from './FilterBtn'
import SessionPost from './SessionPost'
import Dropdown from '../common/Dropdown'
import EmptyAnimation from '../common/EmptyAnimation'
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
  'SUMMER_2025',
]
const Position = ['FRONTEND', 'BACKEND', 'DEVOPS', 'OTHERS']

export default function SessionList({
  searchResults,
}: {
  searchResults?: any
}) {
  const { fetchLikes } = useLike()
  const { activeOption } = useTapBarStore()
  const { isOpen: authModalOpen, onOpen: openAuthModal } = useAuthModal()

  const [selectedFilters, setSelectedFilters] = useState({
    partners: [] as string[],
    bootcamp: [] as string[],
    position: [] as string[],
  })
  const [limit, setLimit] = useState(12)
  const [cursorId, setCursorId] = useState<number | undefined>(undefined)
  const [hasNext, setHasNext] = useState(true)
  const [likeList, setLikeList] = useState([])
  const [message, setMessage] = useState<string | null>(null)
  const [allSessions, setAllSessions] = useState<Session[]>([])
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.5 })

  const [selectedSortBy, setSelectedSortBy] = useState<string[]>(['최신순'])
  const sortByOptions = ['최신순', '가나다순']

  const updateFilter = (key: keyof typeof selectedFilters, value: string[]) => {
    setSelectedFilters((prev) => ({ ...prev, [key]: value }))
  }

  const {
    data: sessionsResponse,
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
    cursorId,
    sortBy: selectedSortBy[0] === '최신순' ? 'date' : 'name',
  })

  const showMessage = () => {
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
    }, 500)
  }

  useEffect(() => {
    if (!sessionsResponse || isLoading) return

    // 응답에서 데이터와 메타정보 추출
    const sessions = sessionsResponse?.sessions || []

    // 커서 기반 메타정보 업데이트
    if (sessionsResponse.hasNext !== undefined) {
      setHasNext(sessionsResponse.hasNext)
    }

    // 첫 로드이거나 필터가 변경된 경우
    if (!cursorId) {
      setAllSessions(sessions)
    } else {
      // 무한 스크롤로 데이터 추가
      setAllSessions((prev) => {
        const existingIds = new Set(prev.map((session) => session.id))
        const newItems = sessions.filter(
          (session: any) => !existingIds.has(session.id),
        )
        return [...prev, ...newItems]
      })
    }
  }, [sessionsResponse, isLoading, cursorId])

  useEffect(() => {
    // 필터나 탭이 변경되면 초기화
    setCursorId(undefined)
    setHasNext(true)
    checkLike()
  }, [activeOption, selectedFilters, selectedSortBy])

  useEffect(() => {
    // 무한 스크롤 트리거

    if (inView && hasNext && !isLoading) {
      if (
        sessionsResponse?.nextCursor &&
        sessionsResponse.nextCursor !== cursorId
      ) {
        setCursorId(sessionsResponse.nextCursor)
      }
    }
  }, [inView, hasNext, isLoading, sessionsResponse, cursorId])

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex items-center justify-start gap-8">
          <div className="flex justify-start gap-3">
            {activeOption === '부트캠프' && (
              <>
                <Dropdown
                  title="부트캠프 기간"
                  options={BootcampPeriod}
                  selectedOptions={selectedFilters.bootcamp}
                  setSelectedOptions={(value) =>
                    updateFilter('bootcamp', value)
                  }
                />
                <Dropdown
                  title="포지션"
                  options={Position}
                  selectedOptions={selectedFilters.position}
                  setSelectedOptions={(value) =>
                    updateFilter('position', value)
                  }
                />
              </>
            )}
            {activeOption === '파트너스' && (
              <>
                <Dropdown
                  title="파트너스 기간"
                  options={PartnersPeriod}
                  selectedOptions={selectedFilters.partners}
                  setSelectedOptions={(value) =>
                    updateFilter('partners', value)
                  }
                />
                <Dropdown
                  title="포지션"
                  options={Position}
                  selectedOptions={selectedFilters.position}
                  setSelectedOptions={(value) =>
                    updateFilter('position', value)
                  }
                />
              </>
            )}
            {activeOption === '전체보기' && (
              <>
                <Dropdown
                  title="파트너스 기간"
                  options={PartnersPeriod}
                  selectedOptions={selectedFilters.partners}
                  setSelectedOptions={(value) =>
                    updateFilter('partners', value)
                  }
                />
                <Dropdown
                  title="부트캠프 기간"
                  options={BootcampPeriod}
                  selectedOptions={selectedFilters.bootcamp}
                  setSelectedOptions={(value) =>
                    updateFilter('bootcamp', value)
                  }
                />
                <Dropdown
                  title="포지션"
                  options={Position}
                  selectedOptions={selectedFilters.position}
                  setSelectedOptions={(value) =>
                    updateFilter('position', value)
                  }
                />
              </>
            )}
          </div>
        </div>
        {activeOption !== '금주의 세션' && (
          <Dropdown
            title={selectedSortBy[0] || '최신순'}
            options={sortByOptions}
            selectedOptions={selectedSortBy}
            setSelectedOptions={setSelectedSortBy}
            singleSelect={true}
          />
        )}
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
          <EmptyAnimation
            text="세션 데이터가 없습니다."
            text2="로그인 후 다시 시도해주세요."
          />
        )}
        {!authModalOpen &&
          (error ||
            (sessionsResponse && !isLoading && allSessions.length === 0)) && (
            <EmptyAnimation
              text="세션 데이터가 없습니다."
              text2="다시 조회해주세요."
            />
          )}
        {Array.isArray(searchResults) && searchResults.length > 0 ? (
          // 검색 결과가 있을 때
          <div className="grid grid-cols-4 gap-8 mt-[2.84rem] w-[1200px]">
            {searchResults.map((result: any) => {
              // 검색 결과를 SessionPost에 맞는 형태로 변환
              const sessionData = {
                id: result.id,
                title: result.title,
                date: result.date,
                presenter: result.presenter,
                likeCount: parseInt(result.likeCount) || 0,
                thumbnail: result.thumbnail,
                fileUrl: '', // 검색 결과에 없으므로 빈 문자열
                userId: '', // 검색 결과에 없으므로 빈 문자열
                user: {
                  name: result.presenter,
                  profileImage: '',
                },
                videoUrl: '', // 검색 결과에 없으므로 빈 문자열
              }

              return (
                <SessionPost
                  key={result.id}
                  {...sessionData}
                  showMessage={showMessage}
                  likeList={likeList}
                  onLikeUpdate={handleLikeUpdate}
                />
              )
            })}
          </div>
        ) : !authModalOpen && !error && allSessions.length > 0 ? (
          // 정상 데이터 표시
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
        ) : null}
      </div>
      {message && (
        <div className="fixed z-50 px-4 py-2 text-center text-white transform -translate-x-1/2 rounded-md bg-red-500/80 bottom-5 left-1/2">
          {message}
        </div>
      )}
    </div>
  )
}
