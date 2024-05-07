'use client'

import { useRouter } from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "~/components/ui/input"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormField, FormItem, FormControl, FormMessage } from "~/components/ui/form"
import { Button } from "~/components/ui/button"

export default function SearchBar() {

    const router = useRouter()

    const formSchema = z.object({
        q: z.string().min(1),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            q: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        router.push(`/search/${values.q}`)
    }

return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="hidden sm:flex justify-center items-center">
            <FormField
                control={form.control}
                name="q"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input type='search' placeholder="Enter search here..." {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <Button type="submit">Search</Button>
        </form>
    </Form>
)
}
