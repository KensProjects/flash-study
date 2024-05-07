import { format } from "date-fns";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";

export default function CardDeckData({ cardDeckData }: { cardDeckData: any[] }) {

    return (
        <div className="flex w-full md:w-3/4 h-full justify-start items-center">
            <ul className="flex w-full h-full justify-start items-center flex-col">
                {cardDeckData.map(cardDeck => {

                    const cardDeckDate = format(cardDeck.createdAt, "MMMM dd yyyy HH:MM:ss")

                    return <li key={cardDeck.id} className="flex justify-start items-center w-full h-full">
                        <Link href={`/user/${cardDeck.createdById}/${cardDeck.id}`} className="w-full h-full">
                            <Card className="w-full h-full flex justify-between items-center text-left">
                                <CardHeader className="flex justify-center items-start">
                                    <CardTitle>{cardDeck.name}</CardTitle>
                                    <CardDescription>{cardDeckDate}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex flex-row-reverse justify-between items-center p-0 pr-4 w-auto gap-4 h-auto">
                                    <p className="text-lg">{cardDeck.createdBy.name}</p>
                                    <Avatar>
                                        <AvatarImage src={cardDeck.createdBy.image} />
                                        <AvatarFallback>User</AvatarFallback>
                                    </Avatar>
                                </CardContent>
                            </Card>
                        </Link>
                    </li>
                })}
            </ul>
        </div>

    )
}
