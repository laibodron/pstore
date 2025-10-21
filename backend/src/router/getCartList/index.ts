import { getCloudinaryUploadUrl } from '@pstore/shared/src/cloudinary'

import { ExpectedError } from '../../lib/error'
import { trpcLoggedProcedure } from '../../lib/trpc'

import { zGetCartListOutput } from './output'

export const getCartListTrpcRoute = trpcLoggedProcedure.output(zGetCartListOutput).query(async ({ ctx }) => {
  // if (!ctx.me) {
  // return []
  // throw new ExpectedError('UNAUTHORIZED')
  // }

  const rawCartList = await ctx.prisma.productCart.findMany({
    where: {
      userId: ctx.me?.id || '',
    },
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
          productFavorite: {
            where: { userId: ctx.me?.id },
            select: { id: true },
          },
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  const cartList = rawCartList.map((product) => ({
    id: product.product.id,
    title: product.product.title,
    price: product.product.price,
    images: product.product.images.length
      ? product.product.images.map((el) => getCloudinaryUploadUrl(el, 'image', 'preview'))
      : ['https://static.baza.farpost.ru/v/1436587505475_bulletin'],
    description: product.product.description,
    createdAt: product.product.createdAt,
    article: product.product.article,
    countInCart: product.count,
    isFavoriteByMe: product.product.productFavorite.length > 0,
  }))

  return { cartList }
})
