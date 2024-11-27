'use client'

import { useState } from 'react'
import SessionDropdownbtn from './SessionDropdownbtn'

interface SessionDropdownProps {
  titles: string[]
  options: string[]
  onSelect: (option: string) => void
}

export default function SessionDropdown({
  titles,
  options,
  onSelect,
}: SessionDropdownProps) {
  const [isClick, setIsClick] = useState(false)
  const [selectedTitle, setSelectedTitle] = useState('기간')

  const handleClick = () => {
    setIsClick(!isClick)
  }

  const handleOptionSelect = (index: number) => {
    setSelectedTitle(titles[index]) // 선택한 제목을 저장
    onSelect(options[index]) // 선택된 데이터를 부모에게 전달
    setIsClick(false)
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleClick}
        className={`w-[200px] px-4 rounded-sm text-sm flex items-center outline-none h-[34px] border ${isClick ? 'text-primary  border-primary' : ' text-gray border-lightgray'} justify-between`}
      >
        {selectedTitle}
        {isClick ? (
          <span className="text-primary text-xs">▲</span>
        ) : (
          <span className="text-gray text-xs">▼</span>
        )}
      </button>
      {isClick && (
        <div className="absolute flex flex-col right-0 top-10 rounded-sm w-[200px] bg-white shadow-md max-h-[150px] overflow-y-auto">
          {titles.map((title, index) => (
            <div key={options[index]} className="flex flex-col">
              <button
                type="button"
                onClick={() => handleOptionSelect(index)}
                className="text-left px-4 py-2 hover:bg-gray-100"
              >
                <SessionDropdownbtn title={title} />
              </button>
              {index !== titles.length - 1 && (
                <div className="w-full h-[1px] bg-lightgray" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
