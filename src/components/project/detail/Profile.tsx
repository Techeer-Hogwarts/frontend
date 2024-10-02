import Image from 'next/image'

export default function Profile() {
  return (
    <div className="flex flex-col items-center bg-[url('/images/project/finishProfile.png')] w-[19.1875rem] h-[30.29606rem] bg-cover ">
      <div className="flex pt-[0.35rem] pl-7 mb-[1.56rem] w-full h-[1.56813rem] text-blue text-[0.9375rem] font-semibold">
        완료
      </div>
      <Image
        src="/images/project/example.png"
        width={254}
        height={254}
        alt="Picture"
        className=" rounded-2xl"
      />
      <div className="flex w-[15.875rem] justify-between items-center mt-[0.94rem] mb-[1.44rem] ">
        <div className="text-[1.25rem] font-bold  flex items-center justify-center">
          토그타카
        </div>

        <div className="flex gap-2">
          <button type="button">
            <Image
              src="/images/project/github.png"
              width={20}
              height={20}
              alt="github"
            />
          </button>

          <button type="button">
            <Image
              src="/images/project/notion.png"
              width={20}
              height={20}
              alt="notion"
            />
          </button>
        </div>
      </div>

      <div className="w-[15.875rem]">
        아이들의 “오늘 하루 있었던 일”을 주제로 캐릭터와 음성채팅으로 대화를
        나누며 하루를 돌아보고 기록해주는 서비스
      </div>
    </div>
  )
}
