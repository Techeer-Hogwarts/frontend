import Image from 'next/image'

interface SearchBarProps {
  placeholder: string
}

export default function SearchBar({ placeholder }: SearchBarProps) {
  return (
    <div className="relative">
      <input
        placeholder={placeholder}
        className="w-[392px] h-9 border border-gray outline-none rounded-2xl pl-4 pr-8"
      />
      <Image
        src="/SearchIMG.png"
        width={16}
        height={16}
        alt="SearchIMG"
        className="absolute right-2 top-1/2 transform -translate-y-1/2"
      />
    </div>
  )
}
