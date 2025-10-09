import { ExpectedError } from '../../lib/error'
import { toClientMe } from '../../lib/models'
import { trpcLoggedProcedure } from '../../lib/trpc'

import { zUpdateProfileTrpcInput } from './input'

export const updateProfileTrpcRoute = trpcLoggedProcedure
  .input(zUpdateProfileTrpcInput)
  .mutation(async ({ ctx, input }) => {
    if (!ctx.me) {
      throw new ExpectedError('UNAUTHORIZED')
    }

    if (
      input.email === ctx.me.email &&
      input.name === ctx.me.name &&
      input.phoneNumber === ctx.me.phoneNumber &&
      input.surname === ctx.me.surname &&
      input.username === ctx.me.username &&
      input.avatarUrl === ctx.me.avatarUrl
    ) {
      return 'data not changed'
    }

    if (ctx.me.username !== input.username) {
      const exUser = await ctx.prisma.user.findUnique({
        where: {
          username: input.username,
        },
      })
      if (exUser) {
        throw new ExpectedError('User with this username already exists')
      }
    }

    if (ctx.me.email !== input.email) {
      const exUser = await ctx.prisma.user.findUnique({
        where: {
          email: input.email,
        },
      })
      if (exUser) {
        throw new ExpectedError('User with this email already exists')
      }
    }

    if (ctx.me.phoneNumber !== input.phoneNumber) {
      const exUser = await ctx.prisma.user.findUnique({
        where: {
          phoneNumber: input.phoneNumber,
        },
      })
      if (exUser) {
        throw new ExpectedError('User with this phoneNumber already exists')
      }
    }

    const updatedMe = await ctx.prisma.user.update({
      where: {
        id: ctx.me.id,
      },
      data: input,
    })
    ctx.me = updatedMe

    return toClientMe(updatedMe)
  })
