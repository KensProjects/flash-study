'use server'

import { db } from "../../index"
import { users, cardDecks, cards } from "../../schema"
import { desc, eq } from "drizzle-orm"


export async function updateUserRole(id: string, role: "ADMIN" | "BASIC") {
    return await db.update(users).set({ role }).where(eq(users.id, id))
}



export async function getUserAction(id: string) {
    return await db.query.users.findMany({
        where: (users, { eq }) => (eq(users.id, id)),
        orderBy: [desc(users.createdAt)],
        with: {
            cardDecks: {
                orderBy: [desc(cardDecks.createdAt)],
                with: {
                    cards: {
                        orderBy: [desc(cards.createdAt)],
                    }
                }
            }
        }
    })
}