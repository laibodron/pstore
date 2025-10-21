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
      include: {
        ...(ctx.me && {
          productFavorite: {
            where: {
              userId: ctx.me?.id,
            },
          },
        }),
        ...(ctx.me && {
          productCart: {
            where: {
              userId: ctx.me?.id,
            },
          },
        }),
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
      description: product.description,
      article: product.article,
      createdAt: product.createdAt,
      isFavoriteByMe: product.productFavorite?.length > 0,
      isInCart: product.productCart?.length > 0,
    }))

    return { productsById: pickedProductsById, count }
  })

// isFavoriteByMe: boolean;
//   isInCart: boolean;
//   createdAt: Date;
//   article: string;
//   description: string | null;

//   id: string;
//   title: string;
//   price: number;
//   images: string[];
