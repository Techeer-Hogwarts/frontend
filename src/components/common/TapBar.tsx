'use client'

import TapBtn from './TapBtn'
import { useEffect } from 'react'
import { useTapBarStore } from '@/store/tapBarStore'

interface TapBarProps {
  readonly options: string[]
}

export default function TapBar({ options }: TapBarProps) {
  const { activeOption, setActiveOption } = useTapBarStore()
  useEffect(() => {
    setActiveOption(options[0])
  }, [])

  return (
    <div className="flex items-center">
      {options.map((option) => (
        <div key={option} className="flex items-center">
          <TapBtn
            isActive={activeOption === option}
            onClick={() => {
              setActiveOption(option)
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
