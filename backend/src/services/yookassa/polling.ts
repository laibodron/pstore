import { AppContext } from '../../lib/ctx'
import { logger } from '../../lib/logger'

import { yooKassa } from './client'

const POLLING_INTERVAL_MS = 5 * 60 * 1000

export function applyStartYookassaPolling(ctx: AppContext) {
  logger.info('yookassa', 'Starting polling loop...')

  const run = async () => {
    try {
      const pendingOrders = await ctx.prisma.order.findMany({
        where: { status: 'CREATED' },
        select: { id: true, paymentId: true },
      })

      logger.info('yookassa', `Found ${pendingOrders.length} pending orders to check`)

      for (const order of pendingOrders) {
        if (!order.paymentId) {
          continue
        }

        try {
          const payment = await yooKassa.getPayment(order.paymentId)

          if (payment.status === 'succeeded') {
            logger.info('yookassa', `Payment succeeded: ${payment.id}`)
            await ctx.prisma.order.update({
              where: { id: order.id },
              data: { status: 'PAID' },
            })
          } else if (payment.status === 'canceled') {
            logger.info('yookassa', `Payment canceled: ${payment.id}`)
            await ctx.prisma.order.update({
              where: { id: order.id },
              data: { status: 'CANCELLED' },
            })
          }
        } catch (err) {
          logger.error('yookassa', `Failed to fetch payment ${order.paymentId}: ${(err as Error).message}`)
        }
      }
    } catch (error) {
      logger.error('yookassa', `Polling error: ${error}`)
    } finally {
      setTimeout(run, POLLING_INTERVAL_MS)
    }
  }

  run()
}
