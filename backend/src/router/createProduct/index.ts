import { ExpectedError } from '../../lib/error'
import { trpcLoggedProcedure } from '../../lib/trpc'

import { zCreateProductInput } from './input'

export const createProductTrpcRoute = trpcLoggedProcedure
  .input(zCreateProductInput)
  .mutation(async ({ input, ctx }) => {
    const exProduct = await ctx.prisma.product.findFirst({
      where: {
        article: input.article,
        title: input.title,
        price: input.price,
        description: input.description,
      },
    })

    if (exProduct) {
      throw new ExpectedError('Product with this fields already exists')
    }

    await ctx.prisma.product.create({
      data: { ...input },
    })

    return true
  })
