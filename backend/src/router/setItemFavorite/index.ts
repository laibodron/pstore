import { ExpectedError } from '../../lib/error'
import { trpcLoggedProcedure } from '../../lib/trpc'

import { zSetItemFavoriteTrpcInput } from './input'

export const setItemFavoriteTrpcRoute = trpcLoggedProcedure
  .input(zSetItemFavoriteTrpcInput)
  .mutation(async ({ ctx, input }) => {
    const { productId, isFavoriteByMe } = input

    if (!ctx.me) {
      throw new ExpectedError('UNAUTHORIZED')
    }

    const product = await ctx.prisma.product.findUnique({
      where: {
        id: productId,
      },
    })

    if (!product) {
      throw new ExpectedError('NOT_FOUND')
    }

    if (isFavoriteByMe) {
      await ctx.prisma.productFavorite.upsert({
        where: {
          userId_productId: {
            productId,
            userId: ctx.me.id,
          },
        },
        create: {
          userId: ctx.me.id,
          productId,
        },
        update: {},
      })
    } else {
      await ctx.prisma.productFavorite.delete({
        where: {
          userId_productId: {
            productId,
            userId: ctx.me.id,
          },
        },
      })
    }
    return {
      product: {
        id: product.id,
        isFavoriteByMe,
      },
    }
  })
