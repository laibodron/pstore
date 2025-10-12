import { getCloudinaryUploadUrl } from '@pstore/shared/src/cloudinary'

import { trpcLoggedProcedure } from '../../lib/trpc'

import { zGetProductsByIdInput } from './input'

export const getProductsByIdTrpcRoute = trpcLoggedProcedure
  .input(zGetProductsByIdInput)
  .query(async ({ ctx, input }) => {
    // const count1 = await ctx.prisma.product.count()
    const productsById = await ctx.prisma.product.findMany({
      where: {
        id: {
          in: input.ids,
        },
      },
    })

    const count = productsById.length.toString()

    const pickedProductsById = productsById.map((product) => ({
      id: product.id,
      title: product.title,
      price: product.price,
      images: product.images.length
        ? product.images.map((el) => getCloudinaryUploadUrl(el, 'image', 'preview'))
        : ['https://static.baza.farpost.ru/v/1436587505475_bulletin'],
    }))

    return { productsById: pickedProductsById, count }
  })
