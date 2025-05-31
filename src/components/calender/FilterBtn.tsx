'use client'

interface FilterBtnProps {
  title: string
  isClicked?: boolean
  onClick: () => void
}

export default function FilterBtn({
  title,
  isClicked,
  onClick,
}: FilterBtnProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-8 px-6 border rounded-2xl text-lg transition-colors duration-200
        ${
          !isClicked
            ? 'text-gray bg-lightgray/50 border-gray'
            : 'text-[#DD7E3A] bg-[#FFF6F0] border-primary'
        }
      `}
    >
      {title}
    </button>
  )
}
