'use client'

import React from 'react'
import { fetchUserProfile } from '@/api/mypage/myprofile'
import { useQuery } from '@tanstack/react-query'
import { useState, useEffect } from 'react'

export const useFetchProfile = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [userId, setUserId] = useState()

  const {
    data: profile,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ['userProfile'],
    queryFn: () => fetchUserProfile(),
    retry: false,
  })

  useEffect(() => {
    if (error?.message === 'Unauthorized') {
      setAuthModalOpen(true)
    }
  }, [error])

  useEffect(() => {
    setUserId(profile?.id)
    console.log(profile)
  }, [profile])

  return { authModalOpen, profile, loading, setAuthModalOpen, error, userId }
}
