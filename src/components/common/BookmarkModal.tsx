'use client'

import React, { useEffect } from 'react'

interface BookmarkModalProps {
  isOpen: boolean
  message: string
  onClose: () => void
}

export default function BookmarkModal({
  isOpen,
  onClose,
  message,
}: BookmarkModalProps) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose()
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end bottom-10 justify-center">
      <div className="w-[450px] bg-black/40 text-darkgray rounded-xl py-5 flex flex-col gap-4">
        <div className="flex flex-col items-center text-white text-sm">
          <p>{message}</p>
        </div>
      </div>
    </div>
  )
}
