'use server'
import { revalidatePath } from "next/cache"
import { db } from "../../index"
import { cards, cardDecks } from "../../schema"
import { count, eq } from "drizzle-orm"

export async function getCardAction(id: string) {
    return await db.selectDistinct().from(cards).where(eq(cards.id, id))
}

export async function getDeckAction(id: string) {
    const deck = await db.query.cardDecks.findFirst({
        where: (cardDecks, { eq }) => eq(cardDecks.id, id),
        with: { cards: true },
    })
    const [cardDeckCount] = await db
        .select({ count: count() })
        .from(cards)
        .where(eq(cards.cardDeckId, id))

    const cardDeckData = await Promise.all([deck, cardDeckCount])
    return cardDeckData
}

export async function getDecksAction() {
    return await db.select().from(cardDecks).leftJoin(cards, eq(cards.cardDeckId, cardDecks.id))
}

export async function createCardDeckAction({ id, name, createdById }: { id: string, name: string, createdById: string }) {
    return await db.insert(cardDecks).values({
        name, createdById, id
    }).returning().then(() => revalidatePath("/api/trpc"))
}

export async function createFlashCardAction({ id, question, answer, cardDeckId, createdById }: { id: string, question: string, answer: string, cardDeckId: string, createdById: string }) {
    return await db.insert(cards).values({
        question, answer, cardDeckId, createdById, id
    }).returning().then(() => revalidatePath("/api/trpc"))
}

export async function editFlashCardDeckAction({ id, name }: { id: string, name: string }) {
    return await db.update(cardDecks).set({ name }).where(eq(cardDecks.id, id)).returning().then(() => revalidatePath("/api/trpc"))
}

export async function editFlashCardAction({ question, answer, id }: { question?: string, answer?: string, id: string }) {
    return await db.update(cards).set({ question, answer }).where(eq(cards.id, id)).returning().then(() => revalidatePath("/api/trpc"))
}

export async function deleteFlashCardDeckAction({ id }: { id: string }) {
    return await db.delete(cardDecks).where(eq(cardDecks.id, id)).returning().then(() => revalidatePath("/api/trpc"))
}

export async function deleteFlashCardAction({ id }: { id: string }) {
    return await db.delete(cards).where(eq(cards.id, id)).returning().then(() => revalidatePath("/api/trpc"))
}
