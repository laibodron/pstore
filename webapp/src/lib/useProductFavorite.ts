import { trpc } from './trpc'

export const useProductFavorite = ({ productId }: { productId: string }) => {
  const trpcUtils = trpc.useUtils()
  const mutation = trpc.setItemFavorite.useMutation({
    onMutate: async ({ isFavoriteByMe }) => {
      await Promise.all([trpcUtils.getProduct.cancel({ productId }), trpcUtils.getFavorites.cancel()])
      const oldProduct = trpcUtils.getProduct.getData({ productId })
      const oldFavorites = trpcUtils.getFavorites.getData()

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

      return { oldProduct, oldFavorites }
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.oldProduct) {
        trpcUtils.getProduct.setData({ productId }, ctx.oldProduct)
      }
      if (ctx?.oldFavorites) {
        trpcUtils.getFavorites.setData(undefined, ctx.oldFavorites)
      }
    },
    onSettled: async () => {
      await trpcUtils.getProduct.invalidate({ productId })
      await trpcUtils.getProducts.invalidate()
    },
  })

  const toggleFavorite = async (isFavoriteByMe: boolean) => {
    await mutation.mutateAsync({ productId, isFavoriteByMe })
  }

  return { toggleFavorite, isPending: mutation.isPending }
}
