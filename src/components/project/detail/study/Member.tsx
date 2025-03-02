'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'

interface MemberProps {
  members: Array<{
    name: string
    isLeader: boolean
    teamRole: string
    profileImage: string
  }>
}

export default function Member({ members }: any) {
  return (
    <div>
      <div className="text-[1.125rem] font-[600] mb-3">팀원</div>
      <div className="flex flex-wrap gap-3 w-[52.5rem] min-w-[52.5rem] p-[1.25rem] rounded-2xl border border-gray">
        {/* 멤버카드 */}
        {members?.map((member, index) => (
          <div key={member.name}>
            <div className="relative w-[4.75rem] h-[7.4375rem] flex flex-col items-center justify-center">
              <Image
                src={member.profileImage}
                width={76}
                height={76}
                alt="Picture"
                className="mas-w-[4.75rem] max-h-[4.75rem] border rounded-md object-cover"
              ></Image>
              {member.isLeader && (
                <div className="absolute bottom-9 w-[4.75rem] h-[1.5rem] bg-black bg-opacity-40 flex items-center justify-center rounded-b-md">
                  <span className="text-white text-sm font-semibold">
                    Leader
                  </span>
                </div>
              )}
              <div className="mt-2">{member.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
