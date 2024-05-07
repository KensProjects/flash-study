'use server'

import { api } from "~/trpc/server";

export async function getUser(id: string) {
    const [user] = await api.user.getUser({ id })
    return user
}

export type UserType = Awaited<ReturnType<typeof getUser>>;