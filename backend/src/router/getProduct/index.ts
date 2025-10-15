import { getCloudinaryUploadUrl } from '@pstore/shared/src/cloudinary'
import omit from '@pstore/shared/src/omit'

import { ExpectedError } from '../../lib/error'
import { trpcLoggedProcedure } from '../../lib/trpc'

import { zGetProductInput } from './input'

export const getProductTrpcRoute = trpcLoggedProcedure.input(zGetProductInput).query(async ({ input, ctx }) => {
  const rawProduct = await ctx.prisma.product.findUnique({
    where: {
      id: input.productId,
    },
    include: {
      productFavorite: {
        where: { userId: ctx.me?.id, productId: input.productId },
        select: { id: true },
      },
      productCart: {
        where: { userId: ctx.me?.id, productId: input.productId },
        select: { id: true, count: true },
      },
    },
  })

  if (!rawProduct) {
    throw new ExpectedError('Product not found')
  }

  rawProduct.images = rawProduct.images.length
    ? rawProduct.images.map((el) => getCloudinaryUploadUrl(el, 'image', 'large'))
    : ['https://static.baza.farpost.ru/v/1436587505475_bulletin']
  const product = {
    ...omit(rawProduct, ['productFavorite', 'productCart']),
    isFavoriteByMe: rawProduct.productFavorite.length > 0,
    isInCart: rawProduct.productCart.length > 0,
  }

  return { product }
})
