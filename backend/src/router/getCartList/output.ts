import z from 'zod'

export const zCartItem = z.object({
  id: z.string(),
  title: z.string(),
  price: z.number(),
  images: z.array(z.string()),
  description: z.string().nullable(),
  createdAt: z.date(),
  article: z.string(),
  countInCart: z.number(),
  isFavoriteByMe: z.boolean(),
})

export const zGetCartListOutput = z.object({
  cartList: z.array(zCartItem),
})
