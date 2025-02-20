'use client'

import { useState, useRef, useEffect } from 'react'

interface Category {
  name: string // 예: "FRONTEND", "BACKEND", "DEVOPS"
  options: string[]
}

interface StackDropdownProps {
  title: string
  categories: Category[] // 드롭다운에 표시할 카테고리별 스택 목록
  selectedOptions: string[] // 현재 체크된(선택된) 스택들
  setSelectedOptions: (options: string[]) => void
}

const StackDropdown: React.FC<StackDropdownProps> = ({
  title,
  categories,
  selectedOptions,
  setSelectedOptions,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // 드롭다운 열기/닫기
  const toggleDropdown = () => setIsOpen(!isOpen)

  // 체크박스 선택/해제 로직
  const handleSelect = (option: string) => {
    if (selectedOptions.includes(option)) {
      // 이미 선택된 항목이면 해제
      setSelectedOptions(selectedOptions.filter((item) => item !== option))
    } else {
      // 새로 선택
      setSelectedOptions([...selectedOptions, option])
    }
  }

  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div ref={dropdownRef} className="relative w-[16rem]">
      {/* 드롭다운 버튼 */}
      <button
        onClick={toggleDropdown}
        className="flex w-full px-4 py-2 text-left bg-white border border-gray rounded-full justify-between items-center"
      >
        <span className="text-sm text-gray">{title}</span>
        <span className="text-[10px] text-gray">▼</span>
      </button>

      {isOpen && (
        <div
          className="absolute left-0 right-0 z-10 bg-white rounded-lg shadow-lg mt-1.5 max-h-60 overflow-y-auto"
          style={{
            maxHeight: '200px',
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(0, 0, 0, 0.2) transparent',
          }}
        >
          {categories.map((category, catIndex) => (
            <div key={catIndex} className="pb-2">
              {/* 카테고리명 (예: FRONTEND, BACKEND, DEVOPS) */}
              <div className="px-2.5 py-2 font-bold  bg-lightprimary">
                {category.name}
              </div>

              {category.options.map((option, index) => (
                <div
                  key={option}
                  onClick={() => handleSelect(option)}
                  className={`relative flex items-center justify-between px-2.5 py-2 cursor-pointer ${
                    selectedOptions.includes(option) ? 'bg-[#FFF3EC]' : ''
                  } hover:bg-[#FFF3EC]`}
                >
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedOptions.includes(option)}
                      onChange={() => handleSelect(option)}
                      className="w-4 h-4 mr-2 border border-gray appearance-none rounded flex items-center justify-center checked:bg-primary checked:border-primary cursor-pointer checked:before:content-['✓'] checked:before:text-white checked:before:text-xs checked:before:flex checked:before:items-center checked:before:justify-center"
                    />
                    {option}
                  </div>
                  {/* 오른쪽 체크 아이콘 */}
                  {selectedOptions.includes(option) && (
                    <span className="font-medium text-primary">✓</span>
                  )}
                  {/* 항목 사이 구분선 (마지막 항목에는 표시 안 함) */}
                  {index !== category.options.length - 1 && (
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gray"></span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default StackDropdown
