'use client'

import TapBtn from './TapBtn'
import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useTapBarStore } from '@/store/tapBarStore'

interface TapBarProps {
  readonly options: string[]
  onSelect: (category: string) => void
}

export default function TapBar({ options, onSelect }: TapBarProps) {
  const { activeOption, setActiveOption } = useTapBarStore()
  const pathname = usePathname() // 경로를 추적
  useEffect(() => {
    setActiveOption(options[0]) // 페이지 이동 시 항상 첫 번째 옵션으로 초기화
  }, [pathname]) // 경로가 바뀔 때마다 실행

  return (
    <div>
      <div className="flex items-center">
        {options.map((option) => (
          <div key={option} className="flex items-center">
            <TapBtn
              isActive={activeOption === option}
              onClick={() => {
                setActiveOption(option)
                onSelect(option)
              }}
            >
              {option}
            </TapBtn>
            {option !== options[options.length - 1] && (
              <div className="h-4 w-[1px] bg-gray" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
