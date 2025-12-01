'use client'

import { useRouter } from 'next/navigation'
import ShowVideo from '@/components/session/ShowVideo'

export default function SessionVideoModal() {
  const router = useRouter()

  const handleClose = () => {
    router.back()
  }

  return <ShowVideo onClose={handleClose} />
}

