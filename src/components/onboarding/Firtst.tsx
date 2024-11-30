import Image from 'next/image'

export default function First() {
  return (
    <div className="flex justify-between my-40 px-10">
      <div className="flex flex-col">
        <span className="text-primary font-extrabold text-[35px]">이력서</span>
        <span className="font-bold text-[60px]">모든 이력서를 한 곳에</span>
        <span className="text-[20px]">
          좋은 이력서는 무엇인지 항상 고민되지 않나요? <br />
          <span className="">
            나의 이력서도 공유하며 좋은 이력서가 무엇일지 찾아나가 봐요.
          </span>
        </span>
      </div>
      <Image width={500} height={500} src="/resume.png" alt="resume"></Image>
    </div>
  )
}
