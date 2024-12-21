'use client'

import { useEffect, useState } from 'react'
import TapBar from '@/components/common/TapBar'
import AddBtn from '@/components/common/AddBtn'
import Dropdown from '@/components/common/Dropdown'
import { useTapBarStore } from '@/store/tapBarStore'
import FilterBtn from '@/components/session/FilterBtn'
import SessionPost from '@/components/session/SessionPost'

interface Session {
  id: string
  title: string
  date: string
  presenter: string
  likeCount: number
  thumbnail: string
}

export default function Page() {
  const [selectedPeriods, setSelectedPeriods] = useState<string[]>([])
  const [bestSessions, setBestSessions] = useState<Session[]>([])
  const [message, setMessage] = useState<string | null>(null)
  const { activeOption } = useTapBarStore()

  const handleDeleteSession = (id: string) => {
    setBestSessions((prevSessions) =>
      prevSessions.filter((session) => session.id !== id),
    )
    setMessage('세션영상이 삭제되었습니다.')
    setTimeout(() => setMessage(null), 2000)
  }
  // const getBestSession = async () => {
  //   try {
  //     const response = await fetch(
  //       'https://api.techeerzip.cloud/api/v1/sessions/best?offset=0&limit=10',
  //       {
  //         method: 'GET',
  //       },
  //     )

  //     if (!response.ok) {
  //       throw new Error('세션 데이터를 업로드하는 데 실패했습니다.')
  //     }

  //     const result = await response.json()
  //     setBestSessions(result.data)
  //     console.log(bestSessions)
  //     console.log('세션이 성공적으로 추가되었습니다:', result.data)
  //   } catch (err) {
  //     console.error('세션 데이터 업로드 중 오류 발생:', err)
  //   }
  // }
  // useEffect(() => {
  //   getBestSession()
  // }, [])
  useEffect(() => {
    const storedValue =
      activeOption === '부트캠프'
        ? 'BOOTCAMP'
        : activeOption === '파트너스'
          ? 'PARTNERS'
          : activeOption === '전체보기'
            ? ''
            : ''
    const baseUrl = 'https://api.techeerzip.cloud/api/v1/sessions'
    const params = {
      keyword: '',
      category: storedValue,
      date: '',
      position: '',
      offset: String(0),
      limit: String(10),
    }

    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(
        ([_, value]) => value !== null && value !== '',
      ),
    )
    const queryString = new URLSearchParams(filteredParams).toString()
    const url = `${baseUrl}?${queryString}`

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then((data) => {
        setBestSessions(data.data || [])
      })
  }, [activeOption])

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
          options={['전체보기', '부트캠프', '파트너스']}
          placeholder="세션 제목 혹은 이름을 검색해보세요"
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
        {/* <div className="bg-filterbg flex items-center w-[1200px] h-[100px] px-4 gap-4 my-4">
          <FilterBtn title="Frontend" />
          <FilterBtn title="1기" />
        </div> */}
        <div className="grid grid-cols-3 gap-8">
          {bestSessions.map((bestSession) => (
            <SessionPost
              key={bestSession.id}
              likeCount={bestSession.likeCount}
              id={bestSession.id}
              thumbnail={bestSession.thumbnail}
              title={bestSession.title}
              date={bestSession.date}
              presenter={bestSession.presenter}
              onDelete={handleDeleteSession}
            />
          ))}
        </div>
        <AddBtn />
      </div>
    </div>
  )
}
