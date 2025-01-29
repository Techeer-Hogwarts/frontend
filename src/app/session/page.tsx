'use client'

import { useEffect, useState } from 'react'
import TapBar from '@/components/common/TapBar'
import AddBtn from '@/components/common/AddBtn'
import { getSessions } from './_lib/getSessions'
import Dropdown from '@/components/common/Dropdown'
import { useTapBarStore } from '@/store/tapBarStore'
import FilterBtn from '@/components/session/FilterBtn'
import { getBestSessions } from './_lib/getBestSessions'
import SessionPost from '@/components/session/SessionPost'
// import { useQuery } from '@tanstack/react-query'
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
  const [selectedPeriods, setSelectedPeriods] = useState<string[]>([])
  const [sessions, setSessions] = useState<Session[]>([])
  const [message, setMessage] = useState<string | null>(null)
  const { activeOption } = useTapBarStore()
  const [inputValue, setInputValue] = useState('')

  const handleSearch = (query: string) => {
    sessionStorage.setItem('searchQuery', query)
    setInputValue(query)
  }

  const handleDeleteSession = (id: string) => {
    setSessions((prevSessions) =>
      prevSessions.filter((session) => session.id !== id),
    )
    setMessage('세션영상이 삭제되었습니다.')
    setTimeout(() => setMessage(null), 2000)
  }

  const fetchBestSession = async () => {
    try {
      const result = await getBestSessions()
      setSessions(result)
      console.log('세션이 성공적으로 추가되었습니다:', result)
    } catch (err) {
      console.error('세션 데이터 업로드 중 오류 발생:', err)
    }
  }
  // const { data } = useQuery({
  //   queryKey: ['bestSessions'],
  //   queryFn: getBestSessions,
  //   staleTime: 60 * 1000,
  //   gcTime: 300 * 1000,
  // })
  // const { data: session } = useQuery({
  //   queryKey: ['Sessions', inputValue, activeOption],
  //   queryFn: getSessions(inputValue, activeOption),
  //   staleTime: 60 * 1000,
  //   gcTime: 300 * 1000,
  // })

  const fetchSession = async (query: string, category: string) => {
    try {
      const result = await getSessions(query, category)
      setSessions(result)
    } catch (err) {
      console.error('세션 데이터 가져오기 실패:', err)
    }
  }

  useEffect(() => {
    if (activeOption) {
      if (activeOption === '금주의 세션') {
        fetchBestSession()
      } else if (['전체보기', '부트캠프', '파트너스'].includes(activeOption)) {
        const category =
          activeOption === '부트캠프'
            ? 'BOOTCAMP'
            : activeOption === '파트너스'
              ? 'PARTNERS'
              : activeOption === '전체보기'
                ? ''
                : ''
        fetchSession(inputValue, category)
      }
    }
  }, [activeOption, inputValue])

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
        <TapBar
          options={['금주의 세션', '전체보기', '부트캠프', '파트너스']}
          placeholder="세션 제목 검색해보세요"
          onSearch={handleSearch}
        />
        <div className="flex justify-start my-6 gap-3">
          <Dropdown
            title="기간"
            options={['1기', '2기', '3기', '4기', '5기', '6기', '7기', '8기']}
            selectedOptions={selectedPeriods}
            setSelectedOptions={setSelectedPeriods}
          />
          <Dropdown
            title="포지션"
            options={['Frontend', 'Backend', 'DevOps', 'Others']}
            selectedOptions={selectedPeriods}
            setSelectedOptions={setSelectedPeriods}
          />
        </div>
        <div className="bg-filterbg flex items-center w-[1200px] h-[100px] px-4 gap-4 mt-3 mb-5">
          {/* <FilterBtn title="Frontend" />
          <FilterBtn title="1기" /> */}
        </div>
        <div className="grid grid-cols-3 gap-8">
          {sessions?.map((data: any) => (
            <SessionPost
              key={data.id}
              likeCount={data.likeCount}
              id={data.id}
              thumbnail={data.thumbnail}
              title={data.title}
              date={data.date}
              presenter={data.presenter}
              fileUrl={data.fileUrl}
              onDelete={handleDeleteSession}
              videoUrl={data.videoUrl}
            />
          ))}
        </div>
        <AddBtn />
      </div>
    </div>
  )
}
