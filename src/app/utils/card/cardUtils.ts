'use server'

import { api } from "~/trpc/server";

export async function getCard(id: string) {
    const fetchedCard = api.card.getCard({ id })
    return fetchedCard
}

export async function getDeck(id: string) {
    const deck = api.card.getDeck({ id })
    return deck
}
export async function getDecks() {
    const decks = api.card.getDecks()
    return decks
}
export async function createCardDeck({ id, name, createdById }: { id: string, name: string, createdById: string }) {
    const decks = api.card.createCardDeck({ id, name, createdById })
    return decks
}
export async function createCard({ id, question, answer, cardDeckId, createdById }: { id: string, question: string, answer: string, cardDeckId: string, createdById: string }) {
    const decks = api.card.createCard({ id, question, answer, cardDeckId, createdById })
    return decks
}
export async function editCard({ id, question, answer }: { id: string, question: string, answer: string }) {
    const editedCard = api.card.editCard({ id, question, answer })
    return editedCard
}
export async function editDeck({ id, name }: { id: string, name: string }) {
    const editedDeck = api.card.editCardDeck({ id, name })
    return editedDeck
}

export async function deleteCard(id: string) {
    const deleteCard = api.card.deleteFlashCard({ id })
    return deleteCard
}
export async function deleteDeck(id: string) {
    const deleteDeck = api.card.deleteFlashCardDeck({ id })
    return deleteDeck
}