import { useState, useEffect } from 'react'
import { CATEGORIES } from '@/constants/category'

export function useCalendar() {
  const [showModal, setShowModal] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    CATEGORIES.map((category) => category.value),
  )

  const fetchUserProfile = async () => {
    try {
      const response = await fetch('/api/v1/users', {
        method: 'GET',
        credentials: 'include',
      })
      if (response.status === 401) {
        // 401이면 로그인 모달 오픈
        setAuthModalOpen(true)
        return
      }
      setShowModal(true)
      if (!response.ok) {
        throw new Error('유저조회 실패')
      }
    } catch (err: any) {
      setAuthModalOpen(true)
      throw new Error(err)
    }
  }

  const handleOpenModal = () => {
    fetchUserProfile()
  }

  const handleCloseModal = () => setShowModal(false)

  const handleFilter = (category: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        const newCategories = prev.filter((cat) => cat !== category)
        return newCategories.length === 0
          ? CATEGORIES.map((cat) => cat.value)
          : newCategories
      } else {
        return [...prev, category]
      }
    })
  }

  return {
    showModal,
    authModalOpen,
    modalOpen,
    selectedCategories,
    handleOpenModal,
    handleCloseModal,
    handleFilter,
    setAuthModalOpen,
    setModalOpen,
  }
}
