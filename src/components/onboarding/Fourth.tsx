import Image from 'next/image'

export default function Fourth() {
  return (
    <div className="flex justify-between h-[540px] p-10 ">
      {/* 왼쪽 슬라이더 */}
      <div className="flex">
        <Image
          width={400}
          height={400}
          src="/test.png"
          alt="blog"
          className="object-contain"
        />
      </div>
      {/* 문구 */}
      <div className="flex flex-col">
        <span className="text-primary font-extrabold text-[35px] text-end">
          블로그
        </span>
        <span className="font-bold text-[60px] text-end">
          테커의 지식 공유 공간
        </span>
        <span className="text-[20px] text-end">
          공부하며 알게된 내용을 글로 정리해서 더 많은 사람들과 공유할 수
          있어요.
        </span>
      </div>
    </div>
  )
}
