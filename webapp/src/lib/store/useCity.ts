import { create } from 'zustand'

type UseCityState = {
  city: string
  changeCity: (city: string) => void
}

const useCityState = create<UseCityState>((set) => ({
  city: 'Москва',
  changeCity: (city: string) => set({ city }),
}))

export default useCityState
