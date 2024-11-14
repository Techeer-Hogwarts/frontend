import React from 'react'

interface ExperienceBtnProps {
  key: number
  handlePositionClick: (position: string) => void
  selectedPosition: string[]
  position: string
  btnPadding: string
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
      className={`${btnPadding} rounded-md border border-lightprimary  ${
        selectedPosition.includes(position) ? 'bg-lightprimary' : 'bg-white'
      }`}
    >
      {position}
    </button>
  )
}
