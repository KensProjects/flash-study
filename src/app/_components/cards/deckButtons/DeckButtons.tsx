import CreateCardButton from "./CreateCardButton";
import EditCardDeck from "./EditCardDeck";

export default function DeckButtons({deckId,deckName}:{deckId:string, deckName:string}) {
  return (
    <ul className="flex justify-center items-center gap-4">
        <li>
            <CreateCardButton deckId={deckId} />
        </li>
        <li>
            <EditCardDeck deckId={deckId} deckName={deckName} />
        </li>
    </ul>
  )
}
