import { getServerAuthSession } from "~/server/auth"
import Link from "next/link"
import { HomeIcon, PersonIcon } from "@radix-ui/react-icons"
import CreateDeckButton from "../cards/cardDecks/cardDeckListActionButtons/CreateDeckButton"
import type { LinksTypes } from "~/app/types/LinkTypes"


export default async function Sidebar({ params }: { params?: { page: string } }) {

    const session = await getServerAuthSession()

    const links: LinksTypes[] = [{ href: '/', text: 'Home', Icon: HomeIcon }]

    if (params !== undefined) return null

    return (
        <ul className="hidden md:flex flex-col justify-start items-center w-80 max-h-max">
            {links.map(({ href, text, Icon }) => (
                <li key={text} className="w-full flex h-auto items-center justify-center gap-3 text-xl p-3 hover:bg-gray-200/50 duration-100 ease-in-out rounded-full">
                    <Link href={href} className="w-full h-full text-center flex justify-center items-center gap-3">
                        <Icon width={25} height={25} />
                        {text}
                    </Link>
                </li>
            ))}
            {session && <li key={crypto.randomUUID()} className="w-full flex h-auto items-center justify-center gap-3 text-xl p-3 hover:bg-gray-200/50 duration-100 ease-in-out rounded-full">
                <Link href={`/user/${session?.user.id}`} className="w-full h-full text-center flex justify-center items-center gap-3">
                    <PersonIcon width={25} height={25} />
                    Profile
                </Link>
            </li>}
            <li key={crypto.randomUUID()} className="w-full flex h-auto items-center justify-center gap-3 text-xl p-3 hover:bg-gray-200/50 duration-100 ease-in-out rounded-full">
                <CreateDeckButton />
                {/* <CreateCardButton /> */}
            </li>
        </ul>
    )
}
