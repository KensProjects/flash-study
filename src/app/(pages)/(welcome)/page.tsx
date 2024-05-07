import Link from "next/link";
import Image from "next/image"
import { Button } from "~/components/ui/button";

export default async function Welcome() {

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="hidden bg-muted lg:block">
        <Image
          src="/favicon.ico"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-4">
            <Button asChild>
              <Link href="/api/auth/signin" className="w-full">Login with Google</Link>
            </Button>
          </div>
        </div>
      </div>

    </div>
  )
}

