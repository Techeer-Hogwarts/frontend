'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { RxQuestionMarkCircled } from 'react-icons/rx'
import { getPositionStyle } from '@/styles/positionStyles'

interface MemberProps {
  members: Array<{
    name: string
    isLeader: boolean
    teamRole: string
    profileImage: string
  }>
}

export default function Member({ members }: any) {
  if (!members || members.length === 0) {
    return (
      <div>
        <div className="text-[1.125rem] font-[600] mb-3">팀원</div>
        <div className="flex items-center justify-center w-[52.5rem] min-w-[52.5rem] p-[1.25rem] rounded-2xl border border-gray text-center ">
          <p className="text-sm text-gray">현재 팀원이 없습니다.</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="text-[1.125rem] font-[600] mb-3">팀원</div>

      <div className="grid grid-cols-9 gap-3 w-[52.5rem] min-w-[52.5rem] px-[1.875rem] py-[1.5rem] rounded-2xl border border-gray">
        {members.map((member, index) => {
          const { bg, textColor } = getPositionStyle(member.teamRole)

          const displayRole =
            member.teamRole === 'DataEngineer' ? 'Data' : member.teamRole

          return (
            <div key={member.name}>
              <div className="relative w-[4.75rem] h-[7.4375rem] flex flex-col items-center justify-center">
                <Image
                  src={member.profileImage}
                  width={76}
                  height={76}
                  alt="ProfileInfo"
                  className="border rounded-md  object-cover w-[76px] h-[76px]"
                />
                {member.isLeader && (
                  <div
                    className={`absolute ${
                      member.teamRole ? 'bottom-[45px]' : 'bottom-8'
                    } w-[4.75rem] h-[1.5rem] bg-black bg-opacity-40 flex items-center justify-center rounded-b-md`}
                  >
                    <span className="text-white text-sm font-semibold">
                      Leader
                    </span>
                  </div>
                )}

                <div>{member.name}</div>

                {member.teamRole && (
                  <div
                    className={`
                      w-[4.5rem] rounded-md text-center
                      bg-${bg} ${textColor}
                    `}
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
