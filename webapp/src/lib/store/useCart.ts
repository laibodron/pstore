import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type CartState = {
  // items: { id: string; quantity: number }[]
  clearCart: () => void
  qInCart: (id: string) => number
  items: Map<string, number>
  removeItem: (id: string) => void
  addItem: (id: string, quantity?: number) => void
  setItem: (id: string, quantity: number) => void
  itemsToAr: (items: Map<string, number>) => { id: string; quantity: number }[]
}

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: new Map<string, number>(),
      setItem: (id: string, quantity: number) =>
        set((state) => {
          const newItems = new Map(state.items)
          if (quantity > 0) {
            newItems.set(id, quantity)
          } else {
            newItems.delete(id)
          }
          return { items: newItems }
        }),
      removeItem: (id: string) =>
        set((state) => {
          const newItems = new Map(state.items)
          newItems.delete(id)
          return { items: newItems }
        }),
      addItem: (id: string, quantity: number = 1) =>
        set((state) => {
          const newItems = new Map(state.items)
          const item = newItems.get(id)
          if (item) {
            if (item + quantity <= 0) {
              newItems.delete(id)
            } else {
              newItems.set(id, item + quantity)
            }
          } else {
            if (quantity > 0) {
              newItems.set(id, quantity)
            }
          }
          return { items: newItems }
        }),
      qInCart: (id: string) => {
        return get().items.get(id) ?? 0
      },
      clearCart: () =>
        set(() => {
          const items = new Map<string, number>()
          return { items }
        }),
      itemsToAr: (items: Map<string, number>): { id: string; quantity: number }[] =>
        Array.from(items, ([id, quantity]) => ({ id, quantity })),
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({
        items: Array.from(state.items.entries()), // Map → массив пар
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.items = new Map(Array.from(state.items))
        }
      },
    }
  )
)

export default useCartStore
