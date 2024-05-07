import FlashCard from "./FlashCard";

export type FlashCardType = {
    question: string, answer:string, id:string
}

export default function CardList({ cards }: { cards: FlashCardType[] }) {
    return (
        <ul className="grid grid-cols-1 lg:grid-cols-2 justify-center items-center w-full h-full m-4 gap-4">
            {cards.map(card => (
                <li key={card.id} className="w-full h-80 flex justify-center items-center">
                    <FlashCard question={card.question} answer={card.answer} id={card.id}/>
                </li>
            ))}
        </ul>
    )
}
