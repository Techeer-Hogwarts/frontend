import React from 'react'
import Image from 'next/image'

interface BootcampHeaderProps {
  ModalOpen: () => void
}

const BootcampHeader: React.FC<BootcampHeaderProps> = ({ ModalOpen }) => {
  return (
    <div className="flex justify-between mt-14 mb-[2.84rem] w-[100%]">
      <div className="text-left">
        <p className="text-[2rem] font-bold">부트캠프 프로젝트</p>
        <p className="text-[1.25rem]">
          부트캠프 참여자들의 프로젝트를 확인해보세요.
        </p>
      </div>
      <button
        onClick={ModalOpen}
        className="flex items-center gap-2 w-[13rem] h-[3rem] rounded-xl shadow-md text-[1.1rem] font-medium justify-center hover:shadow-custom"
      >
        <span>부트캠프 등록하기</span>
        <Image src="/star.svg" alt="star" width={20} height={20} />
      </button>
    </div>
  )
}

export default BootcampHeader
