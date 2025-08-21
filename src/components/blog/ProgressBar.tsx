interface ProgressBarProps {
  userName: string
  sequence: number[]
}

const getColorClass = (status: number) => {
  switch (status) {
    case 1:
      return 'bg-[#FFB47D]' // 1개
    case 2:
      return 'bg-[#FFA451]' // 2개
    case 3:
      return 'bg-[#FF6B00]' // 3개 이상
    default:
      return 'bg-[#D9D9D9]' // 0개
  }
}

export default function ProgressBar({ userName, sequence }: ProgressBarProps) {
  return (
    <div className="flex justify-center gap-[2px] items-center">
      <span className="mr-2 text-xl">{userName}</span>
      <div className="flex gap-1">
        {sequence.map((status, index) => (
          <span
            key={index}
            className={`w-7 h-7 rounded-sm ${getColorClass(status)}`}
          />
        ))}
      </div>
    </div>
  )
}
