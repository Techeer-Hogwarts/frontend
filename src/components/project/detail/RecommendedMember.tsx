'use client'

import { useState } from 'react'
import Image from 'next/image'
import { IoChevronDownSharp, IoChevronUpSharp } from 'react-icons/io5'

interface Member {
  name: string
  num: string
  role: string
  imgUrl: string
}

const members: Member[] = [
  { name: '홍길동', num: '8기', role: 'Frontend', imgUrl: '' },
  { name: '홍길동', num: '8기', role: 'Frontend', imgUrl: '/.png' },
  { name: '홍길동', num: '8기', role: 'Frontend', imgUrl: '/.png' },
  { name: '홍길동', num: '8기', role: 'Frontend', imgUrl: '/.png' },
  { name: '홍길동', num: '8기', role: 'Frontend', imgUrl: '/.png' },
  { name: '홍길동', num: '8기', role: 'Frontend', imgUrl: '/.png' },
  { name: '홍길동', num: '8기', role: 'Frontend', imgUrl: '/.png' },
  { name: '홍길동', num: '8기', role: 'Frontend', imgUrl: '/.png' },
  { name: '홍길동', num: '8기', role: 'Frontend', imgUrl: '/.png' },
  { name: '홍길동', num: '8기', role: 'Frontend', imgUrl: '/.png' },
  { name: '홍길동', num: '8기', role: 'Frontend', imgUrl: '/.png' },
]
function Box({ name, imgUrl, num, role }: BoxProps) {
  return (
    <div className="flex items-center justify-between w-[18rem] h-[2.75rem] p-2 bg-gray-100  hover:bg-[#F5F5F5]">
      <div className="flex items-center">
        <Image
          src={imgUrl}
          width={42}
          height={42}
          alt="Picture"
          className="border rounded-sm mr-[0.75rem]"
        />
        <div className="flex items-center gap-1">
          <p className="font-semibold">{name}</p>
          <p className="text-[#7B7B7B] text-sm">{num}</p>
        </div>
      </div>
      <div className="bg-lightblue text-blue px-3 py-1 rounded-md text-sm ">
        {role}
      </div>
    </div>
  )
}

export default function MemberList() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="mt-[1rem]">
      {/* 드롭다운 버튼 */}
      <div
        role="buton"
        onClick={toggleDropdown}
        className="w-[19rem] gap-32 px-[1.63rem] h-[2.4375rem] flex items-center bg-white rounded-lg shadow-md border border-primary cursor-pointer"
      >
        추천 멤버 보기
        {isOpen ? <IoChevronUpSharp /> : <IoChevronDownSharp />}
      </div>
      {/* 드롭다운 내용 */}

      <div
        className={`${
          isOpen ? 'max-h-96' : 'max-h-0'
        }  overflow-y-auto transition-max-height duration-500 ease-in-out  w-[19rem]  mt-3 flex flex-col gap-2 shadow-bgshadow rounded-[0.63rem]  "`}
      >
        {members.map((member) => (
          <Box
            key={member.name}
            name={member.name}
            imgUrl={member.imgUrl}
            num={member.num}
            role={member.role}
          />
        ))}
      </div>
    </div>
  )
}
interface BoxProps {
  name: string
  imgUrl: string
  num: string
  role: string
}
