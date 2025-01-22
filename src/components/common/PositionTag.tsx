interface Position {
  position: 'Frontend' | 'Backend' | 'DataEngineer' | string
}

const PositionTag = ({ position }: Position) => {
  // 포지션에 따른 색상 매핑
  const positionStyles: Record<
    'Frontend' | 'Backend' | 'DataEngineer',
    { bg: string; text: string }
  > = {
    Frontend: {
      bg: 'bg-lightblue',
      text: 'text-blue',
    },
    Backend: {
      bg: 'bg-lightgreen',
      text: 'text-green',
    },
    DataEngineer: {
      bg: 'bg-lightpurple',
      text: 'text-purple',
    },
  }

  // 해당 포지션이 없으면 기본값 사용
  const styles = positionStyles[
    position as 'Frontend' | 'Backend' | 'DataEngineer'
  ] || {
    bg: 'bg-lightgray',
    text: 'text-black',
  }

  return (
    <div
      className={`inline-flex justify-center px-3 h-[1.4rem] ${styles.bg} rounded-md`}
    >
      <span className={styles.text}>{position}</span>
    </div>
  )
}

export default PositionTag
