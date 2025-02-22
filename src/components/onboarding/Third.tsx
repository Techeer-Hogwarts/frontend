import Image from 'next/image'

export default function Third() {
  return (
    <div className="flex justify-between h-[500px] my-40 p-10">
      <div className="flex flex-col">
        <span className="text-primary font-extrabold text-[35px]">프로필</span>
        <span className="font-bold text-[60px]">
          테커의 모든 사람들을 한 눈에
        </span>
        <span className="text-[20px]">
          누가 어떤 포지션에 무엇을 공부하고 있는지 알 수 있어요. <br />
          <span className="">
            테커에 누가 있는지 이제는 한 곳에서 확인이 가능해요!
          </span>
        </span>
      </div>
      <Image
        width={300}
        height={300}
        src="/nametag.svg"
        className="object-contain"
        alt="nametag"
      ></Image>
    </div>
  )
}
