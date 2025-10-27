import { env } from '../../lib/env'

import { YooCheckout } from '@a2seven/yoo-checkout'

export const yooKassa = new YooCheckout({
  shopId: env.YOOKASSA_SHOP_ID,
  secretKey: env.YOOKASSA_SECRETKEY,
})
