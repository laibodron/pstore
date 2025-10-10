import { getCloudinaryUploadUrl } from '@pstore/shared/src/cloudinary'

import { trpcLoggedProcedure } from '../../lib/trpc'

// import { zGetProductsInput } from './input'

export const getProductsTrpcRoute = trpcLoggedProcedure
  // .input(zGetProductsInput)
  .query(async ({ ctx }) => {
    const count = await ctx.prisma.product.count()
    const products = await ctx.prisma.product.findMany()

    for (const product of products) {
      if (product.images.length) {
        product.images = product.images.map((el) => getCloudinaryUploadUrl(el, 'image', 'preview'))
      } else {
        product.images = ['https://static.baza.farpost.ru/v/1436587505475_bulletin']
      }
    }
    return { products, count }
  })
