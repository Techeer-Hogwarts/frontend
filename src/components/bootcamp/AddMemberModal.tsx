'use client'

import React, { useEffect, useState } from 'react'
import { getBootcampMembers } from '@/api/bootcamp/getBootcampMembers'
import { BootcampMemberType } from '@/types/bootcamp/bootcamp'

interface Member {
  userId: number
  name: string
  position: string
  isLeader: boolean
}

interface AddMemberModalProps {
  onClose: () => void
  setMembers: (members: Member[]) => void
  initialMembers: BootcampMemberType[]
}

const AddMemberModal = ({
  onClose,
  setMembers,
  initialMembers,
}: AddMemberModalProps) => {
  const [inputName, setInputName] = useState('')
  const [selectedRole, setSelectedRole] = useState('Member')
  const [selectedPosition, setSelectedPosition] = useState('')
  const [memberList, setMemberList] = useState<Member[]>([])
  const [bootcampProfiles, setBootcampProfiles] = useState<
    { id: number; name: string }[]
  >([])

  const filteredProfiles = bootcampProfiles.filter((p) =>
    p.name.toLowerCase().includes(inputName.toLowerCase()),
  )

  useEffect(() => {
    const fetchAndSetMembers = async () => {
      try {
        const data = await getBootcampMembers()
        setBootcampProfiles(data.profiles)

        const transformed = initialMembers.map((member) => {
          const matched = data.profiles.find((p) => p.id === member.userId)
          return {
            userId: member.userId,
            name: member.name || matched?.name || '알 수 없음',
            position: member.position,
            isLeader: member.isLeader,
          }
        })

        setMemberList(transformed)
      } catch (err) {
        console.error('멤버 초기화 실패:', err)
      }
    }

    fetchAndSetMembers()
  }, [initialMembers])

  const handleAddMember = () => {
    if (!inputName.trim()) {
      alert('이름을 입력해주세요.')
      return
    }

    if (!selectedPosition) {
      alert('Position을 선택해주세요.')
      return
    }

    const matched = bootcampProfiles.find((p) => p.name === inputName.trim())

    if (!matched) {
      alert('해당 이름의 유저가 존재하지 않습니다.')
      return
    }

    const newMember: Member = {
      userId: matched.id,
      name: matched.name,
      position: selectedPosition,
      isLeader: selectedRole === 'Leader',
    }

    setMemberList((prev) => [...prev, newMember])
    setInputName('')
    setSelectedRole('Member')
    setSelectedPosition('')
  }

  const handleSave = () => {
    setMembers(memberList)
    onClose()
  }

  const handleDeleteMember = (
    userId: number,
    position: string,
    isLeader: boolean,
  ) => {
    setMemberList((prev) =>
      prev.filter(
        (m) =>
          !(
            m.userId === userId &&
            m.position === position &&
            m.isLeader === isLeader
          ),
      ),
    )
  }

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 text-center">
      <div className="flex flex-col p-7 w-[36rem] h-[39.375rem] bg-white border rounded-xl">
        <p className="w-full text-[1.375rem] text-center mb-4">
          프로젝트 팀원 추가
        </p>

        {/* 이름 검색 + 옵션 */}
        <div className="mb-6">
          <p className="text-left mb-3">이름을 입력해주세요</p>
          <div className="flex items-center gap-1">
            <div className="relative">
              <input
                type="text"
                className="w-[17rem] h-[2rem] border border-gray rounded-sm px-2 focus:outline-none"
                placeholder="팀원 이름을 검색하세요"
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
              />
              {inputName && (
                <ul className="absolute z-10 w-[17rem] mt-1 bg-white border border-gray rounded shadow max-h-40 overflow-y-auto text-left text-sm">
                  {filteredProfiles.map((profile) => (
                    <li
                      key={profile.id}
                      className="px-2 py-1 hover:bg-gray-100"
                    >
                      <button
                        type="button"
                        onClick={() => setInputName(profile.name)}
                        className="w-full text-left"
                      >
                        {profile.name}
                      </button>
                    </li>
                  ))}
                  {filteredProfiles.length === 0 && (
                    <li className="px-2 py-1 text-gray-400">
                      검색 결과가 없습니다
                    </li>
                  )}
                </ul>
              )}
            </div>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="text-sm border rounded px-1 h-[2rem] border-gray"
            >
              <option>Member</option>
              <option>Leader</option>
            </select>
            <select
              value={selectedPosition}
              onChange={(e) => setSelectedPosition(e.target.value)}
              className="text-sm border rounded px-1 h-[2rem] border-gray"
            >
              <option value="">Position</option>
              <option value="FE">Frontend</option>
              <option value="BE">Backend</option>
              <option value="DEV">DevOps</option>
            </select>
            <button
              onClick={handleAddMember}
              className="text-sm px-4 h-[2rem] bg-orange-400 text-white rounded"
            >
              추가
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto mb-6">
          <div className="flex flex-col gap-2">
            <p className="text-start font-bold text-primary">현재 멤버</p>
            {memberList.length > 0 ? (
              <div className="grid grid-cols-4 gap-4">
                {memberList.map((member, index) => (
                  <div
                    key={`${member.userId}-${member.position}-${member.isLeader}-${index}`}
                    className="relative flex flex-col items-center"
                  >
                    <button
                      className="absolute top-0 right-3 text-xs text-primary"
                      onClick={() =>
                        handleDeleteMember(
                          member.userId,
                          member.position,
                          member.isLeader,
                        )
                      }
                    >
                      X
                    </button>
                    <div className="mt-1 text-base">{member.name}</div>
                    <div className="text-xs text-gray">{member.position}</div>
                    {member.isLeader && (
                      <div className="text-[10px] text-white bg-black bg-opacity-40 rounded px-2 mt-1">
                        Leader
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray w-full">
                아직 추가된 멤버가 없습니다.
              </p>
            )}
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className="flex gap-4 mt-auto pt-4">
          <button
            onClick={onClose}
            type="button"
            className="w-full rounded-md text-sm h-[34px] bg-white border border-gray hover:bg-gray-100 hover:border-gray-400"
          >
            취소
          </button>
          <button
            onClick={handleSave}
            type="button"
            className="w-full rounded-md text-sm h-[34px] bg-primary text-white hover:bg-blue-600"
          >
            저장하기
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddMemberModal
