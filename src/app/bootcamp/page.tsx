'use client'

import React, { useState, useEffect } from 'react'
import TapBar from '@/components/common/TapBar'
import Image from 'next/image'
import BootcampModal from '@/components/bootcamp/BootcampModal'
import RegistModal from '@/components/bootcamp/RegistModal'
import ProjectItem from '@/components/bootcamp/ProjectItem'
import { BootCampTapOptions } from '@/constants/bootcamp'
import { allBootcampProject } from '@/constants/bootcamp'

const BootcampPage = () => {
  const [openModal, setOpenModal] = useState(false)
  const [selectedID, setSelectedID] = useState<number>()
  const [showRegistModal, setShowRegistModal] = useState(false)

  useEffect(() => {
    //모달 창 열었을때, 바깥 페이지의 스크롤을 제거
    document.body.style.overflow = showRegistModal || openModal ? 'hidden' : ''
  }, [showRegistModal, openModal])

  return (
    <div className="flex justify-center">
      {openModal && selectedID && (
        <BootcampModal id={selectedID} onClose={() => setOpenModal(false)} />
      )}
      {showRegistModal && (
        <RegistModal onClose={() => setShowRegistModal(false)} />
      )}
      <div className="flex flex-col w-[1200px]">
        <div className="flex justify-between mt-14 mb-[2.84rem] w-[100%]">
          <div className="text-left">
            <p className="text-[2rem] font-bold">부트캠프 프로젝트</p>
            <p className="text-[1.25rem]">
              부트캠프 참여자들의 프로젝트를 확인해보세요.
            </p>
          </div>
          <button
            onClick={() => setShowRegistModal(true)}
            className="flex items-center gap-2 w-[13rem] h-[3rem] rounded-xl shadow-md text-[1.1rem] font-medium justify-center hover:shadow-custom"
          >
            <span>부트캠프 등록하기</span>
            <Image src="/star.svg" alt="star" width={20} height={20} />
          </button>
        </div>
        <TapBar options={BootCampTapOptions} />
        <div className="border-t my-5" />
        <div className="grid grid-cols-4 gap-6">
          {allBootcampProject.map((bootcamp) => (
            <ProjectItem
              bootcamp={bootcamp}
              setSelectedID={setSelectedID}
              setOpenModal={setOpenModal}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default BootcampPage
