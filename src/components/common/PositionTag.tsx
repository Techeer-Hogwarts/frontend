'use client'

import { getPositionStyle } from '@/styles/positionStyles'

interface PositionProps {
  position: string
}

function formatPosition(position: string): string {
  switch (position) {
    case 'FRONTEND':
      return 'Frontend'
    case 'BACKEND':
      return 'Backend'
    case 'FULL_STACK':
      return 'FullStack'
    case 'DATA_ENGINEER':
      return 'Data'
    case 'DEVOPS':
      return 'DevOps'
    default:
      return position // 매칭 안 되면 그대로 표시
  }
}

const PositionTag: React.FC<PositionProps> = ({ position }) => {
  const { bg, textColor } = getPositionStyle(position)

  const displayPosition = formatPosition(position)

  return (
    <div
      className={`flex justify-center h-[1.4rem] bg-${bg} rounded-md text-sm items-center px-1`}
    >
      <span className={`${textColor}`}>{displayPosition}</span>
    </div>
  )
}

export default PositionTag
