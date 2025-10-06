import { trpcLoggedProcedure } from '../../lib/trpc'

export const getProductsTrpcRoute = trpcLoggedProcedure.query(async ({ ctx }) => {
  const count = await ctx.prisma.product.count()
  const products = await ctx.prisma.product.findMany()

  return { products, count }
})
