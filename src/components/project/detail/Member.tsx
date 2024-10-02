import React from 'react'
import Image from 'next/image'

export default function Member() {
  return (
    <div>
      <div className="text-[1.125rem] font-[600] mb-3">팀원</div>
      <div className="flex gap-3 w-[52.5rem] h-[10rem] p-[1.25rem] rounded-2xl border border-gray">
        {/* 멤버카드 */}
        {[1, 2, 3, 4, 5].map((member, index) => (
          <div
            key={index}
            className="w-[4.75rem] h-[7.4375rem] flex flex-col items-center justify-center"
          >
            <Image
              src="/profile.png"
              width={76}
              height={76}
              alt="Picture"
              className="border rounded-md bg-lightpink"
            />
            <div>홍길동</div>
            <div>Backend</div>
          </div>
        ))}
      </div>
    </div>
  )
}
