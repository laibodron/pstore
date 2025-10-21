import { useMe } from '../lib/ctx'
import useLocalWishlistState from '../lib/store/useWishlist'
import { trpc } from '../lib/trpc'

export const useProductFavorite = () => {
  const me = useMe()
  const toggleLocalFavorite = useLocalWishlistState((state) => state.toggleItem)

  const trpcUtils = trpc.useUtils()
  const mutation = trpc.setItemFavorite.useMutation({
    onMutate: async ({ productId, isFavoriteByMe }) => {
      await Promise.all([
        trpcUtils.getProduct.cancel({ productId }),
        trpcUtils.getProducts.cancel(),
        trpcUtils.getFavorites.cancel(),
        trpcUtils.getCartList.cancel(),
      ])
      const oldProduct = trpcUtils.getProduct.getData({ productId })
      const oldFavorites = trpcUtils.getFavorites.getData()
      const oldCart = trpcUtils.getCartList.getData()

      if (oldProduct?.product) {
        trpcUtils.getProduct.setData(
          { productId },
          {
            ...oldProduct,
            product: {
              ...oldProduct.product,
              isFavoriteByMe,
            },
          }
        )
      }

      if (oldFavorites) {
        trpcUtils.getFavorites.setData(undefined, {
          ...oldFavorites,
          favorites: oldFavorites.favorites.map((p) => (p.id === productId ? { ...p, isFavoriteByMe } : p)),
        })
      }

      if (oldCart) {
        trpcUtils.getCartList.setData(undefined, {
          ...oldCart,
          cartList: oldCart.cartList.map((p) => (p.id === productId ? { ...p, isFavoriteByMe } : p)),
        })
      }

      return { oldProduct, oldFavorites, oldCart }
    },
    onError: (_err, vars, ctx) => {
      if (ctx?.oldProduct) {
        trpcUtils.getProduct.setData({ productId: vars.productId }, ctx.oldProduct)
      }
      if (ctx?.oldFavorites) {
        trpcUtils.getFavorites.setData(undefined, ctx.oldFavorites)
      }
      if (ctx?.oldCart) {
        trpcUtils.getCartList.setData(undefined, ctx.oldCart)
      }
    },
    onSettled: async (_data, _error, vars) => {
      await Promise.all([
        trpcUtils.getProduct.invalidate({ productId: vars.productId }),
        trpcUtils.getProducts.invalidate(),
        trpcUtils.getCartList.invalidate(),
      ])
    },
  })

  const toggleFavorite = async ({ productId, isFavoriteByMe }: { productId: string; isFavoriteByMe: boolean }) => {
    if (me) {
      await mutation.mutateAsync({ productId, isFavoriteByMe })
    } else {
      toggleLocalFavorite(productId)
    }
  }

  return { toggleFavorite, isPending: mutation.isPending }
}
