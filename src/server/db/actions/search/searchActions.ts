'use server'

import { db } from "../../index"
import { users, cardDecks } from "../../schema"
import { desc } from "drizzle-orm"

export async function getSearchData(query: string) {

    const containedQuery = `%${query}%`
    const userQuery = await db.query.users.findMany({
        where: (users, { ilike }) => ilike(users.name, containedQuery),
        orderBy: [desc(users.name)],
        limit: 10,
    })

    const cardDeckQuery = await db.query.cardDecks.findMany({
        where: (cardDecks, { ilike }) => ilike(cardDecks.name, containedQuery),
        orderBy: [desc(cardDecks.name)],
        limit: 10,
        with: {
            createdBy: true
        }
    })

    const [userData, cardDeckData] = await Promise.all([userQuery, cardDeckQuery])

    return [userData, cardDeckData]
}