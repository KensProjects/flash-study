import Link from "next/link";
import { Button } from "~/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "~/components/ui/dialog"
import { getServerAuthSession } from "~/server/auth";
import { PersonIcon } from "@radix-ui/react-icons";
export default async function NavbarButtonGroup() {

    const session = await getServerAuthSession()

    type DialogTypes = {
        href: string, text: string
    }

    const authButtonOpts: DialogTypes[] = [{ href: session ? '/api/auth/signout' : "/api/auth/signin", text: session ? "Signout" : "Signin" }, {
        href: `/user/${session?.user.id}`, text: 'User Page'
    }]

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant='outline' className="w-fit h-fit flex justify-center items-center">
                    <PersonIcon width={25} height={25} />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Paths</DialogTitle>
                    <DialogDescription>
                   Select path below.
                    </DialogDescription>
                </DialogHeader>
                <ul className="w-full h-auto flex flex-row-reverse justify-center items-center">
                    {authButtonOpts.map(({href,text}) => (
                        <li key={text} className="w-full h-auto">
                            <Link href={href} className="flex justify-center items-center w-full h-auto">{text}</Link>
                        </li>
                    ))}
                </ul>

            </DialogContent>
        </Dialog>
    )
}
