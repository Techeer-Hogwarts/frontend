import React from 'react'
import Image from 'next/image'

interface BootcampHeaderProps {
  ModalOpen: () => void
}

const BootcampHeader: React.FC<BootcampHeaderProps> = ({ ModalOpen }) => {
  const Bootcampyear = 10
  //임시 값이에요. localStorage의 유저 정보에서 Bootcampyear을 추출해서 현재 부트캠프 기수와 같으면
  //부트캠프 참여 취소 버튼이 렌더링 되고, 그 외에는 전부 부트캠프 참여 버튼이 렌더링 됩니다.

  return (
    <div className="flex justify-between mt-14 mb-[2.84rem] w-[100%]">
      <div className="text-left">
        <p className="text-[2rem] font-bold">부트캠프 프로젝트</p>
        <p className="text-[1.25rem]">
          부트캠프 참여자들의 프로젝트를 확인해보세요.
        </p>
      </div>

      <div className="flex flex-row gap-5">
        {Bootcampyear == 10 ? (
          <button className="flex items-center gap-2 w-[13rem] h-[3rem] rounded-xl shadow-md text-[1.1rem] font-medium justify-center hover:shadow-custom">
            <span>부트캠프 참여 </span>
            <Image src="/star.svg" alt="star" width={20} height={20} />
          </button>
        ) : (
          <button className="flex items-center gap-2 w-[13rem] h-[3rem] rounded-xl shadow-md text-[1.1rem] font-medium justify-center hover:shadow-custom">
            <span>부트캠프 참여 취소 </span>
            <Image src="/star.svg" alt="star" width={20} height={20} />
          </button>
        )}

        <button
          onClick={ModalOpen}
          className="flex items-center gap-2 w-[13rem] h-[3rem] rounded-xl shadow-md text-[1.1rem] font-medium justify-center hover:shadow-custom"
        >
          <span>부트캠프 등록하기</span>
          <Image src="/star.svg" alt="star" width={20} height={20} />
        </button>
      </div>
    </div>
  )
}

export default BootcampHeader
