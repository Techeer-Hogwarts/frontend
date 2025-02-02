interface Position {
  position: 'FRONTEND' | 'BACKEND' | 'DATAENGINEER' | string
}

const PositionTag = ({ position }: Position) => {
  // 포지션에 따른 색상 매핑
  const positionStyles: Record<
    'FRONTEND' | 'BACKEND' | 'DATAENGINEER',
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
    DATAENGINEER: {
      bg: 'bg-lightpurple',
      text: 'text-purple',
    },
  }

  // 해당 포지션이 없으면 기본값 사용
  const styles = positionStyles[
    position as 'FRONTEND' | 'BACKEND' | 'DATAENGINEER'
  ] || {
    bg: 'bg-lightgray',
    text: 'text-black',
  }

  return (
    <div
      className={`flex justify-center w-[6.5rem] h-[1.4rem] ${styles.bg} rounded-md text-sm items-center`}
    >
      <span className={styles.text}>{position}</span>
    </div>
  )
}

export default PositionTag
