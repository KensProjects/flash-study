'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogCancel, AlertDialogAction } from "~/components/ui/alert-dialog";
import { Input } from "~/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { editDeck } from "~/app/utils/card/cardUtils";
import { AlertDialogHeader, AlertDialogFooter } from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "~/components/ui/form";

export default function EditCardDeck({ deckId,deckName }: { deckId: string,deckName:string }) {

    const formSchema = z.object({
        name: z.string().min(1, {
            message: "Name must be at least 1 characters.",
        }),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: deckName,
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        return await editDeck({ id: deckId, name: values.name })
    }

    return (

        <AlertDialog >
            <AlertDialogTrigger className="flex justify-center items-center h-full w-fit rounded-md" asChild>
                <Button>
                    Edit Deck
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Enter Card Information</AlertDialogTitle>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Deck Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="name" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Enter name here.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction type='submit'>Edit Deck</AlertDialogAction>
                            </AlertDialogFooter>
                        </form>
                    </Form>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    )
}
