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
import type { InfiniteData } from '@tanstack/react-query'
import type { BootcampListResponse } from '@/hooks/bootcamp/useGetBootcampList'
import { useInView } from 'react-intersection-observer'

const BootcampPage = () => {
  const [openModal, setOpenModal] = useState(false)
  const [selectedID, setSelectedID] = useState<number>()
  const [showRegistModal, setShowRegistModal] = useState(false)

  const { activeOption } = useTapBarStore()
  const { ref, inView } = useInView()

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

  const query = useGetBootcampList({ isAward, year, limit: 10 })

  const allProjects =
    (query?.data as InfiniteData<BootcampListResponse>)?.pages
      ?.flatMap((page) =>
        page.data.map((project) => ({
          id: project.id,
          year: project.year,
          imageUrl: project.imageUrl,
          rank: project.rank,
        })),
      )
      .sort((a, b) => {
        const Arank = a.rank === 0 ? 4 : a.rank
        const Brank = b.rank === 0 ? 4 : b.rank
        return Arank - Brank
      }) ?? []

  useEffect(() => {
    if (typeof window === 'undefined') return

    const body = document.body

    if (showRegistModal || openModal) {
      const scrollY = window.scrollY
      body.style.position = 'fixed'
      body.style.top = `-${scrollY}px`
      body.style.left = '0'
      body.style.right = '0'
      body.style.overflowY = 'scroll'
      body.dataset.scrollY = scrollY.toString()
    } else {
      const scrollY = body.dataset.scrollY
      body.style.position = ''
      body.style.top = ''
      body.style.left = ''
      body.style.right = ''
      body.style.overflowY = ''
      delete body.dataset.scrollY
      window.scrollTo(0, parseInt(scrollY || '0'))
    }
  }, [showRegistModal, openModal])

  useEffect(() => {
    if (inView && query.hasNextPage && !query.isFetchingNextPage) {
      query.fetchNextPage()
    }
  }, [inView, query.hasNextPage, query.isFetchingNextPage])

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
          isLoading={query.isLoading}
          allProject={allProjects}
          setSelectedID={setSelectedID}
          setOpenModal={setOpenModal}
        />
        <div ref={ref} className="h-10" />
      </div>
    </div>
  )
}

export default BootcampPage
