import { getCloudinaryUploadUrl } from '@pstore/shared/src/cloudinary'

import { ExpectedError } from '../../lib/error'
import { trpcLoggedProcedure } from '../../lib/trpc'

export const getMyOrdersTrpcRoute = trpcLoggedProcedure.query(async ({ ctx }) => {
  const rawMyOrders = await ctx.prisma.order.findMany({
    where: {
      userId: ctx.me?.id,
    },
    include: {
      orderStructures: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  const myOrders = rawMyOrders.map((order) => ({
    createdAt: order.createdAt,
    email: order.email,
    id: order.id,
    products: order.orderStructures.map((product) => ({
      id: product.product.id,
      article: product.product.article,
      title: product.product.title,
      count: product.count,
      price: product.price,
      description: product.product.description,
      images: product.product.images.length
        ? product.product.images.map((el) => getCloudinaryUploadUrl(el, 'image', 'preview'))
        : ['https://static.baza.farpost.ru/v/1436587505475_bulletin'],
    })),
    paymentId: order.paymentId,
    phoneNumber: order.phoneNumber,
    serialNumber: order.serialNumber,
    status: order.status,
    totalPrice: order.totalPrice,
  }))

  return { myOrders }
})
