import { create } from 'zustand'

export type modalTypes = 'login' | 'signup' | 'changePassword' | null

type ModalState = {
  activeModal: modalTypes
  openModal: (type: modalTypes) => void
  openLogin: () => void
  openSignUp: () => void
  openChangePassword: () => void
  isOpenLogin: boolean
  isOpenSignUp: boolean
  isOpenChangePassword: boolean
  closeModal: () => void
}

export const useModalStore = create<ModalState>((set) => {
  const updateBooleans = (type: modalTypes) => ({
    activeModal: type,
    isOpenLogin: type === 'login',
    isOpenSignUp: type === 'signup',
    isOpenChangePassword: type === 'changePassword',
  })

  return {
    activeModal: null,
    openModal: (type) => set(updateBooleans(type)),
    openLogin: () => {
      console.log('openLogin')
      set(updateBooleans('login'))
    },
    openSignUp: () => set(updateBooleans('signup')),
    openChangePassword: () => set(updateBooleans('changePassword')),
    isOpenLogin: false,
    isOpenSignUp: false,
    isOpenChangePassword: false,
    closeModal: () => set(updateBooleans(null)),
  }
})
