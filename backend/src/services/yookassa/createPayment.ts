import { type ICreatePayment } from '@a2seven/yoo-checkout'

import { yooKassa } from './client'

export const yooKassaCreatePayment = ({
  amountVal,
  description,
  metadataOrderId,
  idempotenceKey,
}: {
  amountVal: string
  description: string
  metadataOrderId: string
  idempotenceKey: string
}) => {
  const createPayload: ICreatePayment = {
    amount: {
      value: amountVal,
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
    description: description,
    metadata: {
      orderId: metadataOrderId,
    },
  }

  return yooKassa.createPayment(createPayload, idempotenceKey)
}
