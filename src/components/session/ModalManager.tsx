'use client'

import AuthModal from '@/components/common/AuthModal'
import { useAuthModal } from '@/store/useAuthModal'

interface ModalManagerProps {
  children: React.ReactNode
}

export default function ModalManager({ children }: ModalManagerProps) {
  const { isOpen: authModalOpen, onClose: closeAuthModal } = useAuthModal()

  return (
    <div>
      {/* 로그인 모달  */}
      <AuthModal isOpen={authModalOpen} onClose={closeAuthModal} />
      {children}
    </div>
  )
}
