'use client'

import { useState } from 'react'
import SessionDropdownbtn from './SessionDropdownbtn'

interface SessionDropdownProps {
  options: string[]
}

export default function SessionDropdown({ options }: SessionDropdownProps) {
  const [isClick, setIsClick] = useState(false)
  const [selectedOption, setSelectedOption] = useState('기간') // 기본값을 '기간'으로 설정

  const handleClick = () => {
    setIsClick(!isClick)
  }

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option) // 선택한 옵션을 저장
    setIsClick(false) // 선택 후 드롭다운을 닫음
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        className={`w-[200px] px-4 rounded-sm text-sm flex items-center outline-none h-[34px] border ${isClick ? 'text-primary  border-primary' : ' text-gray border-lightgray'} justify-between`}
      >
        {selectedOption} {/* 선택된 옵션을 표시 */}
        {isClick ? (
          <span className="text-primary text-xs">▲</span>
        ) : (
          <span className="text-gray text-xs">▼</span>
        )}
      </button>
      {isClick && (
        <div className="absolute flex flex-col right-0 top-10 rounded-sm w-[200px] bg-white shadow-md">
          {options.map((option) => (
            <div key={option} className="flex flex-col">
              <button type="button" onClick={() => handleOptionSelect(option)}>
                <SessionDropdownbtn>{option}</SessionDropdownbtn>
              </button>
              {option !== options[options.length - 1] && (
                <div className="w-[199px] h-[1px] bg-lightgray" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
