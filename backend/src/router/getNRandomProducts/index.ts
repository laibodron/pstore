import { trpcLoggedProcedure } from '../../lib/trpc'

import { zGetNRandomProductsInput } from './input'

export const getNRandomProductsTrpcRoute = trpcLoggedProcedure
  .input(zGetNRandomProductsInput)
  .query(async ({ input, ctx }) => {
    const products: { id: string; title: string; price: number }[] = await ctx.prisma.$queryRaw`
      SELECT id, title, price FROM "Product"
      ORDER BY RANDOM()
      LIMIT ${input.n}
    `
    return { products }
  })
