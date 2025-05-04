import { useState } from 'react'
import {
  fulltimesType,
  initialFormData,
  internshipsType,
} from '@/types/signup/signup.type'

export const useSignupForm = () => {
  const [formData, setFormData] = useState(initialFormData)

  const setInternships = (internships: internshipsType[]) => {
    setFormData((prev) => ({ ...prev, internships }))
  }

  const setFullTimes = (fullTimes: fulltimesType[]) => {
    setFormData((prev) => ({ ...prev, fullTimes }))
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePositionSelect = (position: string) => {
    setFormData((prev) => {
      const isSelected = prev.selectedPositions.includes(position)
      const selected = isSelected
        ? prev.selectedPositions.filter((p) => p !== position)
        : [...prev.selectedPositions, position].slice(0, 2)
      return { ...prev, selectedPositions: selected }
    })
  }

  return {
    formData,
    setFormData,
    setInternships,
    setFullTimes,
    handleChange,
    handlePositionSelect,
  }
}
