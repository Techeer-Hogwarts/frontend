'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import SmallMemberBox from './SmallMemberBox'
import { getSearchResults } from '@/api/search/getSearch' // 검색 API import
import { useAuthStore } from '@/store/authStore'

interface Member {
  id: number
  name: string
  year: string
  profileImage?: string | null
  isLeader: boolean
}

interface MemberModalProps {
  existingMembers: any
  onClose: () => void
  onSave: (selectedMembers: Member[]) => void
}

const MemberModal = ({
  existingMembers,
  onClose,
  onSave,
}: MemberModalProps) => {
  const dropDownRef = useRef<HTMLInputElement>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [name, setName] = useState('')
  const [members, setMembers] = useState<Member[]>([])
  const [searchResults, setSearchResults] = useState<Member[]>([]) // 검색 결과
  const [isSearching, setIsSearching] = useState(false) // 검색 로딩 상태

  // 현재 사용자
  const { user } = useAuthStore()

  // 검색 함수
  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([])
      setIsDropdownOpen(false)
      return
    }

    setIsSearching(true)
    try {
      const response = await getSearchResults('user', query)
      const results = response?.results || []

      if (!Array.isArray(results)) {
        setSearchResults([])
        setIsDropdownOpen(false)
        return
      }

      // 검색 결과에서 이미 추가된 멤버들 필터링
      const filteredResults = results.filter((user: any) => {
        const userId = typeof user.id === 'string' ? parseInt(user.id) : user.id

        // 1) 이미 모달 내부(members)에 추가된 유저는 제외
        const inModal = members.some((m) => m.id === userId)
        if (inModal) return false

        // 2) 이미 상위(existingMembers)에 있으면 제외
        const inExisting = existingMembers?.some(
          (em) => em.userId === userId || em.id === userId,
        )
        if (inExisting) return false

        return true
      })

      // Member 타입에 맞게 데이터 변환
      const transformedResults = filteredResults.map((user: any) => ({
        id: typeof user.id === 'string' ? parseInt(user.id) : user.id,
        name: user.name || '',
        year:
          typeof user.year === 'string'
            ? user.year
            : user.year?.toString() || '0',
        profileImage: user.profileImage || null,
        isLeader: false,
      }))

      setSearchResults(transformedResults)
      setIsDropdownOpen(transformedResults.length > 0)
    } catch (error) {
      console.error('검색 실패:', error)
      setSearchResults([])
      setIsDropdownOpen(false)
    } finally {
      setIsSearching(false)
    }
  }

  // 입력값 변경 시 검색 실행 (디바운싱)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (name.trim()) {
        handleSearch(name)
      } else {
        setSearchResults([])
        setIsDropdownOpen(false)
      }
    }, 300) // 300ms 디바운싱

    return () => clearTimeout(timer)
  }, [name, members, existingMembers]) // members와 existingMembers 변경 시에도 재검색

  // 사람 선택
  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setName(value)
  }

  //컴포넌트에 입력자 자동 추가
  useEffect(() => {
    if (user) {
      const alreadyExists = existingMembers?.some(
        (m) => m.userId === user.id || m.id === user.id,
      )
      if (!alreadyExists) {
        // 모달 내부 members에도 없으면 추가
        setMembers((prev: any) => {
          const inModal = prev.some((mm) => mm.id === user.id)
          if (!inModal) {
            return [
              ...prev,
              {
                id: user.id,
                name: user.name,
                year: user.year?.toString() || '0',
                profileImage: user.profileImage,
                isLeader: true, // 원하는 초기값
              },
            ]
          }
          return prev
        })
      }
    }
  }, [user, existingMembers])

  // 바깥 클릭 시 드롭다운 닫기
  useEffect(() => {
    const outSideClick = (e: MouseEvent) => {
      if (!dropDownRef.current?.contains(e.target as Node))
        setIsDropdownOpen(false)
    }
    if (!isDropdownOpen) return
    document.addEventListener('click', outSideClick)
    return () => {
      document.removeEventListener('click', outSideClick)
    }
  }, [isDropdownOpen])

  // 멤버 추가
  const handleAddMember = (member: Member) => {
    if (!members.some((m) => m.id === member.id)) {
      setMembers((prevMembers) => [
        ...prevMembers,
        { ...member, isLeader: false },
      ])
    }
    setName('') // 검색어 초기화
    setSearchResults([]) // 검색 결과 초기화
    setIsDropdownOpen(false)
  }

  // 멤버 삭제
  const handleRemoveMember = (name: string) => {
    setMembers((prevMembers) =>
      prevMembers.filter((member) => member.name !== name),
    )
  }

  // 리더 업데이트 함수
  const handleUpdateLeader = (id: number, isLeader: boolean) => {
    setMembers((prevMembers) =>
      prevMembers.map((member) =>
        member.id === id ? { ...member, isLeader } : member,
      ),
    )
  }

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 text-center">
      <div className="flex flex-col p-7 w-[30.375rem] h-[39.375rem] bg-white border rounded-xl">
        <p className="w-full text-[1.375rem] text-center mb-4">
          스터디 팀원 추가
        </p>
        <div className="mb-6 relative">
          <p className="text-left mb-3">이름을 입력해주세요</p>
          <div className="relative">
            <input
              type="text"
              className="w-full h-[2rem] border border-gray rounded-sm px-2 focus:outline-none"
              value={name}
              onChange={handleName}
              placeholder="팀원 이름을 검색하세요"
              ref={dropDownRef}
            />

            {/* 검색 로딩 표시 */}
            {isSearching && (
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>

          {/* 드롭다운 */}
          {isDropdownOpen && searchResults.length > 0 && (
            <div
              className="absolute w-full bg-white border border-gray mt-1 max-h-48 overflow-y-auto z-50 rounded-sm shadow-lg"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(0, 0, 0, 0.2) transparent',
              }}
            >
              {searchResults.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center gap-2 p-2 cursor-pointer hover:bg-lightprimary"
                  onClick={() => handleAddMember(member)}
                >
                  <Image
                    src={member.profileImage || '/default-profile.png'}
                    alt="ProfileInfo"
                    width={24}
                    height={24}
                    className="w-[24px] h-[24px] rounded-md"
                  />
                  <div className="flex gap-3 items-center">
                    <p>{member.name}</p>
                    <p className="text-gray text-xs">{member.year}기</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 검색 결과 없음 */}
          {isDropdownOpen &&
            !isSearching &&
            name.trim() &&
            searchResults.length === 0 && (
              <div className="absolute w-full bg-white border border-gray mt-1 p-3 z-50 rounded-sm shadow-lg text-center text-gray">
                검색 결과가 없습니다.
              </div>
            )}
        </div>

        <div
          className={`flex flex-wrap justify-between w-full h-[25rem] overflow-y-auto gap-2 ${members.length > 10 ? '' : 'px-1'}`}
        >
          {members.length > 0 ? (
            members.map((member) => (
              <SmallMemberBox
                key={member.id}
                name={member.name}
                generation={member.year}
                imageSrc={member.profileImage || '/default-profile.png'}
                isLeader={member.isLeader}
                onClose={() => handleRemoveMember(member.name)}
                onUpdate={(isLeader) => handleUpdateLeader(member.id, isLeader)}
              />
            ))
          ) : (
            <p className="text-center text-gray-500">
              아직 추가된 멤버가 없습니다.
            </p>
          )}
        </div>

        <div className="flex gap-4 mt-auto pt-4">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-md text-sm h-[34px] bg-white text-gray border border-lightgray"
          >
            취소
          </button>
          <button
            type="submit"
            className={`w-full rounded-md text-sm h-[34px] text-white ${members.length > 0 ? 'bg-primary text-white' : 'bg-lightgray'}`}
            onClick={() => onSave(members)}
          >
            저장하기
          </button>
        </div>
      </div>
    </div>
  )
}

export default MemberModal
