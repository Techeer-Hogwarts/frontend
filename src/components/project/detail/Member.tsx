'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { RxQuestionMarkCircled } from 'react-icons/rx'

interface MemberProps {
  members: Array<{
    name: string
    isLeader: boolean
    teamRole: string
    profileImage: string
  }>
}

export default function Member({ members }: MemberProps) {
  const [projectType, setProjectType] = useState<null | string>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedProjectType = localStorage.getItem('projectType')
      setProjectType(storedProjectType)
    }
  }, [])

  if (!members || members.length === 0) {
    return (
      <div>
        <div className="text-[1.125rem] font-[600] mb-3">팀원</div>
        <div className="flex items-center justify-center w-[52.5rem] min-w-[52.5rem] h-[10rem] p-[1.25rem] rounded-2xl border border-gray text-center ">
          <p className="text-sm text-gray">현재 팀원이 없습니다.</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="text-[1.125rem] font-[600] mb-3">팀원</div>
      <div className="flex justify-start gap-1 text-xs items-center text-gray mb-1">
        <RxQuestionMarkCircled /> Data: DataEngineer
      </div>
      <div className="grid grid-cols-9 gap-3 w-[52.5rem] min-w-[52.5rem] h-[10rem] px-[1.875rem] py-[1.5rem] rounded-2xl border border-gray">
        {/* 멤버카드 */}
        {members?.map((member, index) => (
          <div key={member.name}>
            <div className="relative w-[4.75rem] h-[7.4375rem] flex flex-col items-center justify-center">
              <Image
                src={member.profileImage}
                width={76}
                height={76}
                alt="Profile"
                className="border rounded-md bg-lightpink object-cover w-[76px] h-[76px]"
              />
              {member.isLeader && (
                <div
                  className={`absolute ${projectType === 'study' ? 'bottom-8' : 'bottom-[45px]'} w-[4.75rem] h-[1.5rem] bg-black bg-opacity-40 flex items-center justify-center rounded-b-md`}
                >
                  <span className="text-white text-sm font-semibold">
                    Leader
                  </span>
                </div>
              )}
              <div>{member.name}</div>
              {projectType === 'project' && (
                <div className="w-[4.5rem] rounded-md bg-lightprimary text-pink text-center">
                  {member.teamRole === 'DataEngineer'
                    ? 'Data'
                    : member.teamRole}
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
