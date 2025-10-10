import { zStringRequired } from '@pstore/shared/src/zod'
import z from 'zod'

export const zSetItemFavoriteTrpcInput = z.object({
  productId: zStringRequired,
  isFavoriteByMe: z.boolean(),
})
