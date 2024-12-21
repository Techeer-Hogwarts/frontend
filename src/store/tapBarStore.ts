import create from 'zustand'

interface TapBarState {
  activeOption: string | null
  setActiveOption: (option: string) => void
}

export const useTapBarStore = create<TapBarState>((set) => ({
  activeOption: null,
  setActiveOption: (option) => {
    console.log('쥬스탠드가 보관! - ', option) // 상태 변경 시 콘솔에 출력
    set({ activeOption: option })
  },
}))
