import { env } from './lib/env'

import cors from 'cors'
import express from 'express'

import { AppContext, createAppContext } from './lib/ctx'
import { logger } from './lib/logger'
import { applyTrpcToExpressApp } from './lib/trpc'
import { trpcRouter } from './router'


let ctx: AppContext | null = null

void (async () => {
  try {
    ctx = createAppContext()
    const expressApp = express()
    expressApp.use(cors())
    expressApp.get('/ping', (req, res) => {
      res.send('pong')
    })

    await applyTrpcToExpressApp(expressApp, ctx, trpcRouter)

    expressApp.use((error: unknown, req: express.Request, res: express.Response, next: express.NextFunction) => {
      logger.error('express', error)
      if (res.headersSent) {
        next(error)
        return
      }
      res.status(500).send('Internal server error')
    })

    expressApp.listen(env.PORT, () => {
      logger.info('express', `Server is running on http://localhost:${env.PORT}`)
    })
  } catch (error) {
    logger.error('app', error)
    await ctx?.stop()
  }
})()



