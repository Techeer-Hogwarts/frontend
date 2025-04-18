import React from 'react'
import Image from 'next/image'

export interface PositionSelectProps {
  selectedPositions: string[]
  handlePositionSelect: (position: string) => void
}

const PositionSelect: React.FC<PositionSelectProps> = ({
  selectedPositions,
  handlePositionSelect,
}) => {
  const positions = [
    'FRONTEND',
    'BACKEND',
    'DEVOPS',
    'FULL_STACK',
    'DATA_ENGINEER',
  ]

  return (
    <div>
      <div className="flex items-center bg-filterbg rounded-md text-xs text-pink justify-between px-3 py-4">
        {positions.map((position) => (
          <button
            key={position}
            type="button"
            onClick={() => handlePositionSelect(position)}
            className={`cursor-pointer px-2 relative py-2 border border-lightprimary ${
              selectedPositions.includes(position)
                ? 'bg-lightprimary'
                : 'bg-white'
            } rounded-md`}
          >
            {position}
            {selectedPositions.includes(position) && (
              <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center rounded-full bg-[#FF7816] text-white text-xs font-bold">
                {selectedPositions.indexOf(position) + 1}
              </span>
            )}
          </button>
        ))}
      </div>
      <div className="flex items-center mt-2">
        <Image
          src="/images/questionmark.svg"
          alt="check"
          width={12}
          height={12}
        />
        <p className="ml-1 text-xs text-gray">
          포지션은 최대 2개까지 선택 가능하며 선택 순서에 따라 Main 포지션과 Sub
          포지션이 결정됩니다.
        </p>
      </div>
    </div>
  )
}

export default PositionSelect
