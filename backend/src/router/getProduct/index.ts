import { ExpectedError } from '../../lib/error'
import { trpcLoggedProcedure } from '../../lib/trpc'

import { zGetProductInput } from './input'

export const getProductTrpcRoute = trpcLoggedProcedure.input(zGetProductInput).query(async ({ input, ctx }) => {
  const product = await ctx.prisma.product.findUnique({
    where: {
      id: input.productId,
    },
  })

  if (!product) {
    throw new ExpectedError('Product not found')
  }

  return { product }
})
