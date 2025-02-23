import Image from 'next/image'

export default function BlogInfo() {
  return (
    <div className="flex justify-between h-[540px] p-10 ">
      {/* 왼쪽 슬라이더 */}
      <div className="flex">
        <Image
          width={500}
          height={540}
          src="/blogInfo.png"
          alt="blogInfo"
          className="object-cover"
        />
      </div>
      {/* 문구 */}
      <div className="flex flex-col">
        <span className="text-primary font-bold text-[30px] text-end">
          블로그
        </span>
        <span className="font-bold text-[50px] text-end">
          테커의 지식 공유 공간
        </span>
        <span className="mt-3 text-[25px] font-semibold text-black/60 text-end">
          공부하며 알게 된 내용을 글로 정리해서
          <br />더 많은 사람들과 공유할 수 있어요.
        </span>
      </div>
    </div>
  )
}
