'use client'

import { createCardDeck } from "../../../../utils/card/cardUtils"
import { useSession } from "next-auth/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from '~/components/ui/button'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "~/components/ui/alert-dialog"
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { useRouter } from "next/navigation"

export default function CreateDeckButton() {

  const { data: session } = useSession()

  const router = useRouter()

  const formSchema = z.object({
    name: z.string().min(1, {
      message: "Name must be at least 1 character.",
    }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await createCardDeck({ id: crypto.randomUUID(), name: values.name, createdById: session!.user.id })
    router.push(`/user/${session!.user.id}`)
  }

  return (
    <AlertDialog >
      <AlertDialogTrigger asChild>
        <Button variant={'ghost'} className="flex justify-center items-center gap-2 w-full h-full bg-emerald-400 rounded-full text-slate-100">
          Create Deck
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Enter New Deck Name</AlertDialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="name" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter deck name here.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction type='submit'>Create Deck</AlertDialogAction>
              </AlertDialogFooter>
            </form>
          </Form>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  )
}
