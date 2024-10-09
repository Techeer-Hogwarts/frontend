import Image from 'next/image'

export default function Card() {
  return (
    <div className=" bg-project  bg-cover w-[18rem] h-[11.375rem]">
      <div className="text-pink w-[4.375rem] pt-2 text-[0.71181rem] text-center">
        프로젝트
      </div>
      <div className="flex items-center pt-[1rem] px-[0.75rem] gap-1 justify-center">
        {/* 이미지 */}
        <div className="">
          <Image
            src="/src/assets/images/example.png"
            alt="프로젝트 이미지"
            width={125}
            height={125}
            className="rounded-md border bg-pink-300"
          />
        </div>
        <div className="">
          <h2 className="font-bold text-[1.01688rem] gap-[2.44rem]">
            토크타카
          </h2>
          <p className="text-[0.75rem] mb-[2.44rem]">
            아이들의 &quot;오늘 하루 있었던 일&quot;을 주제로 캐릭터와...
          </p>
          <div className="mt-4 flex  justify-end gap-2">
            {['Next.js', 'Spring'].map((el, index) => (
              <button
                key={el}
                type="button"
                className="bg-lightprimary text-pink py-[0.19rem] px-[0.5rem] rounded-lg text-sm"
              >
                {el}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
