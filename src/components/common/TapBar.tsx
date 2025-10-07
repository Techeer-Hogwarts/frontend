'use client'

import TapBtn from './TapBtn'
import { useEffect, useRef } from 'react'
import { useTapBarStore } from '@/store/tapBarStore'

interface TapBarProps {
  readonly options: string[]
  onOptionChange?: (option: string) => void
  initialOption?: string
}

export default function TapBar({
  options,
  onOptionChange,
  initialOption,
}: TapBarProps) {
  const { activeOption, setActiveOption } = useTapBarStore()
  
  // URL 쿼리와 동기화된 옵션 사용
  const currentOption = initialOption || activeOption || options[0]
  
  useEffect(() => {
    // initialOption이 있으면 store와 동기화
    if (initialOption && initialOption !== activeOption) {
      setActiveOption(initialOption)
    } else if (!activeOption && options.length > 0) {
      setActiveOption(options[0])
    }
  }, [initialOption])

  const handleOptionClick = (option: string) => {
    setActiveOption(option)
    if (onOptionChange) {
      onOptionChange(option)
    }
  }

  return (
    <div className="flex items-center">
      {options.map((option) => (
        <div key={option} className="flex items-center">
          <TapBtn
            isActive={currentOption === option}
            onClick={() => {
              handleOptionClick(option)
            }}
          >
            {option}
          </TapBtn>
          {option !== options[options.length - 1] && (
            <div className="mx-4 h-4 w-[1px] bg-gray" />
          )}
        </div>
      ))}
    </div>
  )
}
