import { ExpectedError } from '../../lib/error'
import { trpcLoggedProcedure } from '../../lib/trpc'

import { zCreateCategoryInput } from './input'

export const createCategoryTrpcRoute = trpcLoggedProcedure
  .input(zCreateCategoryInput)
  .mutation(async ({ input, ctx }) => {
    if (ctx.me?.permissions?.includes('ALL') !== true) {
      throw new ExpectedError('PERMISSION DENIED')
    }

    const exCategory = await ctx.prisma.category.findFirst({
      where: {
        name: input.name,
      },
    })

    if (exCategory) {
      throw new ExpectedError('Category with this name already exists')
    }

    await ctx.prisma.category.create({
      data: { ...input },
    })

    return true
  })
