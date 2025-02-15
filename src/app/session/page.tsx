'use client'

import { useEffect, useState } from 'react'
import TapBar from '@/components/common/TapBar'
import AddBtn from '@/components/common/AddBtn'
import Dropdown from '@/components/common/Dropdown'
import { useTapBarStore } from '@/store/tapBarStore'
import FilterBtn from '@/components/session/FilterBtn'
import { useInView } from 'react-intersection-observer'
import SessionPost from '@/components/session/SessionPost'
import { useSessionsQuery } from './_lib/useSessionsQuery'

interface Session {
  id: string
  title: string
  date: string
  presenter: string
  likeCount: number
  thumbnail: string
  videoUrl: string
  fileUrl: string
}

export default function Page() {
  const [selectedPeriodsP, setSelectedPeriodsP] = useState<string[]>([])
  const [selectedPeriodsB, setSelectedPeriodsB] = useState<string[]>([])
  const [selectedPeriodsPo, setSelectedPeriodsPo] = useState<string[]>([])
  const [message, setMessage] = useState<string | null>(null)
  const { activeOption } = useTapBarStore()
  const [inputValue, setInputValue] = useState('')
  const [limit, setLimit] = useState(6)
  const [allSessions, setAllSessions] = useState<Session[]>([])
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.5 })

  const {
    data: newSessions,
    isLoading,
    refetch,
  } = useSessionsQuery({
    activeOption: activeOption || '',
    inputValue,
    limit,
    selectedPeriodsP,
    selectedPeriodsB,
    selectedPeriodsPo,
  })

  const handleSearch = (query: string) => {
    sessionStorage.setItem('searchQuery', query)
    setInputValue(query)
  }

  const showMessage = () => {
    setMessage('세션영상이 삭제되었습니다.')
    setTimeout(() => setMessage(null), 2000)
    refetch()
  }

  const handleFilterChange = () => {
    if (activeOption === '금주의 세션') return

    Promise.all([setLimit(3), setAllSessions([])]).then(() => {
      refetch()
    })
  }

  // 새로운 세션 데이터 업데이트
  useEffect(() => {
    if (!newSessions || isLoading) return
    setAllSessions((prev) => {
      const uniqueSessions = [...prev]
      newSessions.forEach((newSession: Session) => {
        if (!uniqueSessions.some((session) => session.id === newSession.id)) {
          uniqueSessions.push(newSession)
        }
      })
      return uniqueSessions
    })
  }, [newSessions, isLoading])

  // 탭 변경 시 상태 초기화
  useEffect(() => {
    setLimit(6)
    setAllSessions([])
    const timer = setTimeout(() => {
      refetch()
    }, 100) // 약간의 지연을 추가하여 상태 업데이트가 완료되도록 함
    return () => clearTimeout(timer)
  }, [activeOption])

  // 필터 변경 시 처리
  useEffect(() => {
    handleFilterChange()
  }, [selectedPeriodsP, selectedPeriodsB, selectedPeriodsPo, inputValue])

  // 무한 스크롤 처리
  useEffect(() => {
    if (!inView) return
    setLimit((prev) => prev + 3)
  }, [inView])
  return (
    <div className="flex justify-center h-auto min-h-screen">
      <div className="flex flex-col">
        {message && (
          <div className="bg-red-500/80 z-50 rounded-md fixed text-white text-center bottom-5 left-1/2 transform -translate-x-1/2 px-4 py-2">
            {message}
          </div>
        )}
        <div className="w-[1200px] text-left mt-14 mb-7">
          <p className="text-4xl mb-5 font-bold">세션영상</p>
          <p className="text-xl">테커인들의 세션영상을 확인해보세요.</p>
        </div>
        <div
          typeof="button"
          onClick={() => {
            setSelectedPeriodsP([])
            setSelectedPeriodsPo([])
            setSelectedPeriodsB([])
          }}
        >
          <TapBar
            options={['금주의 세션', '전체보기', '부트캠프', '파트너스']}
            placeholder="세션 제목을 검색해보세요"
            onSearch={handleSearch}
          />
        </div>
        <div className="flex justify-start my-6 gap-3">
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
        {activeOption != '금주의 세션' && (
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
        <div className="flex-col grid grid-cols-3 gap-8">
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
              showMessage={showMessage}
            />
          ))}
          <div ref={ref} />
        </div>
        <AddBtn />
      </div>
    </div>
  )
}
