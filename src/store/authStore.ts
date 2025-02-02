'use client'

import { create } from 'zustand'

interface AuthState {
  isLoggedIn: boolean
  setIsLoggedIn: (status: boolean) => void
  checkAuth: () => Promise<void>
  logout: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,

  setIsLoggedIn: (status: boolean) => set({ isLoggedIn: status }),

  // 쿠키의 유효성을 서버 API로 확인
  checkAuth: async () => {
    try {
      const response = await fetch('/api/v1/users', {
        method: 'GET',
        credentials: 'include',
      })

      if (response.ok) {
        set({ isLoggedIn: true })
      } else {
        set({ isLoggedIn: false })
      }
    } catch (error) {
      console.error('checkAuth error:', error)
      set({ isLoggedIn: false })
    }
  },

  // 로그아웃 API 호출 후 쿠키 삭제 처리 (백엔드에서 HttpOnly 쿠키 제거)
  logout: async () => {
    try {
      const response = await fetch('/api/v1/auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({}),
      })
      if (!response.ok) {
        throw new Error(`Logout request failed with status ${response.status}`)
      }
      // 로그아웃 성공 시 상태 업데이트
      set({ isLoggedIn: false })
    } catch (error) {
      console.error('Logout error:', error)
      throw error
    }
  },
}))
