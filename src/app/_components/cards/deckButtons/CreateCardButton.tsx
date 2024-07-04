'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "~/components/ui/button"
import { createCard } from "../../../utils/card/cardUtils"
import { useSession } from "next-auth/react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "~/components/ui/alert-dialog"
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "~/components/ui/form"
import { Input } from "~/components/ui/input"

export default function CreateCardButton({ deckId }: { deckId: string }) {

    const { data: session } = useSession()

    const formSchema = z.object({
        question: z.string().min(1, {
            message: "Question must be at least 1 characters.",
        }),
        answer: z.string().min(1, {
            message: "Answer must be at least 1 characters.",
        }),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            question: "",
            answer: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        await createCard({ id: crypto.randomUUID(), question: values.question, answer: values.answer, createdById: session!.user.id, cardDeckId: deckId })
    }

    return (

        <AlertDialog >
            <AlertDialogTrigger className="flex justify-center items-center h-full w-fit rounded-md" asChild>
                <Button>
                    Create Card
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Enter Card Information</AlertDialogTitle>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="question"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Question</FormLabel>
                                        <FormControl>
                                            <Input placeholder="question" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Enter question here.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="answer"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Answer</FormLabel>
                                        <FormControl>
                                            <Input placeholder="answer" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Enter answer here.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction type='submit'>Create Card</AlertDialogAction>
                            </AlertDialogFooter>
                        </form>
                    </Form>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>

    )
}
