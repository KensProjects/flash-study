'use client'

import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogCancel, AlertDialogAction, AlertDialogHeader, AlertDialogFooter } from '~/components/ui/alert-dialog'
import { Pencil1Icon } from '@radix-ui/react-icons'
import { Button } from '~/components/ui/button'
import { editCard } from '~/app/utils/card/cardUtils'
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CardContent } from '~/components/ui/card'

export default function CardEditButton({ id, prevQuestion, prevAnswer }: { id: string, prevQuestion:string, prevAnswer:string }) {

    const formSchema = z.object({
        question: z.string().min(1, {
            message: "Question must be at least 1 character.",
        }),
        answer: z.string().min(1, {
            message: "Answer must be at least 1 character.",
        }),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            question: prevQuestion,
            answer: prevAnswer,
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        await editCard({ id: id, question: values.question, answer: values.answer })
    }

    return (
        <AlertDialog >
            <AlertDialogTrigger className="flex justify-center items-center z-10" asChild>
                <Button className="z-20">
                    <Pencil1Icon />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-center">Edit Flash Carf</AlertDialogTitle>
                </AlertDialogHeader>
                <CardContent>
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
                                            Enter new question here.
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
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="answer" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Enter new answer here.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <AlertDialogFooter className="sm:justify-center">
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction type='submit'>Save Card Edits</AlertDialogAction>
                            </AlertDialogFooter>
                        </form>
                    </Form>
                </CardContent>

            </AlertDialogContent>
        </AlertDialog>
    )
}
