'use client'
import { useForm } from 'react-hook-form'

export default function useBookmarkModal() {
  const { register, setValue, watch } = useForm({
    defaultValues: {
      isOpen: false,
      message: '',
    },
  })

  const isOpen = watch('isOpen')
  const message = watch('message')

  const openModal = (msg: string) => {
    setValue('isOpen', true)
    setValue('message', msg)
  }

  const closeModal = () => setValue('isOpen', false)

  return { isOpen, message, openModal, closeModal }
}
