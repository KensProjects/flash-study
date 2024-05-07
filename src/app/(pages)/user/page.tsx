import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";

export default async function User() {

  const session = await getServerAuthSession()

  if (session) {
    redirect(`/user/${session.user.id}`)

  } else {
    redirect("/")
  }

}