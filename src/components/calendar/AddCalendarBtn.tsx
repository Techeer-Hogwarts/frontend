'use client'

import Image from 'next/image'
import { AddCalendarBtnProps } from '@/types/calendar'

export default function AddCalendarBtn({ onClick }: AddCalendarBtnProps) {
  return (
    <button
      onClick={onClick}
      className="fixed right-36 bottom-8 w-12 h-12 bg-primary rounded-full shadow-md flex items-center justify-center"
    >
      <Image src="/whiteplus.png" alt="addBtn" width={15} height={15} />
    </button>
  )
}
