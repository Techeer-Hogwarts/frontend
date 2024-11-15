'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'

interface MemberProps {
  members: Array<{ name: string; role: string }>
}

export default function Member({ members }: MemberProps) {
  const [isProject, setIsProject] = useState(false)

  useEffect(() => {
    const projectType = localStorage.getItem('projectType')
    setIsProject(projectType === 'project')
  }, [])

  return (
    <div>
      <div className="text-[1.125rem] font-[600] mb-3">팀원</div>
      <div className="flex flex-wrap gap-3 w-[52.5rem] min-w-[52.5rem] p-[1.25rem] rounded-2xl border border-gray">
        {/* 멤버카드 */}
        {members.map((member, index) => (
          <React.Fragment key={index}>
            <div className="w-[4.75rem] h-[7.4375rem] flex flex-col items-center justify-center">
              <Image
                src="/profile.png"
                width={76}
                height={76}
                alt="Picture"
                className="border mb-2 rounded-md bg-lightpink"
              />
              <div>{member.name}</div>
              {isProject && <div>{member.role}</div>}
            </div>
            {/* 줄바꿈 시 구분선 추가 */}
            {(index + 1) % 9 === 0 && index + 1 !== members.length && (
              <div className="w-full border-b border-lightgray my-2"></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
