'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ProjectTeam {
  id: number
  name: string
  resultImages: string[]
}

interface Experience {
  id: number
  position: string
  companyName: string
  startDate: string
  endDate: string
  category: string
  isFinished: boolean
}

interface User {
  id: number
  profileImage: string
  name: string
  nickname: string
  email: string
  school: string
  grade: string
  mainPosition: string
  subPosition: string
  githubUrl: string | null
  mediumUrl: string | null
  velogUrl: string | null
  tistoryUrl: string | null
  isLft: boolean
  year: number
  stack: string[]
  projectTeams: ProjectTeam[]
  experiences: Experience[]
}

interface AuthState {
  isLoggedIn: boolean
  user: User | null
  setIsLoggedIn: (status: boolean) => void
  setUser: (user: User | null) => void
  checkAuth: () => Promise<void>
  logout: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      user: null,

      setIsLoggedIn: (status: boolean) => set({ isLoggedIn: status }),
      setUser: (user: User | null) => set({ user }),

      // 쿠키의 유효성을 서버 API로 확인
      checkAuth: async () => {
        try {
          const response = await fetch('/api/v1/users', {
            method: 'GET',
            credentials: 'include',
          })

          if (response.ok) {
            const data: User = await response.json()
            set({ isLoggedIn: true, user: data })
          } else {
            set({ isLoggedIn: false, user: null })
          }
        } catch (error) {
          set({ isLoggedIn: false, user: null })
        }
      },

      // 로그아웃 API 호출 후 쿠키 삭제 처리
      logout: async () => {
        try {
          const response = await fetch('/api/v1/auth/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({}),
          })
          if (!response.ok) {
            throw new Error(
              `Logout request failed with status ${response.status}`,
            )
          }
          // 로그아웃 성공 시 상태 초기화
          set({ isLoggedIn: false, user: null })
        } catch (error) {
          console.error(error)
        }
      },
    }),
    {
      name: 'auth-storage', // 로컬 스토리지에 저장될 키 이름
      getStorage: () => localStorage, // 저장 방식 (localStorage 사용)
      partialize: (state) => ({
        isLoggedIn: state.isLoggedIn,
        user: state.user,
      }), // 저장할 데이터 필터링
    },
  ),
)
