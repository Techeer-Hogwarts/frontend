'use client'

import { useEffect, useRef } from 'react'
import { useAuthStore } from '@/store/authStore'
import AuthModal from '@/components/common/AuthModal'
import { useAuthModal } from '@/store/useAuthModal'
import { useRouter } from 'next/navigation'

export default function ProtectedLayout({
  children,
  modal,
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  const { isLoggedIn } = useAuthStore()
  const { isOpen, onOpen, onClose } = useAuthModal()
  const router = useRouter()
  const prevIsLoggedInRef = useRef(isLoggedIn)

  useEffect(() => {
    if (isLoggedIn === false && prevIsLoggedInRef.current !== true) {
      onOpen()
    }
    if (isLoggedIn === true) {
      onClose()
    }
    prevIsLoggedInRef.current = isLoggedIn
  }, [isLoggedIn, onOpen, onClose])

  const handleLoginReject = () => {
    onClose()
    router.push('/')
  }

  if (isLoggedIn === null) {
    return
  }

  if (isLoggedIn === false) {
    return <AuthModal isOpen={isOpen} onClose={handleLoginReject} />
  }

  return (
    <>
      {children}
      {modal}
    </>
  )
}
