import { trpcLoggedProcedure } from '../../lib/trpc'

import { zGetProductsInput } from './input'

export const getProductsTrpcRoute = trpcLoggedProcedure.input(zGetProductsInput).query(async ({ ctx, input }) => {
  const count = await ctx.prisma.product.count()
  const products = await ctx.prisma.product.findMany()

  return { products, count }
})
