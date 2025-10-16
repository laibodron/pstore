import { trpc } from '../lib/trpc'

export const useProductCart = () => {
  const trpcUtils = trpc.useUtils()
  const mutation = trpc.addToCart.useMutation({
    onMutate: async (vars) => {
      await Promise.all([trpcUtils.getCartList.cancel(), trpcUtils.getProducts.cancel()])
      const prevCart = trpcUtils.getCartList.getData()
      const prevProducts = trpcUtils.getProducts.getData()
      const prevFavorites = trpcUtils.getFavorites.getData()

      if (prevCart) {
        const newCartList =
          vars.count > 0
            ? // если товар остаётся — просто обновляем count
              prevCart.cartList.map((p) => (p.id === vars.productId ? { ...p, countInCart: vars.count } : p))
            : // если count = 0 — удаляем товар из списка
              prevCart.cartList.filter((p) => p.id !== vars.productId)

        trpcUtils.getCartList.setData(undefined, {
          ...prevCart,
          cartList: newCartList,
        })
      }

      // обновляем кэш getProducts
      if (prevProducts) {
        trpcUtils.getProducts.setData(
          {},
          {
            ...prevProducts,
            products: prevProducts.products.map((p) =>
              p.id === vars.productId ? { ...p, isInCart: vars.count > 0, countInCart: vars.count } : p
            ),
          }
        )
      }

      if (prevFavorites) {
        const newFavorites =
          vars.count > 0
            ? prevFavorites.favorites.map((p) =>
                p.id === vars.productId ? { ...p, isInCart: true, countInCart: vars.count } : p
              )
            : prevFavorites.favorites.map((p) =>
                p.id === vars.productId ? { ...p, isInCart: false, countInCart: 0 } : p
              )

        trpcUtils.getFavorites.setData(undefined, {
          ...prevFavorites,
          favorites: newFavorites,
        })
      }

      return { prevCart, prevProducts, prevFavorites }
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prevCart) {
        trpcUtils.getCartList.setData(undefined, ctx.prevCart)
      }
      if (ctx?.prevProducts) {
        trpcUtils.getProducts.setData({}, ctx.prevProducts)
      }
      if (ctx?.prevFavorites) {
        trpcUtils.getFavorites.setData(undefined, ctx.prevFavorites)
      }
    },
    onSettled: async (_data, _error, vars) => {
      await Promise.all([
        trpcUtils.getCartList.invalidate(),
        trpcUtils.getProducts.invalidate(),
        trpcUtils.getFavorites.invalidate(),
        trpcUtils.getProduct.invalidate({ productId: vars.productId }),
      ])
    },
  })

  const updateCart = async ({ productId, count }: { productId: string; count: number }) => {
    await mutation.mutateAsync({ productId, count })
  }

  return { updateCart, isPending: mutation.isPending }
}
