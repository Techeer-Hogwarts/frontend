interface BtnProps {
  text: string
  onClick: () => void
  isSelected: boolean
}

const Btn = ({ text, onClick, isSelected }: BtnProps) => {
  return (
    <div
      onClick={onClick}
      className={`flex px-1 h-[1.125rem] text-[0.875rem] items-center justify-center rounded-sm cursor-pointer border border-lightprimary ${
        isSelected
          ? 'bg-lightprimary text-pink'
          : 'bg-white text-pink'
      }`}
    >
      {text}
    </div>
  )
}

export default Btn
