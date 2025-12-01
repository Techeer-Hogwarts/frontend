'use client'

import Image from 'next/image'
import { HallOfFameMember } from '@/types/home/HallOfFame'

interface Props {
  title: string
  member?: HallOfFameMember
}

export default function HallOfFameCard({ title, member }: Props) {
  return (
    <div className="relative border border-primary rounded-xl w-[24rem] h-[13rem] px-[20px] pt-7 pb-4">
      <div className="absolute -top-3 -left-3 bg-white px-2 flex items-center">
        <Image
          src="/images/home/Person.svg"
          alt="icon"
          width={20}
          height={20}
        />
        <h2 className="text-xl text-black ml-2">{title}</h2>
      </div>
      {member ? (
        <div className="flex items-center gap-7 w-full h-full px-2">
          <Image
            src={member.profileImage || '/profile.png'}
            alt={`${member.name}의 프로필 이미지`}
            width={140}
            height={140}
            style={{ width: '140px', height: '140px' }}
            className="rounded-[10px] object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = '/profile.png'
            }}
          />
          <div className="flex flex-col text-sm">
            <span className="font-bold">{member.name}</span>
            <span className="text-sm mt-1 flex flex-col gap-1">
              <span>{member.school}</span>
              <span className="flex gap-2">
                <span>{member.status}</span>
                <span className="text-gray-300">|</span>
                <span>{member.generation}</span>
              </span>
            </span>
            <div className="mt-2 flex gap-2">
              <span className="text-xs px-2 py-[2px] bg-lightblue text-blue rounded-md">
                {member.mainPosition.charAt(0).toUpperCase() +
                  member.mainPosition.slice(1).toLowerCase()}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-full px-2">
          <p className="text-gray-500">
            랭킹 데이터를 불러오는데 실패했습니다.
          </p>
        </div>
      )}
    </div>
  )
}
