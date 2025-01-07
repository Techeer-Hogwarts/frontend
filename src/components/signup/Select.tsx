'use client'

import { useState, useRef, useEffect } from 'react'

interface SelectProps {
  title: string // 드롭다운 버튼의 제목
  options: string[] // 드롭다운 항목 리스트
  value?: string // 현재 선택된 값
  onChange?: (option: string) => void
}

const Select: React.FC<SelectProps> = ({ title, options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string | null>(
    value || null,
  )
  const selectRef = useRef<HTMLDivElement>(null)

  // 드롭다운을 열거나 닫는 함수
  const toggleDropdown = () => setIsOpen(!isOpen)

  // 옵션을 선택하는 함수
  const handleSelect = (option: string) => {
    setSelectedOption(option) // 하나의 옵션만 선택 가능하도록
    if (onChange) onChange(option)
    setIsOpen(false) // 선택 후 드롭다운을 닫음
  }

  // 클릭 외부 감지를 통해 드롭다운을 닫는 효과
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // value prop이 변경되면 selectedOption을 업데이트
  useEffect(() => {
    setSelectedOption(value || null)
  }, [value])

  return (
    <div className="relative w-full" ref={selectRef}>
      <button
        onClick={toggleDropdown}
        className="flex justify-between items-center w-full h-10 px-4 border border-gray rounded-[0.25rem] text-gray focus:outline-none focus:border-primary focus:text-primary"
      >
        <span>{selectedOption ? selectedOption : title}</span>
        <span>▼</span>
      </button>
      {isOpen && (
        <ul
          className="absolute left-0 right-0 z-10 bg-white rounded-lg shadow-lg mt-1.5 overflow-y-auto"
          style={{
            maxHeight: '200px',
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(0, 0, 0, 0.2) transparent',
          }}
        >
          {options.map((option, index) => (
            <li
              key={option}
              onClick={() => handleSelect(option)}
              className={`relative flex items-center justify-between px-4 py-2.5 cursor-pointer ${
                selectedOption === option ? 'bg-[#FFF3EC]' : ''
              } hover:bg-[#FFF3EC] ${index === 0 ? 'rounded-t-lg' : ''} ${
                index === options.length - 1 ? 'rounded-b-lg' : ''
              }`}
            >
              {option}
              {index !== options.length - 1 && (
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gray"></span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Select
