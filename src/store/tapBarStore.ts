import { create } from 'zustand'

interface TapBarState {
  activeOption: string | null
  setActiveOption: (option: string) => void
}

export const useTapBarStore = create<TapBarState>((set) => ({
  activeOption: '',
  setActiveOption: (option) => {
    set({ activeOption: option })
  },
}))
