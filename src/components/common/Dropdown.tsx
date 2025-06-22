import { useState, useRef, useEffect } from 'react'

export interface DropdownProps<T extends string> {
  title: string
  options: readonly T[]
  selectedOptions: T[]
  setSelectedOptions: React.Dispatch<React.SetStateAction<T[]>>
  singleSelect?: boolean
}

function Dropdown<T extends string>({
  title,
  options,
  selectedOptions,
  setSelectedOptions,
  singleSelect = false,
}: DropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const toggleDropdown = () => setIsOpen(!isOpen)

  const handleSelect = (option: T) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option))
    } else if (singleSelect) {
      setSelectedOptions([option])
    } else {
      setSelectedOptions([...selectedOptions, option])
    }
  }

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
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={dropdownRef} className="relative w-[10rem]">
      <button
        onClick={toggleDropdown}
        className="flex w-full h-[35px] px-4 text-left bg-white border border-black rounded-full justify-between items-center"
      >
        <span className="text-[1rem]">{title}</span>
        <span className="text-xs">▼</span>
      </button>
      {isOpen && (
        <ul className="absolute left-0 right-0 z-10 bg-white rounded-lg shadow-lg mt-1.5 max-h-[17rem] overflow-y-auto">
          {options.map((option, index) => (
            <li
              key={option}
              onClick={() => handleSelect(option)}
              className={`relative flex items-center justify-between px-2.5 py-2.5 cursor-pointer ${
                selectedOptions.includes(option) ? 'bg-[#FFF3EC]' : ''
              } hover:bg-[#FFF3EC] ${index === 0 ? 'rounded-t-lg' : ''} ${
                index === options.length - 1 ? 'rounded-b-lg' : ''
              }`}
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
              {selectedOptions.includes(option) && (
                <span className="font-medium text-primary">✓</span>
              )}
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

export default Dropdown
