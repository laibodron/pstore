import { create } from 'zustand'

type WishlistState = {
  items: { id: string }[]
  isExist: (id: string) => boolean
  addItem: (id: string) => void
  removeItem: (id: string) => void
  clearWishlist: () => void
}

const useWishlistState = create<WishlistState>((set, get) => ({
  items: [],
  isExist: (id: string) => {
    return !!get().items.find((el) => el.id === id)
  },
  addItem: (id: string) => {
    if (!get().isExist(id)) {
      set((state) => ({ items: [...state.items, { id }] }))
    } else {
      get().removeItem(id)
    }
  },
  removeItem: (id: string) => {
    if (get().isExist(id)) {
      set((state) => ({ items: state.items.filter((el) => el.id !== id) }))
    }
  },
  clearWishlist: () => set({ items: [] }),
}))

export default useWishlistState
