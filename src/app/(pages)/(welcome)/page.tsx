import Link from "next/link";
import Image from "next/image"
import { Button } from "~/components/ui/button";

export default async function Welcome() {

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Button asChild>
        <Link href="/api/auth/signin" className="w-40 h-12">Login with Google</Link>
      </Button>
    </div>
  )
}

