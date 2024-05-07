import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
} from "~/server/api/trpc";

import { createCardDeckAction, createFlashCardAction, editFlashCardAction, editFlashCardDeckAction, getCardAction, getDeckAction, getDecksAction, deleteFlashCardAction, deleteFlashCardDeckAction } from "~/server/db/actions/card/cardActions";

export const cardRouter = createTRPCRouter({
    
    getCard: protectedProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ input }) => {
            return getCardAction(input.id)
        }),

    getDeck: protectedProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ input }) => {
            return getDeckAction(input.id)
        }),

    getDecks: protectedProcedure
        .query(async () => {
            return getDecksAction()
        }),

    createCardDeck: protectedProcedure
        .input(z.object({ id: z.string(), name: z.string(), createdById: z.string() }))
        .query(async ({ input }) => {
            return createCardDeckAction({ id: input.id, name: input.name, createdById: input.createdById })
        }),

    createCard: protectedProcedure
        .input(z.object({ id: z.string(), question: z.string(), answer: z.string(), cardDeckId: z.string(), createdById: z.string() }))
        .query(async ({ input }) => {
            return createFlashCardAction({ id: input.id, question: input.question, answer: input.answer, cardDeckId: input.cardDeckId, createdById: input.createdById })
        }),

    editCardDeck: protectedProcedure
        .input(z.object({ id: z.string(), name: z.string() }))
        .mutation(async ({ input }) => {
            const { id, name } = input
            return editFlashCardDeckAction({ id, name})
        }),

    editCard: protectedProcedure
        .input(z.object({ id: z.string(), question: z.string(), answer: z.string() }))
        .mutation(async ({ input }) => {
            const { id, question, answer } = input
            return editFlashCardAction({ id: id, question: question, answer: answer })
        }),

    deleteFlashCard: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ input }) => {
            const { id } = input
            return deleteFlashCardAction({ id: id })
        }),

    deleteFlashCardDeck: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ input }) => {
            const { id } = input
            return deleteFlashCardDeckAction({ id: id })
        }),
})