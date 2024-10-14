interface FilterBtnProps {
  title: string
}
export default function FilterBtn({ title }: FilterBtnProps) {
  return (
    <button
      type="button"
      className="h-8 px-6 border border-primary rounded-2xl text-lg text-[#DD7E3A] bg-[#FFF6F0]"
    >
      {title}
    </button>
  )
}
