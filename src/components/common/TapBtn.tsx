'use client'

interface TapBtnProps {
  children: string
  isActive: boolean
  onClick: () => void
}
export default function TapBtn({ children, isActive, onClick }: TapBtnProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-xl ${isActive ? 'text-primary ' : ' text-black '}`}
    >
      {children}
    </button>
  )
}
