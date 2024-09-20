import ResumeFolder from '@/components/common/ResumeFolder'
import Star from '../../assets/image/star.svg'

export default function resume() {
  return (
    <div className="flex flex-col">
      {/** 배너 */}
      <div className="flex justify-between gap-10">
        <div className="flex flex-col">
          <span className="text-[2.5rem] font-bold">이력서</span>
          <span className="text-[1.25rem] font-medium">
            모든 테커인들의 이력서를 확인해보세요.
          </span>
        </div>
        <div className="flex justify-center items-center w-[13rem] h-[3rem] border-2 border-transparent shadow-md rounded-xl">
          <span className="text-[1.1rem] font-medium">
            나의 이력서 수정하기
          </span>
          <Star />
        </div>
      </div>
      <ResumeFolder />
    </div>
  )
}
