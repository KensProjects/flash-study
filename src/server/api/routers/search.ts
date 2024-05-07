import { z } from "zod"

import {
    createTRPCRouter,
    protectedProcedure,
} from "~/server/api/trpc";

import { getSearchData } from "~/server/db/actions/search/searchActions";

export const searchRouter = createTRPCRouter({

    getSearchInputData: protectedProcedure
        .input(z.object({ query: z.string() }))
        .query(async ({ input }) => {
            return getSearchData(input.query)
        })
})