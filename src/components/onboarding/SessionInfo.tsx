import Image from 'next/image'

export default function SessionInfo() {
  return (
    <div className="flex justify-between my-40 px-10">
      {/* 왼쪽 슬라이더 */}
      <div className="flex">
        <Image
          width={550}
          height={540}
          src="/sessionInfo.png"
          alt="sessionInfo"
          className="object-cover"
        />
      </div>
      {/* 문구 */}
      <div className="flex flex-col">
        <span className="text-primary font-bold text-[30px] text-end">
          세션
        </span>
        <span className="font-bold text-[50px] text-end">
          지속적인 학습을 위한 공간
        </span>
        <span className="mt-3 text-[25px] font-semibold text-black/60 text-end">
          세션을 놓쳤다고 아쉬워하지 마세요.
          <br />
          모든 세션이 저장되어 언제든 다시 볼 수 있습니다.
        </span>
      </div>
    </div>
  )
}
