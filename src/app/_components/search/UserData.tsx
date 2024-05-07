import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar";
import { Card, CardHeader, CardTitle } from "~/components/ui/card";
import Link from "next/link";

export default function UserData({ userData }: { userData: any[] }) {

    return (
        <div className="flex w-full h-full justify-center items-center">
            <ul className="flex w-full h-full justify-center items-center">
                {userData.map(user => (
                    <li key={user.id} className="w-full h-24">
                        <Link href={`/user/${user.id}`} className="w-full h-full">
                            <Card className="w-full h-full">
                                <CardHeader className="flex justify-start items-center flex-row gap-8">
                                    <Avatar>
                                        <AvatarImage src={user.image} />
                                        <AvatarFallback>User</AvatarFallback>
                                    </Avatar>
                                    <CardTitle>{user.name}</CardTitle>
                                </CardHeader>
                            </Card>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>

    )
}
