import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import DeckButtons from "./cardDeckListActionButtons/DeckButtons";
import { format } from "date-fns";

export default function CardDeck({ deck }: { deck: { id: string, createdById: string, name: string, createdAt:Date } }) {

    const deckCreatedAt = format(deck.createdAt, 'MMMM d yyyy H:mm:ss')

    return (
        <div className="card-deck w-64 h-48 flex justify-between items-center flex-col gap-2">
            <Link href={`/user/${deck.createdById}/${deck.id}`} className="w-full h-full">
                <Card className="w-full h-full flex flex-col justify-between items-center overflow-auto bg-gray-100 p-2">
                    <CardHeader className="p-2">
                        <CardTitle className="text-md">{deck.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                    <CardDescription>
                        Created {deckCreatedAt}
                    </CardDescription>
                    </CardContent>
                </Card>
            </Link>
            <DeckButtons id={deck.id} />
        </div>

    )
}
