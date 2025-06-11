import React from 'react'

interface ExperienceBtnProps {
  readonly handlePositionClick: (position: string) => void
  readonly selectedPosition: string[]
  readonly position: string
  readonly btnPadding: string
}

export default function ExperienceBtn({
  handlePositionClick,
  selectedPosition,
  position,
  btnPadding,
}: ExperienceBtnProps) {
  return (
    <button
      type="button"
      onClick={() => handlePositionClick(position)}
      className={`${btnPadding} min-w-[165px] rounded-md border border-lightprimary px-5 py-2 ${
        selectedPosition.includes(position) ? 'bg-lightprimary' : 'bg-white'
      }`}
    >
      {position}
    </button>
  )
}
