import { create } from 'zustand'

interface TapBarState {
  activeOption: string | null
  setActiveOption: (option: string) => void
}

export const useTapBarStore = create<TapBarState>((set) => ({
  activeOption: '전체보기', // 기본값 설정
  setActiveOption: (option) => {
    set({ activeOption: option })
  },
}))
