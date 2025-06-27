'use client'

import React from 'react'
import Image from 'next/image'

const AddMemberModal = ({ onClose, setMembers }) => {
  const mockSelectedMembers = [
    {
      id: 1,
      name: '홍길동',
      profileImage: null,
      teamRole: 'FRONTEND',
      isLeader: true,
    },
    {
      id: 2,
      name: '김개발',
      profileImage: null,
      teamRole: 'BACKEND',
      isLeader: false,
    },
  ]

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 text-center">
      <div className="flex flex-col p-7 w-[36rem] h-[39.375rem] bg-white border rounded-xl">
        <p className="w-full text-[1.375rem] text-center mb-4">
          프로젝트 팀원 추가
        </p>

        {/* 이름 검색 */}
        <div className="mb-6 relative">
          <p className="text-left mb-3">이름을 입력해주세요</p>
          <div className="relative">
            <input
              type="text"
              className="w-full h-[2rem] border border-gray rounded-sm px-2 focus:outline-none"
              placeholder="팀원 이름을 검색하세요"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto mb-6">
          <div className="flex flex-col gap-2">
            {mockSelectedMembers.length > 0 ? (
              <div className="grid grid-cols-4 gap-4">
                {mockSelectedMembers.map((member) => (
                  <div key={member.id} className="flex flex-col items-center">
                    <Image
                      src={member.profileImage || '/default-profile.png'}
                      alt="Profile"
                      width={60}
                      height={60}
                      className="rounded-full border"
                    />
                    <div className="mt-1 text-sm">{member.name}</div>
                    <div className="text-xs text-gray">{member.teamRole}</div>
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
            type="submit"
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
