import { create } from 'zustand'

export type modalTypes = 'login' | 'signup' | 'changePassword' | 'city' | null

type ModalState = {
  activeModal: modalTypes
  openModal: (type: modalTypes) => void
  openLogin: () => void
  openSignUp: () => void
  openChangePassword: () => void
  openCity: () => void
  isOpenLogin: boolean
  isOpenSignUp: boolean
  isOpenChangePassword: boolean
  isOpenCity: boolean
  closeModal: () => void
}

export const useModalStore = create<ModalState>((set) => {
  const updateBooleans = (type: modalTypes) => ({
    activeModal: type,
    isOpenLogin: type === 'login',
    isOpenSignUp: type === 'signup',
    isOpenChangePassword: type === 'changePassword',
    isOpenCity: type === 'city',
  })

  return {
    activeModal: null,
    openModal: (type) => set(updateBooleans(type)),
    openLogin: () => {
      set(updateBooleans('login'))
    },
    openSignUp: () => set(updateBooleans('signup')),
    openChangePassword: () => set(updateBooleans('changePassword')),
    openCity: () => set(updateBooleans('city')),
    isOpenLogin: false,
    isOpenSignUp: false,
    isOpenChangePassword: false,
    isOpenCity: false,
    closeModal: () => set(updateBooleans(null)),
  }
})
