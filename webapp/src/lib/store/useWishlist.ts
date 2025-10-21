import { create } from 'zustand'

type LocalWishlistState = {
  items: { id: string }[]
  isExist: (id: string) => boolean
  addItem: (id: string) => void
  removeItem: (id: string) => void
  clearWishlist: () => void
  toggleItem: (id: string) => void
}

const useLocalWishlistState = create<LocalWishlistState>((set, get) => {
  return {
    items: [],
    isExist: (id: string) => {
      return !!get().items.find((el) => el.id === id)
    },
    toggleItem: (id: string) => {
      if (get().isExist(id)) {
        get().removeItem(id)
      } else {
        get().addItem(id)
      }
    },
    addItem: (id: string) => {
      set((state) => ({ items: [...state.items, { id }] }))
    },
    setItem: (id: string) => {},
    removeItem: (id: string) => {
      if (get().isExist(id)) {
        set((state) => ({ items: state.items.filter((el) => el.id !== id) }))
      }
    },
    clearWishlist: () => set({ items: [] }),
  }
})

export default useLocalWishlistState
