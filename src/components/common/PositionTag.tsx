'use client'

interface PositionProps {
  position: string
}

const PositionTag: React.FC<PositionProps> = ({ position }) => {
  // 입력된 포지션을 대문자로 변환
  const normalizedPosition = position.toUpperCase()

  // 포지션에 따른 색상 매핑
  const positionStyles: Record<
    'FRONTEND' | 'BACKEND' | 'DEVOPS' | 'FULL_STACK' | 'DATA_ENGINEER',
    { bg: string; text: string }
  > = {
    FRONTEND: {
      bg: 'bg-lightblue',
      text: 'text-blue',
    },
    BACKEND: {
      bg: 'bg-lightgreen',
      text: 'text-green',
    },
    DEVOPS: {
      bg: 'bg-lightpink',
      text: 'text-pink',
    },
    FULL_STACK: {
      bg: 'bg-lightyellow',
      text: 'text-yellow',
    },
    DATA_ENGINEER: {
      bg: 'bg-lightpurple',
      text: 'text-purple',
    },
  }

  // 매핑에 해당하는 스타일 찾기. 없으면 기본값 사용
  const styles =
    normalizedPosition in positionStyles
      ? positionStyles[normalizedPosition as keyof typeof positionStyles]
      : { bg: 'bg-lightgray', text: 'text-black' }

  return (
    <div
      className={`flex justify-center h-[1.4rem] ${styles.bg} rounded-md text-sm items-center px-1`}
    >
      <span className={styles.text}>{position}</span>
    </div>
  )
}

export default PositionTag
