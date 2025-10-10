import { getCloudinaryUploadUrl } from '@pstore/shared/src/cloudinary'

import { trpcLoggedProcedure } from '../../lib/trpc'

import { zGetNRandomProductsInput } from './input'

export const getNRandomProductsTrpcRoute = trpcLoggedProcedure
  .input(zGetNRandomProductsInput)
  .query(async ({ input, ctx }) => {
    const products: { id: string; title: string; price: number; images: string[] }[] = await ctx.prisma.$queryRaw`
      SELECT id, title, price, images FROM "Product"
      ORDER BY RANDOM()
      LIMIT ${input.n}
    `
    for (const product of products) {
      if (product.images.length) {
        product.images = product.images.map((el) => getCloudinaryUploadUrl(el, 'image', 'preview'))
      } else {
        product.images = ['https://static.baza.farpost.ru/v/1436587505475_bulletin']
      }
    }

    return { products }
  })
