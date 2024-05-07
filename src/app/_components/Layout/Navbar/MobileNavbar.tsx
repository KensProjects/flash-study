import Link from "next/link"
import { HomeIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons"
import type { LinksTypes } from "~/app/types/LinkTypes"
import { Button } from "~/components/ui/button"
import NavbarButtonGroup from "./NavbarButtonGroup"

export default async function MobileNavbar() {

  const mobileLinks: LinksTypes[] = [{ href: '/', Icon: HomeIcon }, { href: `/search/1`, Icon: MagnifyingGlassIcon }]

  return (
    <footer className="fixed bottom-0 w-full h-30 flex md:hidden justify-between items-center bg-blue-300 mt-20 px-1 border-b-2 border-black">
      <ul className="flex justify-center items-center w-full h-full p-4">
        {mobileLinks.map(({ href, Icon }) => (
          <li key={href} className="w-full h-full flex justify-center items-center">
            <Button variant={'outline'} asChild className="w-fit h-full flex justify-center items-center">
              <Link href={href} className="w-fit h-full flex justify-center items-center">
                <Icon width={25} height={25} />
              </Link>
            </Button>

          </li>
        ))}
        <li className="w-full h-full flex justify-center items-center">
          <NavbarButtonGroup />
        </li>
      </ul>
    </footer>
  )
}
