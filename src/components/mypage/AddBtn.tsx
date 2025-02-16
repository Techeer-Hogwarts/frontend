import Link from 'next/link'

interface AddBtnProps {
  readonly title: string
  href: string
}

export default function AddBtn({ title, href }: AddBtnProps) {
  return (
    <Link href={href}>
      <button className="flex items-center justify-center p-2 h-8 w-[130px] border border-lightgray text-black/70 rounded-lg">
        {title}
      </button>
    </Link>
  )
}
