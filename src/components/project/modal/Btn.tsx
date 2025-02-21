import { getPositionStyle } from '@/styles/positionStyles'

interface BtnProps {
  text: string
  onClick: () => void
  isSelected: boolean
}

const Btn = ({ text, onClick, isSelected }: BtnProps) => {
  const { bg, textColor } = getPositionStyle(text)
  return (
    <div
      onClick={onClick}
      className={`flex px-1 h-[1.125rem] text-[0.875rem] items-center justify-center rounded-sm cursor-pointer  ${
        isSelected
          ? `bg-${bg} text-${textColor} mx-[1px]`
          : 'bg-white text-pink border border-lightprimary'
      }`}
    >
      {text}
    </div>
  )
}

export default Btn
