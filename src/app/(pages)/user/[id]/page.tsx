import { notFound } from "next/navigation"
import UserCard from "~/app/_components/UserCard"
import CardDecksList from "~/app/_components/cards/cardDecks/CardDecksList"
import { getUser } from "~/app/utils/user/userUtils"
import BannedUserPage from "~/app/_components/Layout/BannedUserPage"

export default async function UserPage({ params }: { params: { id: string } }) {

    const user = await getUser(params.id)

    if (!user) {
        notFound()
    }

    if (user.role === "BANNED") {
        return <BannedUserPage />
    }

    return (
        <div className="w-full h-auto flex justify-center items-center flex-col">
            <UserCard user={user} />
            <CardDecksList id={params.id} />
        </div>
    )
}
