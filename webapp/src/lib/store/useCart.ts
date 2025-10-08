import { create } from 'zustand'

type CartState = {
  items: { id: string; quantity: number }[]
  addItem: (id: string, quantity?: number) => void
  removeItem: (id: string) => void
  clearCart: () => void
}

const useCartStore = create<CartState>((set) => ({
  items: [],
  addItem: (id: string, quantity: number = 1) =>
    set((state) => {
      const existingItem = state.items.find((item) => item.id === id)
      if (existingItem) {
        return {
          items: state.items.map((item) => (item.id === id ? { ...item, quantity: item.quantity + quantity } : item)),
        }
      }
      return { items: [...state.items, { id, quantity }] }
    }),
  removeItem: (id: string) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),
  clearCart: () => set({ items: [] }),
}))

export default useCartStore
