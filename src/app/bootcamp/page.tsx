'use client'

import React, { useState, useEffect } from 'react'
import TapBar from '@/components/common/TapBar'
import BootcampModal from '@/components/bootcamp/BootcampModal'
import RegistModal from '@/components/bootcamp/RegistModal'
import { BootCampTapOptions } from '@/constants/bootcamp'
import BootcampHeader from '@/components/bootcamp/main/BootcampHeader'
import ProjectList from '@/components/bootcamp/main/ProjectList'
import { useGetBootcampList } from '@/hooks/bootcamp/useGetBootcampList'
import { useTapBarStore } from '@/store/tapBarStore'

const BootcampPage = () => {
  const [openModal, setOpenModal] = useState(false)
  const [selectedID, setSelectedID] = useState<number>()
  const [showRegistModal, setShowRegistModal] = useState(false)

  const { activeOption } = useTapBarStore()

  const getTabParams = () => {
    if (activeOption === '역대 수상작')
      return { isAward: true, year: undefined }

    if (activeOption.endsWith('기')) {
      const parsedYear = parseInt(activeOption.replace('기', ''), 10)
      return {
        isAward: false,
        year: isNaN(parsedYear) ? undefined : parsedYear,
      }
    }

    return { isAward: false, year: undefined }
  }

  const { isAward, year } = getTabParams()

  const { data } = useGetBootcampList({
    isAward,
    year,
    cursorId: 0,
    limit: 10,
  })

  const allProjects = Array.isArray(data?.data)
    ? data.data.map((project) => ({
        id: project.id,
        year: project.year,
        imageUrl: project.imageUrl,
        rank: project.rank,
      }))
    : []

  useEffect(() => {
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
          allProject={allProjects}
          setSelectedID={setSelectedID}
          setOpenModal={setOpenModal}
        />
      </div>
    </div>
  )
}

export default BootcampPage
