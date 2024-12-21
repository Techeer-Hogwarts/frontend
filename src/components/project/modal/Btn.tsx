interface BtnProps {
  text: string
  onClick: () => void
  isSelected: boolean
}

const Btn = ({ text, onClick, isSelected }: BtnProps) => {
  return (
    <div
      onClick={onClick}
      className={`flex w-[4.5rem] h-[1.125rem] text-[0.875rem] items-center justify-center rounded-sm cursor-pointer ${
        isSelected
          ? 'bg-lightprimary text-pink'
          : 'border border-lightprimary text-pink'
      }`}
    >
      {text}
    </div>
  )
}

export default Btn
