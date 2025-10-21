import { getCloudinaryUploadUrl } from '@pstore/shared/src/cloudinary'

import { ExpectedError } from '../../lib/error'
import { logger } from '../../lib/logger'
import { trpcLoggedProcedure } from '../../lib/trpc'

export const getFavoritesTrpcRoute = trpcLoggedProcedure.query(async ({ ctx }) => {
  // if (!ctx.me) {
  // return []
  //   throw new ExpectedError('UNAUTHORIZED')
  // }
  // logger.info('getFavorites', '', {me: ctx.me})
  const rawFavorites = await ctx.prisma.productFavorite.findMany({
    where: { userId: ctx.me?.id || '' },
    include: {
      product: {
        select: {
          id: true,
          article: true,
          title: true,
          price: true,
          createdAt: true,
          description: true,
          images: true,
          productCart: {
            where: { userId: ctx.me?.id },
            select: { id: true },
          },
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  })
  // logger.info('getFavorites', '', {me: ctx.me, rawFavorites})
  const favorites = rawFavorites.map((fav) => ({
    id: fav.product.id,
    title: fav.product.title,
    price: fav.product.price,
    images: fav.product.images.length
      ? fav.product.images.map((el) => getCloudinaryUploadUrl(el, 'image', 'preview'))
      : ['https://static.baza.farpost.ru/v/1436587505475_bulletin'],
    description: fav.product.description,
    createdAt: fav.product.createdAt,
    isFavoriteByMe: true,
    isInCart: fav.product.productCart.length > 0,
    article: fav.product.article,
  }))
  return {
    favorites,
    count: favorites.length,
  }
})
