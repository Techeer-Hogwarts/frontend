import React from 'react'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { toogleBootcampParticipation } from '@/api/bootcamp/toogleBootcampParticipation'
import { getBootcampYear } from '@/api/bootcamp/getBootcampYear'

interface BootcampHeaderProps {
  ModalOpen: () => void
}

const BootcampHeader: React.FC<BootcampHeaderProps> = ({ ModalOpen }) => {
  const [currentBootcampYear, setCurrentBootcampYear] = useState<number | null>(
    null,
  )
  const [userBootcampYear, setUserBootcampYear] = useState<number | null>(null)
  const [parsedUser, setParsedUser] = useState(null)
  const [participating, setParticipating] = useState(false)

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
  }, [])

  useEffect(() => {
    getBootcampYear().then((res) => {
      setCurrentBootcampYear(res.bootcampYear)
    })
  }, [])

  useEffect(() => {
    setParticipating(
      currentBootcampYear !== null && currentBootcampYear === userBootcampYear,
    )
  }, [currentBootcampYear, userBootcampYear])

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
    <div className="flex flex-row justify-between items-end mt-14 mb-12 w-full gap-6">
      <div className="text-left space-y-2">
        <h1 className="text-4xl font-extrabold text-darkgray tracking-tight">
          부트캠프 프로젝트
        </h1>
        <p className="text-lg text-gray-500 font-medium">
          부트캠프 참여자들의 열정이 담긴 프로젝트를 확인해보세요.
        </p>
      </div>

      <div className="flex flex-row gap-4">
        {participating ? (
          <button
            onClick={handleToggleParticipation}
            className="flex items-center gap-2 px-6 h-[3rem] rounded-full border-2 border-primary text-primary font-bold transition-all duration-300 hover:bg-primary hover:text-white shadow-sm hover:shadow-md"
          >
            <span>참여 취소</span>
            <Image
              src="/star.svg"
              alt="star"
              width={20}
              height={20}
              className="w-5 h-5"
            />
          </button>
        ) : (
          <button
            onClick={handleToggleParticipation}
            className="flex items-center gap-2 px-6 h-[3rem] rounded-full bg-primary text-white font-bold transition-all duration-300 hover:bg-darkPrimary shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            <span>부트캠프 참여</span>
            <Image
              src="/whiteplus.png"
              alt="join"
              width={16}
              height={16}
              className="w-4 h-4"
            />
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
          className="flex items-center gap-2 px-6 h-[3rem] rounded-full bg-darkgray text-white font-bold transition-all duration-300 hover:bg-black shadow-md hover:shadow-lg hover:-translate-y-0.5"
        >
          <span>프로젝트 등록</span>
          <Image
            src="/whiteplus.png"
            alt="register"
            width={16}
            height={16}
            className="w-4 h-4"
          />
        </button>
      </div>
    </div>
  )
}

export default BootcampHeader
