'use client'

import TapBtn from './TapBtn'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useTapBarStore } from '@/store/tapBarStore'

interface TapBarProps {
  readonly options: string[]
  onSelect: (category: string) => void
}

export default function TapBar({ options, onSelect }: TapBarProps) {
  const { activeOption, setActiveOption } = useTapBarStore()
  const pathname = usePathname()
  useEffect(() => {
    setActiveOption(options[0])
  }, [pathname])

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
              <div className="mx-4 h-4 w-[1px] bg-gray" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
