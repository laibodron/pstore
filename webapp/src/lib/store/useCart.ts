import { create } from 'zustand'

type CartState = {
  items: { id: string; quantity: number }[]
  addItem: (id: string, quantity?: number) => void
  removeItem: (id: string) => void
  clearCart: () => void
}

const useCartStore = create<CartState>((set) => ({
  items: [{ id: 'b4904cd5-6ce1-454f-8da8-5dd5727d1ba6', quantity: 1 }],
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
