'use client'

import { useRouter } from 'next/navigation'
import UpdateSVG from '../../../../../public/update.svg'

const UpadateModal = () => {
  const router = useRouter() // useRouter 훅을 사용하여 라우터 객체 얻기

  // 일단은 "다음에 하기" 버튼 클릭 시 모달 닫기
  // 추후에 업데이트 검사 후 열리도록 수정해야함
  const handleClose = () => {
    router.push('/resume') // 모달 닫기
  }

  return (
    <div className="flex justify-center items-center fixed top-0 left-0 w-full h-full z-100 bg-black bg-opacity-20">
      <div className="flex flex-col justify-center items-center w-[21rem] h-[22.5rem] gap-[1.5rem] bg-white rounded-xl">
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
          <button className="" onClick={handleClose}>
            다음에 하기
          </button>
        </div>
      </div>
    </div>
  )
}
export default UpadateModal
