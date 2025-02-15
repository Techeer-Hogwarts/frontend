'use client'

import TapBtn from './TapBtn'
import SearchBar from './SearchBar'
import { useTapBarStore } from '@/store/tapBarStore'
import { useEffect } from 'react'

interface TapBarProps {
  readonly options: string[]
  readonly placeholder: string
  onSearch: (query: string) => void
}

export default function TapBar({
  options,
  placeholder,
  onSearch,
}: TapBarProps) {
  const { activeOption, setActiveOption } = useTapBarStore()
  useEffect(() => {
    if (!activeOption && options.length > 0) {
      setActiveOption(options[0])
    }
  })

  return (
    <div>
      <div className="flex items-center">
        {options.map((option) => (
          <div key={option} className="flex items-center">
            <TapBtn
              isActive={activeOption === option}
              onClick={() => setActiveOption(option)}
            >
              {option}
            </TapBtn>
            {option !== options[options.length - 1] && (
              <div className="h-4 w-[1px] bg-gray" />
            )}
          </div>
        ))}

        <div className="ml-auto">
          <SearchBar placeholder={placeholder} onSearch={onSearch} />
        </div>
      </div>

      <div className="w-auto h-[1px] mt-5 bg-gray" />
    </div>
  )
}
