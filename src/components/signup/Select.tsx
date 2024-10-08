import { useState } from 'react'

interface SelectProps {
  title: string // 드롭다운 버튼의 제목
  options: string[] // 드롭다운 항목 리스트
}

const Select: React.FC<SelectProps> = ({ title, options }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string | null>(null) // 선택된 항목 하나만 저장

  const toggleDropdown = () => setIsOpen(!isOpen)

  const handleSelect = (option: string) => {
    setSelectedOption(option) // 하나의 옵션만 선택 가능하도록
    setIsOpen(false) // 선택 후 드롭다운을 닫음
  }

  return (
    <div className="relative w-full">
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
