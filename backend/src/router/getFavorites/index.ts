import { ExpectedError } from '../../lib/error'
import { trpcLoggedProcedure } from '../../lib/trpc'

export const getFavoritesTrpcRoute = trpcLoggedProcedure.query(async ({ ctx }) => {
  if (!ctx.me) {
    throw new ExpectedError('UNAUTHORIZED')
  }

  const favorites = await ctx.prisma.productFavorite.findMany({
    where: { userId: ctx.me?.id },
    select: { productId: true },
  })

  return { favorites }
})
