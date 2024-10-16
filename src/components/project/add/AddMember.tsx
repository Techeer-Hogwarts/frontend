'use client'

import { useState } from 'react'
import Image from 'next/image'
import { IoClose } from 'react-icons/io5'

interface TagProps {
  position: string
}

function Tag({ position }: TagProps) {
  return (
    <div className="flex items-center justify-center text-pink w-[4.75rem] h-[1.125rem] bg-lightprimary">
      {position}
    </div>
  )
}

export default function AddMember() {
  const [members, setMembers] = useState([
    { id: 1, name: '홍길동', role: ['Backend', 'DevOps'], leader: 'yes' },
    { id: 2, name: '홍길동', role: ['Backend'], leader: 'no' },
    { id: 3, name: '홍길동', role: ['Backend'], leader: 'no' },
    { id: 4, name: '홍길동', role: ['Frontend'], leader: 'no' },
    { id: 5, name: '홍길동', role: ['Frontend'], leader: 'no' },
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)

  // 멤버 삭제 함수
  const handleDelete = (id: number) => {
    setMembers(members.filter((member) => member.id !== id))
  }

  // 모달 창 열기
  const handleAddMember = () => {
    setIsModalOpen(true)
  }

  // 모달 닫기 함수
  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div>
      <div className="font-medium text-gray mb-3">
        팀원을 입력해주세요<span className="text-primary">*</span>
      </div>
      <div className="flex items-start pt-[1.5rem] pb-[2rem] gap-3 w-[52.5rem]  px-[1.25rem] rounded-2xl border border-gray">
        {/* 멤버카드 */}
        {members.map((member, index) => (
          <div
            key={index}
            className="relative w-[4.75rem] h-[7.4375rem]  flex flex-col items-center"
          >
            {/* X 버튼 */}
            <button
              onClick={() => handleDelete(member.id)}
              className="w-[0.8rem] h-[0.8rem]  absolute top-[-5px] right-[-5px] bg-primary text-white rounded-full flex items-center justify-center"
            >
              <IoClose />
            </button>

            <Image
              src="/profile.png"
              width={76}
              height={76}
              alt="Picture"
              className="border rounded-md bg-lightpink"
            />
            {/* 리더 표시 */}
            {member.leader === 'yes' && (
              <div className="absolute top-[3.2rem] left-0 w-full h-[1.5rem] bg-black bg-opacity-40 flex items-center justify-center rounded-b-md">
                <span className="text-white text-sm font-semibold">Leader</span>
              </div>
            )}

            <div>{member.name}</div>
            <div className="flex flex-col gap-1">
              {member.role.map((position) => (
                <Tag key={position} position={position} />
              ))}
            </div>
          </div>
        ))}

        {/* + 버튼 */}
        <button
          onClick={handleAddMember}
          className="w-[4.75rem] h-[4.75rem] flex flex-col items-center justify-center border border-gray rounded-md text-2xl shadow-sm hover:shadow-[0px_0px_4px_1px_rgba(138,138,138,0.73)]"
        >
          +
        </button>
      </div>

      {/* 모달 */}
      {/* {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md w-[400px]">
            {/* 닫기 버튼 */}
      {/* <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <IoClose size={24} />
            </button> */}

      {/* 타이틀 */}
      {/* <h2 className="text-2xl font-semibold text-center mb-5">
              프로젝트 팀원 추가
            </h2> */}

      {/* 이름 입력란 */}
      {/* <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                이름을 입력해주세요
              </label>
              <input
                type="text"
                placeholder="이름 입력"
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div> */}

      {/* 멤버 리스트 */}
      {/* <div className="w-[30.375rem] h-[39.375rem]">
              {members.map((member, index) => (
                <div
                  key={index}
                  className="flex w-full items-center border border-gray-300 p-3 rounded-lg"
                >
                  <Image
                    src="/profile.png"
                    width={50}
                    height={50}
                    alt="Profile"
                    className="rounded-md"
                  />
                  <div className="ml-3 flex-1">
                    <div className="font-semibold">{member.name} 8기</div>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {member.role.map((role, roleIndex) => (
                        <span
                          key={roleIndex}
                          className="text-xs bg-lightprimary text-primary px-2 py-1 rounded-full"
                        >
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(member.id)}
                    className="ml-3 text-red-500 hover:text-red-700"
                  >
                    <IoClose size={20} />
                  </button>
                </div>
              ))}
            </div> */}

      {/* 저장 버튼 */}
      {/* <div className="mt-6">
              <button className="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-primary-dark">
                저장하기
              </button>
            </div>
          </div>
        </div> */}
      {/* )} */}
    </div>
  )
}
