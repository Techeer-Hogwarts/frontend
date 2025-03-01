'use client'

import { useRouter } from 'next/navigation'

interface AddBtnProps {
  readonly title: string
  href: string
}

export default function AddBtn({ title, href }: AddBtnProps) {
  const router = useRouter()

  const handleClick = () => {
    router.push(href)
  }

  return (
    <button
      onClick={handleClick}
      className="flex items-center justify-center p-2 h-8 w-[130px] border border-lightgray text-black/70 rounded-lg"
    >
      {title}
    </button>
  )
}
