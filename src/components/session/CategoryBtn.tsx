'use client'

interface CategoryBtnProps {
  title: string
  isSelected: boolean
  onSelect: (category: string) => void
}

export default function CategoryBtn({
  title,
  onSelect,
  isSelected,
}: CategoryBtnProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(title)}
      className={`w-24 h-[34px] rounded-sm border text-sm transition-colors ${
        isSelected
          ? 'text-primary border-primary bg-primary/10'
          : 'border-lightgray text-gray bg-white'
      }`}
    >
      {title}
    </button>
  )
}
