import Image from 'next/image'
import UpdateSVG from '../../../public/update.svg'

const UpadateModal = () => {
  return (
    <div className="flex flex-col justify-center items-center w-[21rem] h-[22.5rem] gap-[1.5rem]">
      {/* <Image src={update} alt="업데이트" width={336} /> */}
      <UpdateSVG width={100} height={100} />
      <div className="text-center">
        <div className="font-semibold text-[1.375rem]">
          최신 이력서 업데이트
        </div>
        <div className="font-medium text-[0.938rem] text-gray">
          한 달 이내에 이력서를 업데이트한
          <br /> 사용자만 열람이 가능합니다.
        </div>
      </div>
      <div className="flex flex-col text-[0.938rem] font-regular gap-[0.5rem]">
        <button className="w-[16rem] h-[2.375rem] bg-lightgray rounded-xl">
          네, 좋아요
        </button>
        <button className="">다음에 하기</button>
      </div>
    </div>
  )
}
export default UpadateModal
