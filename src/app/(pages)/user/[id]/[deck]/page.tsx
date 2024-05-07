import CardList from "~/app/_components/cards/CardList"
import { getDeck } from "~/app/utils/card/cardUtils"
import { notFound } from "next/navigation"
import { getServerAuthSession } from "~/server/auth"
import DeckButtons from "~/app/_components/cards/deckButtons/DeckButtons"

export default async function CardDeckPage({ params }: { params: { id: string, deck: string } }) {

  const session = await getServerAuthSession()

  const deckId = params.deck

  const [deck, deckCount] = await getDeck(deckId)

  if (!deck || !deckCount) {
    notFound()
  }

  const count = deckCount.count

  const isSessionUser = session!.user.id === deck.createdById

  return (
    <div className="flex flex-col justify-center items-center w-full h-full gap-4">
      <h2 className="text-center mt-4 text-xl font-bold">Deck Name: {deck.name}</h2>
      <h3>Number of cards: {count}</h3>
      {isSessionUser && <DeckButtons deckId={deck.id} deckName={deck.name} />}
      <CardList cards={deck.cards} />

    </div>
  )
}
