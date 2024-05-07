import { getUser } from "~/app/utils/user/userUtils";
import CardDeck from "./CardDeck";

export default async function CardDecksList({ id }: { id: string }) {

  const user = await getUser(id)

  const cardDecks = user?.cardDecks

  if (!user || !cardDecks) return null

  return (
    <ul className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 justify-center items-center w-full h-full m-4 text-center gap-4">
      {cardDecks.map(deck => (
        <li key={deck.id} className="w-full h-full flex justify-center items-center text-center">
          <CardDeck deck={deck} />
        </li>
      ))}
    </ul>
  )
}