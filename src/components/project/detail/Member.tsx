'use client'

import React from 'react'
import Image from 'next/image'
import { getPositionStyle } from '@/styles/positionStyles'

interface MemberType {
  name: string
  isLeader: boolean
  teamRole?: string
  profileImage?: string
}

interface MemberProps {
  /** 'project' 또는 'study' 모드 지정 */
  variant: 'project' | 'study'
  /** 팀원 배열 */
  members: MemberType[]
}

export default function Member({ variant, members }: MemberProps) {
  if (!members || members.length === 0) {
    return (
      <div>
        <div className="text-[1.125rem] font-semibold mb-3">팀원</div>
        <div className="flex items-center justify-center w-[52.5rem] min-w-[52.5rem] p-[1.25rem] rounded-2xl border border-gray text-center">
          <p className="text-sm text-gray">현재 팀원이 없습니다.</p>
        </div>
      </div>
    )
  }

  const containerClass =
    variant === 'project'
      ? 'grid grid-cols-9 gap-3 w-[52.5rem] min-w-[52.5rem] px-[1.875rem] py-[1.5rem] rounded-2xl border border-gray'
      : 'flex flex-wrap gap-3 w-[52.5rem] min-w-[52.5rem] p-[1.25rem] rounded-2xl border border-gray'

  return (
    <div>
      <div className="text-[1.125rem] font-semibold mb-3">팀원</div>
      <div className={containerClass}>
        {members.map((member) => {
          const { name, isLeader, teamRole, profileImage } = member
          const displayRole = teamRole === 'DataEngineer' ? 'Data' : teamRole
          const { bg, textColor } = getPositionStyle(teamRole)
          console.log(bg)

          return (
            <div key={name}>
              <div className="relative w-[4.75rem] h-[7.4375rem] flex flex-col items-center justify-center">
                <Image
                  src={profileImage}
                  width={76}
                  height={76}
                  alt={name}
                  className="border rounded-md object-cover w-[76px] h-[76px]"
                />
                {isLeader && (
                  <div
                    className={`absolute ${
                      variant === 'project'
                        ? teamRole
                          ? 'bottom-[48px]'
                          : 'bottom-8'
                        : 'bottom-9'
                    } w-[4.75rem] h-[1.5rem] bg-black bg-opacity-40 flex items-center justify-center rounded-b-md`}
                  >
                    <span className="text-white text-sm font-semibold">
                      Leader
                    </span>
                  </div>
                )}
                <div className="mt-2 font-medium">{name}</div>
                {variant === 'project' && teamRole && (
                  <div
                    className={`bg-${bg} ${textColor} w-[4.5rem] rounded-md text-center text-sm`}
                  >
                    {displayRole}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
