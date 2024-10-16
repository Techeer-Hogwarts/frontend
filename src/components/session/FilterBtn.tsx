import Image from 'next/image'

interface FilterBtnProps {
  title: string
}

export default function FilterBtn({ title }: FilterBtnProps) {
  return (
    <div className="relative w-[167px] flex items-center justify-center rounded-2xl text-lg h-9 border bg-[#FFF6F0] text-[#DD7E3A] border-primary">
      {title}
      <Image
        src="/delete.png"
        alt="deletebtn"
        width={9}
        height={9}
        className="absolute right-2"
      />
    </div>
  )
}
