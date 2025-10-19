import { type ICreatePayment, YooCheckout } from '@a2seven/yoo-checkout'

import { ExpectedError } from '../../lib/error'
import { trpcLoggedProcedure } from '../../lib/trpc'

import { zCreateOrderInput } from './input'

export const createOrderTrpcRoute = trpcLoggedProcedure.input(zCreateOrderInput).mutation(async ({ input, ctx }) => {
  const newOrder = await ctx.prisma.order.create({
    data: {
      email: input.email,
      phoneNumber: input.phoneNumber,
      status: 'CREATED',
      totalPrice: input.cartItems.reduce((prevVal, el) => prevVal + el.price * el.countInCart, 0),
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

  const checkout = new YooCheckout({
    shopId: '1188560',
    secretKey: 'test_6i4mz0k6uRzg3KEjEJxJPmsml6Nj03k0cAjZRe6qNS8',
  })
  const createPayload: ICreatePayment = {
    amount: {
      value: String(newOrder.totalPrice),
      currency: 'RUB',
    },
    capture: true,
    payment_method_data: {
      type: 'bank_card',
    },
    confirmation: {
      type: 'redirect',
      return_url: 'http://localhost:8000/profile/orders',
    },
    description: `Заказ №${newOrder.serialNumber}`,
    metadata: {
      orderId: newOrder.id,
    },
  }
  try {
    const payment = await checkout.createPayment(createPayload, newOrder.id)
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
