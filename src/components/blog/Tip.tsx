'use client'

import { useState } from 'react'

interface TooltipProps {
  children: React.ReactNode
}

export default function Tooltip({ children }: TooltipProps) {
  const [show, setShow] = useState(false)
  return (
    <div
      className="relative flex items-center"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <div className="tooltip-box">
          <div className="font-bold text-primary mb-1">블로깅 챌린지란?</div>
          <div className="text-gray text-sm mb-2">
            2주에 한 번씩 기술 블로그 작성에 도전하는 챌린지
          </div>
          <div className="font-bold text-primary mb-1">규칙</div>
          <ul className="list-disc ml-5 text-gray text-sm space-y-[2px]">
            <li>2주에 기술 블로그 한 편씩 작성하여 인증</li>
            <li>25년 하반기는 8회 이상 제출하면 수료</li>
            <li>자신의 성장을 위한 것이므로 벌금이나 벌칙 無</li>
          </ul>
          <div className="font-bold text-primary mb-1">주의 사항</div>
          <ul className="list-disc ml-5 text-gray text-sm space-y-[2px]">
            <li>
              Techeer.zip 나의 정보에 등록된 블로그에 블로그를 작성하면 자동으로
              참여가 완료됩니다.
            </li>
            <li>하루 한 번 자동으로 참여 현황이 업데이트 됩니다.</li>
            <li>블로그를 업로드 후 바로 적용이 되지 않습니다.</li>
          </ul>
        </div>
      )}
    </div>
  )
}
