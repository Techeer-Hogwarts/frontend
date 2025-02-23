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
  const { activeOption, setActiveOption } = useTapBarStore()
  const [inputValue, setInputValue] = useState('')
  const [limit, setLimit] = useState(12)
  const { fetchLikes } = useLike()
  const [allSessions, setAllSessions] = useState<Session[]>([])
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.5 })
  const [authModalOpen, setAuthModalOpen] = useState(false)
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

  // 카테고리 변경 처리 함수
  const handleCategoryChange = () => {
    // 카테고리가 변경되면 해당 카테고리에 맞는 블로그 데이터를 가져옵니다.
    setLimit(12) // 페이지네이션 초기화
    refetch()
  }
  const showMessage = () => {
    setMessage('세션영상이 삭제되었습니다.')
    setTimeout(() => setMessage(null), 2000)
    refetch()
  }
  const checkLike = async () => {
    try {
      const data = await fetchLikes('SESSION', 0, 50)
      setLikeList(data)
      return data
    } catch (err) {
      console.error(err)
      return []
    }
  }

  const handleLikeUpdate = (sessionId: string, newLikeCount: number) => {
    // 현재 세션 데이터에서 해당 ID를 가진 세션 찾아 업데이트
    setAllSessions((prev) =>
      prev.map((session) =>
        session.id === sessionId
          ? { ...session, likeCount: newLikeCount }
          : session,
      ),
    )

    // 탭 변경 시에도 좋아요 상태 유지를 위해 서버 데이터 갱신
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

  // 탭, 필터링 변경 시 상태 초기화
  useEffect(() => {
    setLimit(12)
    checkLike()
    refetch()
  }, [activeOption, selectedPeriodsP, selectedPeriodsPo, selectedPeriodsB])
  // 무한 스크롤 처리
  useEffect(() => {
    if (!inView) return
    setLimit((prev) => prev + 12)
    if (activeOption === '금주의 세션') {
      refetch()
    }
  }, [inView])
  // useEffect(() => {
  //   setActiveOption(tapBatOptions[0])
  // }, [])
  return (
    <div className="flex justify-center h-auto min-h-screen">
      <div className="flex flex-col">
        <AuthModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
        />
        {message && (
          <div className="fixed z-50 px-4 py-2 text-center text-white transform -translate-x-1/2 rounded-md bg-red-500/80 bottom-5 left-1/2">
            {message}
          </div>
        )}
        <div className="w-[1200px] text-left mt-14 mb-[2.84rem]">
          <p className="text-[2rem] font-bold">세션영상</p>
          <p className="text-[1.25rem]">테커인들의 세션영상을 확인해보세요.</p>
        </div>
        <div
          typeof="button"
          onClick={() => {
            setSelectedPeriodsP([])
            setSelectedPeriodsPo([])
            setSelectedPeriodsB([])
          }}
        >
          <TapBar options={tapBarOptions} onSelect={handleCategoryChange} />
        </div>
        <div className="flex w-full h-[1px] my-5 bg-gray" />
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
        {/* ✅ 로그인 안 했으면 즉시 EmptyLottie 표시 */}
        {authModalOpen ? (
          <div className="flex justify-center">
            <EmptyLottie
              text="세션 데이터가 없습니다."
              text2="로그인 후 다시 시도해주세요."
            />
          </div>
        ) : error || (newSessions && allSessions.length === 0) ? (
          <div className="flex justify-center">
            <EmptyLottie
              text="세션 데이터가 없습니다."
              text2="다시 조회해주세요"
            />
          </div>
        ) : (
          <div className="grid flex-col grid-cols-4 gap-8 mt-[2.84rem]">
            {allSessions.map((data: Session) => (
              <SessionPost
                key={data.id}
                likeCount={data.likeCount}
                id={data.id}
                thumbnail={data.thumbnail}
                title={data.title}
                date={data.date}
                presenter={data.presenter}
                fileUrl={data.fileUrl}
                userImage={data.user.profileImage}
                showMessage={showMessage}
                likeList={likeList}
                onLikeUpdate={handleLikeUpdate}
              />
            ))}
            <div ref={ref} />
          </div>
        )}
        <AddBtn />
      </div>
    </div>
  )
}
