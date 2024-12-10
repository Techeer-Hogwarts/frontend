import Image from 'next/image'
export default function Banner() {
  return (
    <div className="flex justify-between gap-[25rem]">
      <div className="flex flex-col">
        <span className="font-logo text-primary text-[100px]">TECHEER</span>
        <span className="font-normal text-[22px]">
          Technology부터 Carrer까지 모든 것을 담다.
        </span>
      </div>
      <div className="relative w-[350px] h-[350px]">
        <Image
          src="/clip_large.png"
          alt="largeclip"
          fill
          style={{ objectFit: 'contain' }}
        />
      </div>
    </div>
  )
}
