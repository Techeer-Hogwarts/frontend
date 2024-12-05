interface AddBtnProps {
  readonly title: string
}

export default function AddBtn({ title }: AddBtnProps) {
  return (
    <button className="flex items-center justify-center p-2 h-8 mr-1 w-[130px] border border-lightgray text-black/70 rounded-lg">
      {title}
    </button>
  )
}
