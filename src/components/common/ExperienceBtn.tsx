import React from 'react'

interface ExperienceBtnProps {
  readonly key: number
  readonly handlePositionClick: (position: string) => void
  readonly selectedPosition: string[]
  readonly position: string
  readonly btnPadding: string
}

export default function ExperienceBtn({
  key,
  handlePositionClick,
  selectedPosition,
  position,
  btnPadding,
}: ExperienceBtnProps) {
  return (
    <button
      key={key}
      type="button"
      onClick={() => handlePositionClick(position)}
      className={`${btnPadding} rounded-md border border-lightprimary px-3 py-2  ${
        selectedPosition.includes(position) ? 'bg-lightprimary' : 'bg-white'
      }`}
    >
      {position}
    </button>
  )
}
