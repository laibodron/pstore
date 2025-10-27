import { ExpectedError } from '../../lib/error'
import { trpcLoggedProcedure } from '../../lib/trpc'
import { yooKassaCreatePayment } from '../../services/yookassa/createPayment'

import { zCreateOrderInput } from './input'

export const createOrderTrpcRoute = trpcLoggedProcedure.input(zCreateOrderInput).mutation(async ({ input, ctx }) => {
  const newOrder = await ctx.prisma.order.create({
    data: {
      email: input.email,
      phoneNumber: input.phoneNumber,
      status: 'CREATED',
      totalPrice: input.cartItems.reduce((prevVal, el) => prevVal + el.price * el.countInCart, 0), //todo change it
      userId: ctx.me?.id,
      orderStructures: {
        create: input.cartItems.map((el) => ({
          productId: el.id,
          price: el.price,
          count: el.countInCart,
        })),
      },
    },
    include: {
      orderStructures: true,
    },
  })

  try {
    const payment = await yooKassaCreatePayment({
      amountVal: String(newOrder.totalPrice),
      description: `Заказ №${newOrder.serialNumber}`,
      metadataOrderId: newOrder.id,
      idempotenceKey: newOrder.id,
    })
    await ctx.prisma.order.update({
      where: {
        id: newOrder.id,
      },
      data: {
        paymentId: payment.id,
      },
    })
    return { url: payment.confirmation.confirmation_url }
  } catch (error) {
    // console.error(error)
    await ctx.prisma.order.delete({
      where: {
        id: newOrder.id,
      },
    })
    throw new ExpectedError('payment dont create')
  }
})
