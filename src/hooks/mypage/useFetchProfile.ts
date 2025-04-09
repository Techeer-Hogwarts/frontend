'use client'

import React from 'react'
import { fetchUserProfile } from '@/api/mypage/myprofile'
import { useQuery } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import { ProfileData } from '@/types/mypage/mypage.types'

export const useFetchProfile = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false)

  const {
    data: profile,
    isLoading: loading,
    error,
  } = useQuery<ProfileData>({
    queryKey: ['userProfile'],
    queryFn: () => fetchUserProfile(),
    retry: false,
  })

  useEffect(() => {
    if (error?.message === 'Unauthorized') {
      setAuthModalOpen(true)
    }
  }, [error])

  return { authModalOpen, profile, loading, setAuthModalOpen, error }
}
