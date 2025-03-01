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
  const [projectType, setProjectType] = useState<null | string>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedProjectType = localStorage.getItem('projectType')
      setProjectType(storedProjectType)
    }
  }, [])

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
                <div
                  className={`absolute ${projectType === 'study' ? 'bottom-9' : 'bottom-11'} w-[4.75rem] h-[1.5rem] bg-black bg-opacity-40 flex items-center justify-center rounded-b-md`}
                >
                  <span className="text-white text-sm font-semibold">
                    Leader
                  </span>
                </div>
              )}
              <div className="mt-2">{member.name}</div>
              {projectType === 'project' && (
                <div
                  className={`w-[5.875rem] h-[1.75rem] rounded-md bg-lightprimary text-pink text-[0.9375rem] text-center`}
                >
                  {member.teamRole}
                </div>
              )}
            </div>
            {/* 줄바꿈 시 구분선 추가 */}
            {(index + 1) % 9 === 0 && index + 1 !== members.length && (
              <div className="w-full border-b border-lightgray my-2"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
