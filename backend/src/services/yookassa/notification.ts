import express from 'express'

import { AppContext } from '../../lib/ctx'
import { ExpectedError } from '../../lib/error'
import { logger } from '../../lib/logger'

export const applyYookassaToExpressApp = (expressApp: express.Express, appContext: AppContext) => {
  const router = express.Router()

  router.post('/notification', express.json(), async (req, res) => {
    try {
      const event = req.body
      const eventEvent = event.event
      if (event.type !== 'notification') {
        throw new ExpectedError('type !== notification')
      }

      logger.info('yookassa', `Incoming notification: ${JSON.stringify(event, null, 2)}`)

      if (eventEvent === 'payment.succeeded') {
        const payment = event.object
        logger.info('yookassa', `Payment succeeded: ${payment.id}, amount: ${payment.amount.value}`)

        await appContext.prisma.order.update({
          where: { id: payment.metadata.orderId, paymentId: payment.id },
          data: { status: 'PAID' },
        })
        res.sendStatus(200)
      } else if (eventEvent === 'payment.canceled') {
        const payment = event.object
        logger.info('yookassa', `Payment canceled: ${payment.id}`)
        await appContext.prisma.order.update({
          where: { id: payment.metadata.orderId, paymentId: payment.id },
          data: { status: 'CANCELLED' },
        })
        res.sendStatus(200)
      }
    } catch (error) {
      logger.error('yookassa', error)
      res.status(500).send('Webhook processing error')
    }
  })

  expressApp.use('/yookassa', router)
}
