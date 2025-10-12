import { getCloudinaryUploadUrl } from '@pstore/shared/src/cloudinary'
import omit from '@pstore/shared/src/omit'

import { trpcLoggedProcedure } from '../../lib/trpc'

// import { zGetProductsInput } from './input'

export const getProductsTrpcRoute = trpcLoggedProcedure
  // .input(zGetProductsInput)
  .query(async ({ ctx }) => {
    const count = await ctx.prisma.product.count()
    const productsRaw = await ctx.prisma.product.findMany({
      include: {
        productFavorite: {
          where: { userId: ctx.me?.id },
          select: { id: true },
        },
      },
    })

    const products = productsRaw.map((product) => {
      if (product.images.length) {
        product.images = product.images.map((el) => getCloudinaryUploadUrl(el, 'image', 'preview'))
      } else {
        product.images = ['https://static.baza.farpost.ru/v/1436587505475_bulletin']
      }
      return { ...omit(product, ['productFavorite']), isFavoriteByMe: product.productFavorite.length > 0 }
    })

    return { products, count }
  })
