import Image from 'next/image'

export default function ResumeInfo() {
  return (
    <div className="flex justify-between my-40 px-10">
      <div className="flex flex-col">
        <span className="text-primary font-bold text-[30px]">이력서</span>
        <span className="font-bold text-[50px]">모든 이력서를 한 곳에서</span>
        <span className="mt-3 text-[25px] font-semibold text-black/60">
          좋은 이력서는 무엇인지 항상 고민되지 않나요? <br />
          <span className="">
            나의 이력서도 공유하며 좋은 이력서가 무엇일지 찾아가봐요.
          </span>
        </span>
      </div>
      <Image width={500} height={500} src="/resume.png" alt="resume"></Image>
    </div>
  )
}
