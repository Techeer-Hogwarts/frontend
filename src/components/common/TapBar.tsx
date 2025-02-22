'use client'

import TapBtn from './TapBtn'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useTapBarStore } from '@/store/tapBarStore'

interface TapBarProps {
  readonly options: string[]
  onSelect: (category: string) => void
}

export default function TapBar({ options, onSelect }: TapBarProps) {
  const { activeOption, setActiveOption } = useTapBarStore()
  const router = useRouter()
  useEffect(() => {
    if (!activeOption && options.length > 0) {
      setActiveOption(options[0])
    }
    // console.log('sssss', router)
    return () => {
      setActiveOption(options[0]) // 페이지 이동 시 상태 초기화
    }
  }, [])

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
