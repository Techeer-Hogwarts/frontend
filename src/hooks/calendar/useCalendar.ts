import { useState, useEffect } from 'react'
import { CATEGORIES } from '@/constants/category'
import { useGetCurrentUser } from '@/api/calendar/queries'

export function useCalendar() {
  const { data: user, isError } = useGetCurrentUser()
  const [showModal, setShowModal] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    CATEGORIES.map((category) => category.value),
  )

  const fetchUserProfile = async () => {
    if (user) {
      setShowModal(true)
    } else if (isError) {
      setAuthModalOpen(true)
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
