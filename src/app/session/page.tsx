'use client'

import { useEffect, useState } from 'react'
import TapBar from '@/components/common/TapBar'
import AddBtn from '@/components/common/AddBtn'
import { useLike } from '@/app/blog/_lib/useLike'
import Dropdown from '@/components/common/Dropdown'
import { useTapBarStore } from '@/store/tapBarStore'
import FilterBtn from '@/components/session/FilterBtn'
import { useInView } from 'react-intersection-observer'
import SessionPost from '@/components/session/SessionPost'
import { useSessionsQuery } from './_lib/useSessionsQuery'
import AuthModal from '@/components/common/AuthModal'
import EmptyLottie from '@/components/common/EmptyLottie'
import SearchBar from '@/components/common/SearchBar'
import BlogPostSkeleton from '@/components/blog/BlogPostSkeleton'

interface User {
  name: string
  profileImage: string
}
interface Session {
  id: string
  title: string
  date: string
  presenter: string
  likeCount: number
  thumbnail: string
  videoUrl: string
  fileUrl: string
  user: User
}

const tapBarOptions = ['전체보기', '부트캠프', '파트너스', '금주의 세션']

export default function Page() {
  const [selectedPeriodsP, setSelectedPeriodsP] = useState<string[]>([])
  const [selectedPeriodsB, setSelectedPeriodsB] = useState<string[]>([])
  const [selectedPeriodsPo, setSelectedPeriodsPo] = useState<string[]>([])
  const [likeList, setLikeList] = useState([])
  const [message, setMessage] = useState<string | null>(null)
  // 탭 상태
  const { activeOption } = useTapBarStore()
  // 검색어, limit
  const [inputValue, setInputValue] = useState('')
  const [limit, setLimit] = useState(12)
  // 세션 목록
  const [allSessions, setAllSessions] = useState<Session[]>([])
  // 로그인 모달
  const [authModalOpen, setAuthModalOpen] = useState(false)
  // 무한 스크롤
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.5 })
  const [isRequesting, setIsRequesting] = useState(false)
  // 좋아요 API
  const { fetchLikes } = useLike()

  // React Query
  const {
    data: newSessions,
    isLoading,
    refetch,
    error,
  } = useSessionsQuery({
    activeOption: activeOption || '',
    inputValue,
    limit,
    selectedPeriodsP,
    selectedPeriodsB,
    selectedPeriodsPo,
    setAuthModalOpen,
  })

  // 탭 변경 시
  const handleCategoryChange = () => {
    setLimit(12)
    refetch()
  }

  // 삭제 메시지
  const showMessage = () => {
    setMessage('세션영상이 삭제되었습니다.')
    setTimeout(() => setMessage(null), 2000)
    refetch()
  }

  // 좋아요 목록 조회
  const checkLike = async () => {
    try {
      const data = await fetchLikes('SESSION', 0, 50)
      setLikeList(data)
      return data
    } catch (err) {
      return []
    }
  }

  // 좋아요 업데이트
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

  // newSessions가 바뀔 때, allSessions에 합침
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

  // 탭/필터 변경 시
  useEffect(() => {
    setLimit(12)
    checkLike()
    refetch()
  }, [activeOption, selectedPeriodsP, selectedPeriodsPo, selectedPeriodsB])
  useEffect(() => {
    if (inView) {
      setIsRequesting(true)
      setLimit((prev) => prev + 8) // 새로운 데이터를 요청하려면 limit을 증가
    }
  }, [inView, isRequesting])

  // 검색 결과
  const [searchResults, setSearchResults] = useState<any>(null)

  return (
    <div className="flex justify-center h-auto min-h-screen">
      <div className="flex flex-col">
        {/* 로그인 모달 */}
        <AuthModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
        />

        {/* 삭제 메시지 */}
        {message && (
          <div className="fixed z-50 px-4 py-2 text-center text-white transform -translate-x-1/2 rounded-md bg-red-500/80 bottom-5 left-1/2">
            {message}
          </div>
        )}

        {/* 상단 제목 */}
        <div className="w-[1200px] text-left mt-14 mb-[2.84rem]">
          <p className="text-[2rem] font-bold">세션영상</p>
          <p className="text-[1.25rem]">테커인들의 세션영상을 확인해보세요.</p>
        </div>

        {/* 필터 초기화 대신 role="button" */}
        <div
          role="button"
          onClick={() => {
            setSelectedPeriodsP([])
            setSelectedPeriodsPo([])
            setSelectedPeriodsB([])
          }}
        >
          <div className="flex justify-between">
            <TapBar options={tapBarOptions} onSelect={handleCategoryChange} />
            <SearchBar
              placeholder="이름 또는 키워드로 검색해보세요"
              index="session"
              onSearchResult={setSearchResults}
            />
          </div>
        </div>

        {/* 구분선 */}
        <div className="flex w-full h-[1px] my-5 bg-gray" />

        {/* 필터 드롭다운 */}
        <div className="flex items-center justify-start gap-8">
          <div className="flex justify-start gap-3">
            {activeOption === '부트캠프' && (
              <>
                <Dropdown
                  title="부트캠프 기간"
                  options={[
                    'SUMMER_2022',
                    'WINTER_2022',
                    'SUMMER_2023',
                    'WINTER_2023',
                    'SUMMER_2024',
                    'WINTER_2024',
                  ]}
                  selectedOptions={selectedPeriodsB}
                  setSelectedOptions={setSelectedPeriodsB}
                />
                <Dropdown
                  title="포지션"
                  options={['FRONTEND', 'BACKEND', 'DEVOPS', 'OTHERS']}
                  selectedOptions={selectedPeriodsPo}
                  setSelectedOptions={setSelectedPeriodsPo}
                />
              </>
            )}
            {activeOption === '파트너스' && (
              <>
                <Dropdown
                  title="파트너스 기간"
                  options={[
                    'FIRST',
                    'SECOND',
                    'THIRD',
                    'FOURTH',
                    'FIFTH',
                    'SIXTH',
                    'SEVENTH',
                    'EIGHTH',
                  ]}
                  selectedOptions={selectedPeriodsP}
                  setSelectedOptions={setSelectedPeriodsP}
                />
                <Dropdown
                  title="포지션"
                  options={['FRONTEND', 'BACKEND', 'DEVOPS', 'OTHERS']}
                  selectedOptions={selectedPeriodsPo}
                  setSelectedOptions={setSelectedPeriodsPo}
                />
              </>
            )}
            {activeOption === '전체보기' && (
              <>
                <Dropdown
                  title="파트너스 기간"
                  options={[
                    'FIRST',
                    'SECOND',
                    'THIRD',
                    'FOURTH',
                    'FIFTH',
                    'SIXTH',
                    'SEVENTH',
                    'EIGHTH',
                  ]}
                  selectedOptions={selectedPeriodsP}
                  setSelectedOptions={setSelectedPeriodsP}
                />
                <Dropdown
                  title="부트캠프 기간"
                  options={[
                    'SUMMER_2022',
                    'WINTER_2022',
                    'SUMMER_2023',
                    'WINTER_2023',
                    'SUMMER_2024',
                    'WINTER_2024',
                  ]}
                  selectedOptions={selectedPeriodsB}
                  setSelectedOptions={setSelectedPeriodsB}
                />
                <Dropdown
                  title="포지션"
                  options={['FRONTEND', 'BACKEND', 'DEVOPS', 'OTHERS']}
                  selectedOptions={selectedPeriodsPo}
                  setSelectedOptions={setSelectedPeriodsPo}
                />
              </>
            )}
          </div>
        </div>

        {/* 필터 버튼들 */}
        {activeOption !== '금주의 세션' &&
          [selectedPeriodsP, selectedPeriodsPo, selectedPeriodsB].some(
            (arr) => arr.length > 0,
          ) && (
            <div className="bg-filterbg flex items-center w-[1200px] h-[100px] px-4 gap-4 mt-3 mb-5">
              {selectedPeriodsP.map((period) => (
                <FilterBtn
                  key={period}
                  title={period}
                  onClick={() => setSelectedPeriodsP([])}
                />
              ))}
              {selectedPeriodsB.map((period) => (
                <FilterBtn
                  key={period}
                  title={period}
                  onClick={() => setSelectedPeriodsB([])}
                />
              ))}
              {selectedPeriodsPo.map((period) => (
                <FilterBtn
                  key={period}
                  title={period}
                  onClick={() => setSelectedPeriodsPo([])}
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
        {/* 메인 렌더 로직 */}
        <div className="flex justify-center">
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
            <div className="grid grid-cols-4 gap-8 mt-[2.84rem]">
              {allSessions.map((data: Session) => (
                <SessionPost
                  key={data.id}
                  {...data} // 모든 props를 한 번에 전달
                  userImage={data.user.profileImage}
                  showMessage={showMessage}
                  likeList={likeList}
                  onLikeUpdate={handleLikeUpdate}
                />
              ))}
              <div ref={ref} className="h-1" />
            </div>
          )}
        </div>
        <AddBtn />
      </div>
    </div>
  )
}
