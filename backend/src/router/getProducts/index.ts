import { getCloudinaryUploadUrl } from '@pstore/shared/src/cloudinary'
import omit from '@pstore/shared/src/omit'

import { trpcLoggedProcedure } from '../../lib/trpc'

import { zGetProductsInput } from './input'

export const getProductsTrpcRoute = trpcLoggedProcedure.input(zGetProductsInput).query(async ({ ctx, input }) => {
  const sortMap = {
    'price-asc': { price: 'asc' },
    'price-desc': { price: 'desc' },
    'name-asc': { title: 'asc' },
    'name-desc': { title: 'desc' },
    'time-desc': { createdAt: 'desc' },
  } as const

  const count = await ctx.prisma.product.count()
  const productsRaw = await ctx.prisma.product.findMany({
    include: {
      _count: {
        select: {
          productCart: true,
          productFavorite: true,
        },
      },
    },
    orderBy: [sortMap[input.sort] ?? {price: 'asc'}, { createdAt: 'desc' }, { id: 'asc' }],
    skip: (input.page - 1) * input.limit,
    take: input.limit,
  })

  const products = productsRaw.map((product) => {
    product.images = product.images.length
      ? product.images.map((el) => getCloudinaryUploadUrl(el, 'image', 'preview'))
      : ['https://static.baza.farpost.ru/v/1436587505475_bulletin']
    return {
      ...omit(product, ['_count']),
      isFavoriteByMe: product._count.productFavorite > 0,
      isInCart: product._count.productCart > 0,
    }
  })

  const totalCountPages = Math.ceil(count / input.limit)

  return { products, count, totalCountPages }
})
