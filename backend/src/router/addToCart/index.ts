import { ExpectedError } from '../../lib/error'
import { trpcLoggedProcedure } from '../../lib/trpc'

import { zAddToCartInput } from './input'

export const addToCartTrpcRoute = trpcLoggedProcedure.input(zAddToCartInput).mutation(async ({ ctx, input }) => {
  if (!ctx.me) {
    throw new ExpectedError('UNAUTHORIZED')
  }

  const product = await ctx.prisma.product.findUnique({
    where: {
      id: input.productId,
    },
  })

  if (!product) {
    throw new ExpectedError('NOT_FOUND')
  }

  if (input.count > 0) {
    await ctx.prisma.productCart.upsert({
      where: {
        userId_productId: {
          userId: ctx.me.id,
          productId: input.productId,
        },
      },
      create: {
        userId: ctx.me.id,
        productId: input.productId,
        count: input.count,
      },
      update: {
        count: input.count,
      },
    })
  } else {
    await ctx.prisma.productCart.delete({
      where: {
        userId_productId: {
          userId: ctx.me.id,
          productId: input.productId,
        },
      },
    })
  }
  return true
})
