import { trpc } from '../lib/trpc'

export const useProductCart = () => {
  const trpcUtils = trpc.useUtils()
  const mutation = trpc.addToCart.useMutation({
    onMutate: async (vars) => {
      await Promise.all([trpcUtils.getCartList.cancel(), trpcUtils.getProducts.cancel()])
      const prevCart = trpcUtils.getCartList.getData()
      const prevProducts = trpcUtils.getProducts.getData()

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
        trpcUtils.getProducts.setData(undefined, {
          ...prevProducts,
          products: prevProducts.products.map((p) =>
            p.id === vars.productId ? { ...p, isInCart: vars.count > 0, countInCart: vars.count } : p
          ),
        })
      }

      return { prevCart, prevProducts }
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prevCart) {
        trpcUtils.getCartList.setData(undefined, ctx.prevCart)
      }
      if (ctx?.prevProducts) {
        trpcUtils.getProducts.setData(undefined, ctx.prevProducts)
      }
    },
    onSettled: async () => {
      await Promise.all([trpcUtils.getCartList.invalidate(), trpcUtils.getProducts.invalidate()])
    },
  })

  const updateCart = async ({ productId, count }: { productId: string; count: number }) => {
    await mutation.mutateAsync({ productId, count })
  }

  return { updateCart, isPending: mutation.isPending }
}
