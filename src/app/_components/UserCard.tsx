import { Card, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { format } from "date-fns"
import type { UserType } from "../utils/user/userUtils"

export default async function UserCard({ user }: { user: UserType }) {

  if (!user) return null

  const joinDate = `Joined ${format(user.createdAt, 'MMMM yyyy')}`

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{user.name}</CardTitle>
      </CardHeader>
      <CardFooter>
        <p>{joinDate}</p>
      </CardFooter>
    </Card>

  )
}
