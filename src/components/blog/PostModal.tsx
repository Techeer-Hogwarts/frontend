import Image from 'next/image'

export default function PostModal() {
  return (
    <div className="absolute right-1 top-6 flex flex-col item-center justify-center w-14 text-sm h-16 border bg-white border-lightgray rounded-md">
      <button type="button" className="flex items-center justify-center gap-1">
        영상
        <Image src="/download.png" alt="download" width={12} height={12} />
      </button>
      <div className="w-[54px] h-[1px] my-[6px] bg-lightgray" />
      <button type="button" className="flex items-center justify-center gap-1">
        자료
        <Image src="/download.png" alt="download" width={12} height={12} />
      </button>
    </div>
  )
}
