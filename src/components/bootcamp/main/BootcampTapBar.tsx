'use client'

import { useTapBarStore } from '@/store/tapBarStore'
import { useEffect } from 'react'

interface BootcampTapBarProps {
  readonly options: string[]
}

export default function BootcampTapBar({ options }: BootcampTapBarProps) {
  const { activeOption, setActiveOption } = useTapBarStore()

  useEffect(() => {
    if (!activeOption && options.length > 0) {
      setActiveOption(options[0])
    }
  }, [options, activeOption, setActiveOption])

  return (
    <div className="w-full">
      <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide z-50 p-2">
        {options.map((option) => {
          const isActive = activeOption === option
          return (
            <button
              key={option}
              onClick={() => setActiveOption(option)}
              className={`
                z-50 px-5 py-2.5 rounded-full text-base font-bold whitespace-nowrap transition-all duration-200 ease-in-out
                ${
                  isActive
                    ? 'bg-darkgray text-white shadow-md transform scale-105'
                    : 'bg-filterbg text-darkgray hover:bg-lightgray/50 border border-transparent'
                }
                `}
            >
              {option}
            </button>
          )
        })}
      </div>
      {/* Decorative line is handled by the container or distinct separation is not needed with pills */}
    </div>
  )
}
