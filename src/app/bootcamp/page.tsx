'use client'

import React, { useState, useEffect } from 'react'
import TapBar from '@/components/common/TapBar'
import BootcampModal from '@/components/bootcamp/BootcampModal'
import RegistModal from '@/components/bootcamp/RegistModal'
import { BootCampTapOptions } from '@/constants/bootcamp'
import { allBootcampProject } from '@/constants/bootcamp'
import BootcampHeader from '@/components/bootcamp/main/BootcampHeader'
import ProjectList from '@/components/bootcamp/main/ProjectList'

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
        <BootcampHeader ModalOpen={() => setShowRegistModal(true)} />
        <TapBar options={BootCampTapOptions} />
        <div className="border-t my-5" />
        <ProjectList
          allProject={allBootcampProject}
          setSelectedID={setSelectedID}
          setOpenModal={setOpenModal}
        />
      </div>
    </div>
  )
}

export default BootcampPage
