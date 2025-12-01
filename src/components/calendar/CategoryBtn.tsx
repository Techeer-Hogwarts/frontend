'use client'

interface CategoryBtnProps {
  title: string
  onClick: () => void;
  isSelected: boolean
}

export default function CategoryBtn({ title, onClick, isSelected }: CategoryBtnProps) {  
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-[137px] h-[34px] rounded-sm border text-sm ${
        isSelected ? 'text-primary border-primary' : 'border-lightgray text-gray'
      }`}
    >
      {title}
    </button>
  )
}
