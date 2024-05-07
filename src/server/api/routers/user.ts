import { z } from "zod"

import {
    createTRPCRouter,
    protectedProcedure,
} from "~/server/api/trpc";

import { getUserAction } from "~/server/db/actions/user/userActions";

export const userRouter = createTRPCRouter({

    getUser: protectedProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ input }) => {
            return getUserAction(input.id)
        })
})