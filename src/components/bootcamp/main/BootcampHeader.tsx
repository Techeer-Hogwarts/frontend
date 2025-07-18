import React from 'react'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { toogleBootcampParticipation } from '@/api/bootcamp/toogleBootcampParticipation'

interface BootcampHeaderProps {
  ModalOpen: () => void
}

const BootcampHeader: React.FC<BootcampHeaderProps> = ({ ModalOpen }) => {
  const [currentBootcampYear, setCurrentBootcampYear] = useState<number | null>(
    null,
  )
  const [userBootcampYear, setUserBootcampYear] = useState<number | null>(null)
  const [parsedUser, setParsedUser] = useState(null)

  useEffect(() => {
    const storedAuth =
      typeof window !== 'undefined'
        ? localStorage.getItem('auth-storage')
        : null
    if (storedAuth) {
      try {
        const parsed = JSON.parse(storedAuth)
        setParsedUser(parsed)
        setUserBootcampYear(parsed?.state?.user?.bootcampYear ?? null)
      } catch (e) {
        console.error('로컬 유저 파싱 실패', e)
      }
    }
    const fetchBootcampInfo = async () => {
      try {
        const res = await fetch('/api/v1/bootcamps?cursorId=0&limit=10', {
          method: 'GET',
          credentials: 'include',
        })
        const data = await res.json()
        setCurrentBootcampYear(data.currentBootcampYear ?? null)
      } catch (e) {
        console.error('부트캠프 정보 가져오기 실패', e)
      }
    }

    fetchBootcampInfo()
  }, [])

  const participating =
    currentBootcampYear !== null && currentBootcampYear === userBootcampYear

  const handleToggleParticipation = async () => {
    if (!parsedUser?.state?.isLoggedIn) {
      alert('로그인 후 시도해주세요.')
      return
    }

    try {
      const confirmed = confirm(
        participating
          ? '참여를 취소하시겠습니까?'
          : '부트캠프에 참여하시겠습니까?',
      )
      if (!confirmed) return

      await toogleBootcampParticipation()

      const storedAuth = localStorage.getItem('auth-storage')
      if (storedAuth) {
        const parsed = JSON.parse(storedAuth)
        parsed.state.user.bootcampYear = participating
          ? null
          : currentBootcampYear
        localStorage.setItem('auth-storage', JSON.stringify(parsed))
        setUserBootcampYear(parsed.state.user.bootcampYear)
      }
    } catch (err) {}
  }

  return (
    <div className="flex justify-between mt-14 mb-[2.84rem] w-[100%]">
      <div className="text-left">
        <p className="text-[2rem] font-bold">부트캠프 프로젝트</p>
        <p className="text-[1.25rem]">
          부트캠프 참여자들의 프로젝트를 확인해보세요.
        </p>
      </div>

      <div className="flex flex-row gap-5">
        {participating ? (
          <button
            onClick={handleToggleParticipation}
            className="flex items-center gap-2 w-[13rem] h-[3rem] rounded-xl shadow-md text-[1.1rem] font-medium justify-center hover:shadow-custom"
          >
            <span>부트캠프 참여 취소</span>
            <Image src="/star.svg" alt="star" width={20} height={20} />
          </button>
        ) : (
          <button
            onClick={handleToggleParticipation}
            className="flex items-center gap-2 w-[13rem] h-[3rem] rounded-xl shadow-md text-[1.1rem] font-medium justify-center hover:shadow-custom"
          >
            <span>부트캠프 참여</span>
            <Image src="/star.svg" alt="join" width={20} height={20} />
          </button>
        )}

        <button
          onClick={() => {
            if (!participating) {
              alert('부트캠프 참여자만 프로젝트를 등록 할 수 있습니다.')
              return
            }
            ModalOpen()
          }}
          className="flex items-center gap-2 w-[13rem] h-[3rem] rounded-xl shadow-md text-[1.1rem] font-medium justify-center hover:shadow-custom"
        >
          <span>부트캠프 등록하기</span>
          <Image src="/star.svg" alt="star" width={20} height={20} />
        </button>
      </div>
    </div>
  )
}

export default BootcampHeader
