import Image from 'next/image'

interface ActivityCardProps {
  title: string
  imageSrc: string
  heading: string
  descriptions: string[]
}

export default function ActivityCard({
  title,
  imageSrc,
  heading,
  descriptions,
}: ActivityCardProps) {
  return (
    <div className="w-[572px] h-[487px] rounded-2xl bg-[#2E2E2E]">
      <Image
        src={imageSrc}
        alt={title}
        width={572}
        height={355}
        className="rounded-t-2xl"
      />
      <div className="flex items-center justify-between px-9 h-[132px] text-2xl text-white">
        <p>{heading}</p>
        <div className="flex flex-col justify-center items-end text-base">
          {descriptions.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      </div>
    </div>
  )
}
