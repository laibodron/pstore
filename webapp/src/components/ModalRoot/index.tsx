import { useEffect } from 'react'

import { useMe } from '../../lib/ctx'
import useCartStore from '../../lib/store/useCart'
import { useModalStore } from '../../lib/store/useModal'
import useLocalWishlistState from '../../lib/store/useWishlist'
import { trpc } from '../../lib/trpc'
import ChangePasswordModal from '../ChangePasswordModal'
import CityModal from '../CityModal'
import LogInModal from '../LogInModal'
import SignUpModal from '../SignUpModal'

const ModalRoot = () => {
  const { isOpenLogin, isOpenSignUp, isOpenChangePassword, isOpenCity, closeModal } = useModalStore()
  const trpcUtils = trpc.useUtils()
  const me = useMe()
  const mutateCart = trpc.addToCart.useMutation()
  const mutateFav = trpc.setItemFavorite.useMutation()
  const wishlist = useLocalWishlistState((state) => state.items)
  const clearWishlist = useLocalWishlistState((state) => state.clearWishlist)
  const clearCart = useCartStore((state) => state.clearCart)
  const cart = useCartStore((state) => state.items)
  const cartList = Array.from(cart, ([id, quantity]) => ({ id, quantity }))

  useEffect(() => {
    if (!me || (!wishlist.length && !cartList.length)) {
      return
    }

    ;(async () => {
      try {
        if (wishlist.length) {
          await Promise.all(wishlist.map((el) => mutateFav.mutateAsync({ productId: el.id, isFavoriteByMe: true })))
          clearWishlist()
        }
        if (cartList.length) {
          await Promise.all(cartList.map((el) => mutateCart.mutateAsync({ productId: el.id, count: el.quantity })))
          clearCart()
        }
        trpcUtils.invalidate()
      } catch (err) {
        console.error('sync error', err)
      }
    })()
  }, [me])

  return (
    <>
      <LogInModal open={isOpenLogin} close={closeModal} />
      <SignUpModal open={isOpenSignUp} close={closeModal} />
      <ChangePasswordModal open={isOpenChangePassword} close={closeModal} />
      <CityModal open={isOpenCity} close={closeModal} />
    </>
  )
}

export default ModalRoot
