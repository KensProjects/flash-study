'use server'

import { api } from "~/trpc/server";

export async function getSearchData(query: string) {
    return await api.search.getSearchInputData({ query })
}

export type SearchDataType = Awaited<ReturnType<typeof getSearchData>>;