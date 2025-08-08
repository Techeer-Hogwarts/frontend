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
  roleId: number
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
      isLoggedIn: null, // 초기 상태를 null로 설정해서 Hydration mismatch 방지
      user: null,

      setIsLoggedIn: (status: boolean) => set({ isLoggedIn: status }),
      setUser: (user: User | null) => set({ user }),
      checkAuth: async () => {
        try {
          const response = await fetch('/api/users', {
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
      logout: async () => {
        try {
          const response = await fetch('/api/auth/logout', {
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
          set({ isLoggedIn: false, user: null })
        } catch (error) {
          console.error(error)
        }
      },
    }),
    {
      name: 'auth-storage',
      storage:
        typeof window !== 'undefined'
          ? {
              getItem: (name: string) => {
                const item = localStorage.getItem(name)
                return item ? JSON.parse(item) : null
              },
              setItem: (name: string, value: unknown) =>
                localStorage.setItem(name, JSON.stringify(value)),
              removeItem: (name: string) => localStorage.removeItem(name),
            }
          : undefined, // ✅ getStorage 대신 storage 사용
      partialize: (state) => ({
        isLoggedIn: state.isLoggedIn,
        user: state.user,
      }),
    },
  ),
)
