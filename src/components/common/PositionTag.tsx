'use client'

import { getPositionStyle } from '@/styles/positionStyles'

interface PositionProps {
  position: string
}

const PositionTag: React.FC<PositionProps> = ({ position }) => {
  const { bg, textColor } = getPositionStyle(position)

  return (
    <div
      className={`flex justify-center h-[1.4rem] bg-${bg} rounded-md text-sm items-center px-1`}
    >
      <span className={`${textColor}`}>{position}</span>
    </div>
  )
}

export default PositionTag
