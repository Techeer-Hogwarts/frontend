// store/authStore.ts
'use client'

import { create } from 'zustand'
import axios from 'axios'

interface AuthState {
  isLoggedIn: boolean
  setIsLoggedIn: (status: boolean) => void
  logout: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  setIsLoggedIn: (status: boolean) => set({ isLoggedIn: status }),

  logout: async () => {
    try {
      // 로그아웃 API 호출
      await axios.post(
        'https://api.techeerzip.cloud/api/v1/auth/logout',
        {},
        {
          withCredentials: true,
        },
      )

      set({ isLoggedIn: false })
    } catch (error) {
      console.error('Logout error:', error)
      throw error
    }
  },
}))
