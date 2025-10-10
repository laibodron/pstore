import { getCloudinaryUploadUrl } from '@pstore/shared/src/cloudinary'

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

  if (product.images.length) {
    product.images = product.images.map((el) => getCloudinaryUploadUrl(el, 'image', 'large'))
  } else {
    product.images = ['https://static.baza.farpost.ru/v/1436587505475_bulletin']
  }

  return { product }
})
