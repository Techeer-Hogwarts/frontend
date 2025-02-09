'use client'
import Image from 'next/image'
import { Dispatch, SetStateAction } from 'react'

export interface FilterBtnProps {
  title: string
  setSelectedPeriods: Dispatch<SetStateAction<string[]>>
}

export default function FilterBtn({
  title,
  setSelectedPeriods,
}: FilterBtnProps) {
  return (
    <button
      onClick={onClick}
      className="relative w-[10.438rem] flex items-center justify-center rounded-2xl text-lg h-9 border bg-[#FFF6F0] text-[#DD7E3A] border-primary"
    >
      {title}
      <Image
        src="/images/session/delete.png"
        alt="deletebtn"
        width={9}
        height={9}
        className="absolute right-2"
        onClick={() => setSelectedPeriods([])}
      />
    </button>
  )
}
